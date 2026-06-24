export class WasmGLRenderer
{
  constructor(element)
  {
    this.element = element;
    const contextAttributes = {
      alpha: 1,
      depth: 1,
      stencil: 8,
      antialias: 1,
      premultipliedAlpha: 1,
      preserveDrawingBuffer: 0,
      preferLowPowerToHighPerformance: 0,
      failIfMajorPerformanceCaveat: 0,
      majorVersion: 2,
      minorVersion: 0,
      enableExtensionsByDefault: 1,
      explicitSwapControl: 0,
      renderViaOffscreenBackBuffer: 0,
    };
    const GL = WasmGLRenderer.getGL();
    let ctx = GL.createContext(this.element, contextAttributes);
    if (!ctx)
    {
      console.warn('Falling back to WebGL 1.0');
      contextAttributes.majorVersion = 1;
      contextAttributes.minorVersion = 0;
      ctx = GL.createContext(this.element, contextAttributes);
      if (!ctx)
      {
        console.error(`Failed to create WebGL context: err ${ctx}`);
        return null;
      }
    }
    // Make current.
    GL.makeContextCurrent(ctx);
    // read values
    const GLctx = WasmGLRenderer.getGLctx();
    const fbo = GLctx.getParameter(GLctx.FRAMEBUFFER_BINDING);
    this.glInfo = {
      context: ctx,
      fboId: fbo ? fbo.id : 0,
      stencilBits: GLctx.getParameter(GLctx.STENCIL_BITS),
      samples: 0, // TODO: GLctx.getParameter(GLctx.SAMPLES)
      depth: GLctx.getParameter(GLctx.DEPTH_BITS),
    };
  }
  static attach(element)
  {
    const renderer = new WasmGLRenderer(element);
    return renderer;
  }
  static makeCurrent(jso)
  {
    jso.makeCurrent();
  }
  static dispose(jso)
  {
    jso.dispose();
  }

  makeCurrent()
  {
    if (this.glInfo)
    {
      const GL = WasmGLRenderer.getGL();
      GL.makeContextCurrent(this.glInfo.context);
    }
  }

  dispose()
  {
    // Nothing to do.
  }

  static getGL()
  {
    return globalThis.SkiaSharpGL || Module.GL || GL;
  }
  static getGLctx()
  {
    const GL = WasmGLRenderer.getGL();
    return GL.currentContext && GL.currentContext.GLctx || GLctx;
  }
}

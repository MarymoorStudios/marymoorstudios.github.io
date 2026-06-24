export class WasmCpuRenderer
{
  constructor(element)
  {
    this.element = element;
  }
  static attach(element)
  {
    const renderer = new WasmCpuRenderer(element);
    return renderer;
  }
  static putImageData(jso, data, width, height)
  {
    jso.putImageData(data, width, height);
  }
  static dispose(jso)
  {
    jso.dispose();
  }

  putImageData(data, width, height)
  {
    if (!data || width <= 0 || height <= 0)
    {
      return false;
    }
    var ctx = this.element.getContext('2d');
    if (!ctx)
    {
      console.error(`Failed to obtain 2D canvas context.`);
      return false;
    }
    // Scale the canvas to match the image.
    this.element.width = width;
    this.element.height = height;

    // Create a managed "view" over the Emscripten linear memory data pointer.
    const Module = WasmCpuRenderer.getModule();
    var buffer = new Uint8ClampedArray(Module.HEAPU8.buffer, data, width * height * 4);
    // Copy the image data into the canvas buffer.
    var imageData = new ImageData(buffer, width, height);
    ctx.putImageData(imageData, 0, 0);
    return true;
  }

  dispose()
  {
    // Nothing to do.
  }

  static getModule()
  {
    return globalThis.SkiaSharpModule || Module;
  }
}

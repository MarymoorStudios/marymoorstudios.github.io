export class WasmGameWindow
{
  // Define an immutable enum-like object
  static EventType = Object.freeze({
    Invalid: 0,
    SizeChanged: 1,
    KeyUp: 2,
    KeyDown: 3,
    MouseEnter: 4,
    MouseLeave: 5,
    MouseUp: 6,
    MouseDown: 7,
    MouseMove: 8,
    MouseWheel: 9,
  });

  static KeyModifiers = Object.freeze({
    None: 0x0000,
    Shift: 0x0001,
    Control: 0x0002,
    Alt: 0x0004,
    Super: 0x0008,
    CapsLock: 0x0010,
    NumLock: 0x0020,
  });

  constructor(element, onEventCallback)
  {
    this.element = element;
    this.onEventCallback = onEventCallback;

    // Create a resize observer.
    this.resizeObserver = new ResizeObserver((entries) =>
    {
      for (let entry of entries)
      {
        this.onResize(entry.target);
      }
    });

    // Resize.
    this.resizeObserver.observe(this.element);

    // Event handlers.
    this.onKeyDown = (e) =>
    {
      if (this.onEventCallback(WasmGameWindow.EventType.KeyDown, e, WasmGameWindow.getModifiers(e)))
      {
        // Stop it from bubbling to parents
        event.stopPropagation();
        // Stop browser default (e.g., prevent typing)
        event.preventDefault();
      }
    }
    this.element.addEventListener('keydown', this.onKeyDown);
    this.onKeyUp = (e) =>
    {
      if (this.onEventCallback(WasmGameWindow.EventType.KeyUp, e, WasmGameWindow.getModifiers(e)))
      {
        // Stop it from bubbling to parents
        event.stopPropagation();
        // Stop browser default (e.g., prevent typing)
        event.preventDefault();
      }
    }
    this.element.addEventListener('keyup', this.onKeyUp);
    this.onMouseEnter = (e) =>
    {
      if (this.onEventCallback(WasmGameWindow.EventType.MouseEnter, e, WasmGameWindow.getModifiers(e)))
      {
        // Stop it from bubbling to parents
        event.stopPropagation();
        // Stop browser default (e.g., prevent typing)
        event.preventDefault();
      }
    }
    this.element.addEventListener('mouseenter', this.onMouseEnter);
    this.onMouseLeave = (e) =>
    {
      if (this.onEventCallback(WasmGameWindow.EventType.MouseLeave, e, WasmGameWindow.getModifiers(e)))
      {
        // Stop it from bubbling to parents
        event.stopPropagation();
        // Stop browser default (e.g., prevent typing)
        event.preventDefault();
      }
    }
    this.element.addEventListener('mouseleave', this.onMouseLeave);
    this.onMouseDown = (e) =>
    {
      if (this.onEventCallback(WasmGameWindow.EventType.MouseDown, e, WasmGameWindow.getModifiers(e)))
      {
        // Stop it from bubbling to parents
        event.stopPropagation();
        // Stop browser default (e.g., prevent typing)
        event.preventDefault();
      }
    }
    this.element.addEventListener('mousedown', this.onMouseDown);
    this.onMouseUp = (e) =>
    {
      if (this.onEventCallback(WasmGameWindow.EventType.MouseUp, e, WasmGameWindow.getModifiers(e)))
      {
        // Stop it from bubbling to parents
        event.stopPropagation();
        // Stop browser default (e.g., prevent typing)
        event.preventDefault();
      }
    }
    this.element.addEventListener('mouseup', this.onMouseUp);
    this.onMouseMove = (e) =>
    {
      if (this.onEventCallback(WasmGameWindow.EventType.MouseMove, e, WasmGameWindow.getModifiers(e)))
      {
        // Stop it from bubbling to parents
        event.stopPropagation();
        // Stop browser default (e.g., prevent typing)
        event.preventDefault();
      }
    };
    this.element.addEventListener('mousemove', this.onMouseMove);
    this.onMouseWheel = (e) =>
    {
      if (this.onEventCallback(WasmGameWindow.EventType.MouseWheel, e, WasmGameWindow.getModifiers(e)))
      {
        // Stop it from bubbling to parents
        event.stopPropagation();
        // Stop browser default (e.g., prevent typing)
        event.preventDefault();
      }
    };
    this.element.addEventListener('wheel', this.onMouseWheel);
  }
  static attach(element, onEventCallback)
  {
    const manager = new WasmGameWindow(element, onEventCallback);
    return manager;
  }
  static resizeViewport(jso, width, height)
  {
    jso.resizeViewport(width, height);
  }
  static getDevicePixelRatio()
  {
    const dpr = window.devicePixelRatio;
    return dpr;
  }
  static dispose(jso)
  {
    jso.dispose();
  }

  onResize(element)
  {
    // Ignore any over-signalling.
    if (element !== this.element)
    {
      return;
    }

    // Notify the window manager.
    this.onEventCallback(WasmGameWindow.EventType.SizeChanged, element, WasmGameWindow.KeyModifiers.None);
  }

  resizeViewport(width, height)
  {
    this.element.width = width;
    this.element.height = height;
  }

  static getModifiers(e)
  {
    let modifers = WasmGameWindow.KeyModifiers.None;
    if (!("getModifierState" in e) || typeof e.getModifierState !== "function")
    {
      return modifers;
    }
    if (e.getModifierState("Alt"))
    {
      modifers += WasmGameWindow.KeyModifiers.Alt;
    }
    if (e.getModifierState("Control"))
    {
      modifers += WasmGameWindow.KeyModifiers.Control;
    }
    if (e.getModifierState("Meta"))
    {
      modifers += WasmGameWindow.KeyModifiers.Super;
    }
    if (e.getModifierState("Shift"))
    {
      modifers += WasmGameWindow.KeyModifiers.Shift;
    }
    if (e.getModifierState("CapsLock"))
    {
      modifers += WasmGameWindow.KeyModifiers.CapsLock;
    }
    if (e.getModifierState("NumLock"))
    {
      modifers += WasmGameWindow.KeyModifiers.NumLock;
    }
    return modifers;
  }

  dispose()
  {
    // Resize.
    this.resizeObserver.unobserve(this.element);

    // Remove event handlers.
    this.element.removeEventListener('keydown', this.onKeyDown);
    this.element.removeEventListener('keyup', this.onKeyUp);
    this.element.removeEventListener('mouseenter', this.onMouseEnter);
    this.element.removeEventListener('mouseleave', this.onMouseLeave);
    this.element.removeEventListener('mousedown', this.onMouseDown);
    this.element.removeEventListener('mouseup', this.onMouseUp);
    this.element.removeEventListener('mousemove', this.onMouseMove);
    this.element.removeEventListener('wheel', this.onMouseWheel);
  }
}

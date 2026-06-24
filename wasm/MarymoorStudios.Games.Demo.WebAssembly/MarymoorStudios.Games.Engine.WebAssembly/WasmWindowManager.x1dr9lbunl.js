export class WasmWindowManager
{
  constructor(pumpWindowsCallback)
  {
    this.pumpWindowsCallback = pumpWindowsCallback;
    this.pending = null;

    // Create a resize observer.
    this.resizeObserver = new ResizeObserver((entries) =>
    {
      for (let entry of entries)
      {
        this.onResize(entry.target);
      }
    });

    console.log('Started loop');
    this.pumpWindows();
}
  static attach(pumpWindowsCallback)
  {
    const manager = new WasmWindowManager(pumpWindowsCallback);
    return manager;
  }
  static detach(jso)
  {
    jso.detach();
  }

  pumpWindows()
  {
    // If already pending, do nothing.
    if (this.pending !== null)
    {
      return;
    }

    // Issue a request.
    this.pending = window.requestAnimationFrame(() =>
    {
      this.pending = null;

      // Notify the window manager.
      if (this.pumpWindowsCallback)
      {
        this.pumpWindowsCallback();
      }

      // Recurse the loop.
      this.pumpWindows();
    });
  }
  detach()
  {
    if (this.pending !== null)
    {
      // Draw loop.
      console.log('Stopped loop');
      window.cancelAnimationFrame(this.pending);
      this.pending = null;
    }
  }
}

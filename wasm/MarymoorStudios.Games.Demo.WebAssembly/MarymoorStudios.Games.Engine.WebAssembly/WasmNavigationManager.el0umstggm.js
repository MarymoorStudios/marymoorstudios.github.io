export class WasmNavigationManager
{
  constructor()
  {
  }
  static attach()
  {
    const renderer = new WasmNavigationManager();
    return renderer;
  }
  static getLocation(jso)
  {
    return window.location.href;
  }
  static navigate(jso, url)
  {
    // Replaces the current page, adds browser history, no popup blockers.
    window.location.assign(url);
    return true;
  }
  static open(jso, url)
  {
    // Opens in a new tab in most modern browsers.
    // May open a new window depending on user settings.
    // May be blocked unless triggered by a user gesture (click, keypress).
    const win = window.open(url, "_blank");
    return (win !== null);
  }
  static openWindow(jso, url, width, height)
  {
    // A non‑empty features string (like width=800) forces a new window.
    // Without features, browsers usually open a new tab instead.
    // The features `noopener, noreferrer` prevent the new window from accessing window.opener
    const win = window.open(url, "_blank", "noopener,noreferrer,width=" + width + ",height=" + height);
    return (win !== null);
  }
  static dispose(jso)
  {
    jso.dispose();
  }

  dispose()
  {
    // Nothing to do.
  }
}

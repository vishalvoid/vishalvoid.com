type Handler = (href: string) => Promise<void> | void;

let handler: Handler | null = null;

export function setTransitionHandler(fn: Handler) {
  handler = fn;
}

export function clearTransitionHandler() {
  handler = null;
}

export async function navigateWithTransition(href: string): Promise<boolean> {
  if (handler) {
    try {
      await handler(href);
      return true;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("navigateWithTransition handler error", err);
      return false;
    }
  }
  return false;
}

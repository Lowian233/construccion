interface Window {
  fbq: {
    (event: string, ...args: unknown[]): void;
    queue: unknown[];
    loaded: boolean;
    version: string;
    callMethod: (...args: unknown[]) => void;
  };
  _fbq: Window['fbq'];
} 
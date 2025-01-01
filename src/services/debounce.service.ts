interface DebounceProps<T extends unknown[]> {
  func: (...args: T) => void;
  delay?: number;
}

/**
 * Creates a debounced function that delays the execution of `func`
 * until after `delay` milliseconds have elapsed since the last time it was invoked.
 * This can help in limiting the rate at which a function is executed.
 * @param params Parameters for the debounced function.
 * @param params.func The function to debounce.
 * @param params.delay The number of milliseconds to delay the `func` call.
 * @returns A new debounced function that takes the same arguments as `func`.
 */
export default function debounce<T extends unknown[]>({
  func,
  delay = 300,
}: DebounceProps<T>): (...args: T) => void {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: T): void {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

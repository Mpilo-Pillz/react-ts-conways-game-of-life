import { useEffect, useRef } from "react";

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // memoized the latest callback when it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Terminate if the delay is not specified
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;

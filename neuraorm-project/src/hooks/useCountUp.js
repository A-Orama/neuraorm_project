import { useState, useEffect } from 'react';

export function useCountUp(target, duration = 1200, started = false) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!started) return;

    const isFloat = String(target).includes(".");
    const num = parseFloat(target);
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(isFloat ? (num * ease).toFixed(1) : Math.round(num * ease));
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return val;
}

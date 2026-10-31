
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Digit = ({ value }: { value: number }) => {
  return (
    <div className="relative flex h-10 w-8 items-center justify-center overflow-hidden rounded-md bg-black font-mono text-2xl font-bold text-white">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default function FlipClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // مقدار اولیه سرور و مرورگر یکسان است.
  if (!time) {
    return (
      <div
        className="flex items-center justify-center gap-1"
        aria-hidden="true"
      >
        {Array.from({ length: 6 }, (_, i) => (
          <span
            key={i}
            className="h-10 w-8 rounded-md bg-zinc-900"
          />
        ))}
      </div>
    );
  }

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div
      dir="ltr"
      className="flex items-center justify-center gap-1"
    >
      {hours.split("").map((digit, i) => (
        <Digit key={`h-${i}`} value={Number(digit)} />
      ))}

      <span className="text-2xl font-bold text-zinc-500">:</span>

      {minutes.split("").map((digit, i) => (
        <Digit key={`m-${i}`} value={Number(digit)} />
      ))}

      <span className="text-2xl font-bold text-zinc-500">:</span>

      {seconds.split("").map((digit, i) => (
        <Digit key={`s-${i}`} value={Number(digit)} />
      ))}
    </div>
  );
}

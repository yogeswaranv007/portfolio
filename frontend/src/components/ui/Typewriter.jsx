import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Typewriter({ words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 1500 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? deletingSpeed : typingSpeed, parseInt(Math.random() * 50, 10)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-block relative">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
        {words[index].substring(0, subIndex)}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className="inline-block w-0.5 h-[1em] bg-primary ml-1 align-middle"
      />
    </span>
  );
}

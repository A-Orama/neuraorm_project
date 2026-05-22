import { useState, useEffect } from 'react';

export function useTypewriter(words, typingSpeed = 80, pause = 1800, deleteSpeed = 40) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const word = words[wordIdx % words.length];
    let timeout;

    if (phase === "typing") {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pause);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else if (text.length > 0) {
      timeout = setTimeout(() => setText((t) => t.slice(0, -1)), deleteSpeed);
    } else {
      setWordIdx((i) => i + 1);
      setPhase("typing");
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIdx, words, typingSpeed, pause, deleteSpeed]);

  return text;
}

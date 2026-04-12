"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

// RDF Triple 을 한 글자씩 타이핑 연출 (슬라이드 06)
type Triple = {
  s: string; // subject
  p: string; // predicate
  o: string; // object
};

type Props = {
  triples: Triple[];
  active: boolean; // 시작 트리거
  charDelay?: number; // ms per char
  tripleGap?: number; // ms between triples
  className?: string;
};

export default function TypingRDF({
  triples,
  active,
  charDelay = 25,
  tripleGap = 400,
  className,
}: Props) {
  const [typedIndex, setTypedIndex] = useState(0); // 현재 타이핑 중인 triple index
  const [typedChars, setTypedChars] = useState(0); // 현재 triple 내 char index

  useEffect(() => {
    if (!active) {
      setTypedIndex(0);
      setTypedChars(0);
      return;
    }

    if (typedIndex >= triples.length) return;

    const currentTriple = triples[typedIndex];
    if (!currentTriple) return;
    const full = formatTriple(currentTriple);

    if (typedChars < full.length) {
      const id = setTimeout(() => setTypedChars((c) => c + 1), charDelay);
      return () => clearTimeout(id);
    }

    // 한 triple 타이핑 완료 → 다음 triple 로
    const id = setTimeout(() => {
      setTypedIndex((i) => i + 1);
      setTypedChars(0);
    }, tripleGap);
    return () => clearTimeout(id);
  }, [active, typedIndex, typedChars, triples, charDelay, tripleGap]);

  return (
    <div
      className={clsx(
        "font-mono text-[15px] leading-[1.8] text-accent",
        className
      )}
    >
      {triples.slice(0, typedIndex).map((t, i) => (
        <div key={i} className="opacity-70">
          {formatTriple(t)}
        </div>
      ))}
      {typedIndex < triples.length && triples[typedIndex] && (
        <div className="text-accent">
          {formatTriple(triples[typedIndex]!).slice(0, typedChars)}
          <span className="ml-0.5 inline-block h-[1em] w-[0.5em] animate-pulse bg-accent align-middle" />
        </div>
      )}
    </div>
  );
}

function formatTriple(t: Triple): string {
  return `{ "s": "${t.s}", "p": "${t.p}", "o": "${t.o}" }`;
}

"use client";

import { useRef } from "react";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "purple" | "magenta" | "mixed";
}

export function Card3D({ children, className = "", glow = "mixed" }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(12px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`card-3d card-3d-glow-${glow} ${className}`}
    >
      <div className="card-3d-inner">{children}</div>
    </div>
  );
}

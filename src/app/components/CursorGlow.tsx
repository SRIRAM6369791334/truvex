import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      
      animationFrameId = requestAnimationFrame(() => {
        if (!glowRef.current) return;
        
        if (!hasMoved) {
          glowRef.current.style.opacity = '1';
          hasMoved = true;
        }

        let targetX = e.clientX;
        let targetY = e.clientY;
        let scale = 1;

        const target = e.target as HTMLElement;
        const interactiveEl = target?.closest?.('button, a, [role="button"], input, select, textarea, [data-magnetic]');

        if (interactiveEl) {
          const rect = interactiveEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Magnetic pull: shift 40% towards the center of the interactive element
          targetX += (centerX - targetX) * 0.4;
          targetY += (centerY - targetY) * 0.4;
          scale = 1.15; // Slightly enlarge glow for a premium feel
        }

        glowRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(${scale})`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-50 h-[1200px] w-[1200px] -ml-[600px] -mt-[600px] opacity-0 transition-all duration-200 ease-out bg-[radial-gradient(600px_circle_at_center,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_40%)]"
      aria-hidden="true"
    />
  );
}

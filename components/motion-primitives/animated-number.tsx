'use client';
import { cn } from '@/utils/classnameMerge';
import { motion, SpringOptions, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: React.ElementType;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = 'span',
}: AnimatedNumberProps) {
  const MotionComponent = motion
  .create(as as any) as React.ComponentType<any>;
  const containerRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);

  const spring = useSpring(0, springOptions);

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        root: null,           // viewport
        rootMargin: '0px',
        threshold: 0.3,       // 30% of the element is visible
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isInView && !hasAnimatedOnce) {
      spring.set(value);
      setHasAnimatedOnce(true);
    }
  }, [isInView, value, spring, hasAnimatedOnce]);

  return (
    <MotionComponent
      ref={containerRef}
      className={cn('tabular-nums', className)}
    >
      {display}
    </MotionComponent>
  );
}
'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type SpringOptions,
  type Transition,
  type Variant,
} from 'motion/react'
import clsx from 'clsx'

type CursorProps = {
  className?: string
  springConfig?: SpringOptions
  variants?: { initial: Variant; animate: Variant; exit: Variant }
  transition?: Transition
  onPositionChange?: (x: number, y: number) => void
  hoverSelector?: string
  onHoverChange?: (el: HTMLElement | null) => void
}

type StylableEl = HTMLElement | SVGElement

export default function Cursor({
  className,
  springConfig,
  variants,
  transition,
  onPositionChange,
  hoverSelector = '[data-cursor],[href],button,[role="button"]',
  onHoverChange,
}: CursorProps) {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const [displayLabel, setDisplayLabel] = useState<string>('') // text bubble
  const [displayStyle, setDisplayStyle] = useState<string>('initial') // variant key
  const [isVisible] = useState(true)

  // Tracks the current [data-cursor] element for messaging
  const lastTargetRef = useRef<HTMLElement | null>(null)

  // Tracks the element we set cursor:none on (inline), so we can restore it
  const forcedElRef = useRef<StylableEl | null>(null)
  const forcedPrevInlineCursorRef = useRef<string | null>(null)

  // Helper: only treat elements with a .style property as stylable (HTMLElement/SVGElement)
  const asStylable = (el: Element | null): StylableEl | null => {
    return el && 'style' in (el as any) ? (el as StylableEl) : null
  }

  useEffect(() => {
    cursorX.set(window.innerWidth / 2)
    cursorY.set(window.innerHeight / 2)
  }, [cursorX, cursorY])

  useEffect(() => {
    const update = (e: MouseEvent) => {
      const { clientX, clientY } = e
      cursorX.set(clientX)
      cursorY.set(clientY)
      onPositionChange?.(clientX, clientY)

      // Element directly under the pointer
      const raw = document.elementFromPoint(clientX, clientY) as Element | null

      // ---- (A) Force-hide native cursor on the hovered element (inline, with !important)
      const nextStylable = asStylable(raw)

      if (forcedElRef.current !== nextStylable) {
        // restore previous inline cursor on the old element
        if (forcedElRef.current) {
          const prev = forcedPrevInlineCursorRef.current
          if (prev === null) {
            forcedElRef.current.style.removeProperty('cursor')
          } else {
            forcedElRef.current.style.setProperty('cursor', prev)
          }
        }
        // set new element
        forcedElRef.current = nextStylable
        forcedPrevInlineCursorRef.current = null

        if (nextStylable) {
          // remember existing inline cursor (NOT computed)
          const prevInline = nextStylable.style.getPropertyValue('cursor')
          forcedPrevInlineCursorRef.current = prevInline || null
          // apply inline important rule to beat any CSS
          nextStylable.style.setProperty('cursor', 'none', 'important')
        }
      }

      // ---- (B) Compute custom-cursor target for messaging once
      const target = (raw?.closest(hoverSelector) ?? null) as HTMLElement | null

      if (target !== lastTargetRef.current) {
        // leaving previous target
        if (lastTargetRef.current) {
          setDisplayLabel('')
          setDisplayStyle('initial')
          onHoverChange?.(target)
        }
        // entering new target
        if (target) {
          setDisplayLabel(target.dataset.cursor ?? '')
          setDisplayStyle(target.dataset.cursorVariant as string)
        }
        lastTargetRef.current = target
      }
    }

    const reset = () => {
      // Reset message/variant
      setDisplayLabel('')
      setDisplayStyle('initial')
      lastTargetRef.current = null

      // Restore any forced inline cursor
      if (forcedElRef.current) {
        const prev = forcedPrevInlineCursorRef.current
        if (prev === null) {
          forcedElRef.current.style.removeProperty('cursor')
        } else {
          forcedElRef.current.style.setProperty('cursor', prev)
        }
        forcedElRef.current = null
        forcedPrevInlineCursorRef.current = null
      }
    }

    document.addEventListener('mousemove', update)
    document.addEventListener('mouseleave', reset)
    window.addEventListener('blur', reset)

    return () => {
      document.removeEventListener('mousemove', update)
      document.removeEventListener('mouseleave', reset)
      window.removeEventListener('blur', reset)
      // best-effort cleanup if unmounting while we forced an element
      if (forcedElRef.current) {
        const prev = forcedPrevInlineCursorRef.current
        if (prev === null) {
          forcedElRef.current.style.removeProperty('cursor')
        } else {
          forcedElRef.current.style.setProperty('cursor', prev)
        }
      }
    }
  }, [hoverSelector, onPositionChange, cursorX, cursorY, onHoverChange])

  const cursorXSpring = useSpring(cursorX, springConfig || { duration: 0 })
  const cursorYSpring = useSpring(cursorY, springConfig || { duration: 0 })

  return (
    <motion.div
      className={clsx('pointer-events-none fixed left-0 top-0 z-[99999]', className)}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
          >
            <div
              dangerouslySetInnerHTML={{ __html: displayLabel }}
              className={clsx(
                'text-lg font-medium px-2 py-1',
                {
                  ['w-10 h-10 rounded-full bg-darkGrey dark:bg-pillGrey']: displayStyle === 'initial',
                  ['bg-success text-background rounded-full']: displayStyle === 'joke' || displayStyle === 'callToAction',
                  ['bg-foreground text-background dark:bg-background dark:text-foreground rounded-md']: displayStyle === 'blogCard',
                  ['bg-blue text-background px-3 py-2 rounded-full']: displayStyle === 'section',
                  ['bg-danger text-background rounded-full']: displayStyle === 'jobCard' || displayStyle === 'projectCard',
                  ['max-w-48 bg-danger text-background rounded-md']: displayStyle === 'testimonialCard',
                  ['bg-jasmine text-foreground rounded-full']: displayStyle === 'tool',
                  ['bg-foreground text-background dark:bg-background dark:text-foreground rounded-full']: displayStyle === 'navLink' || displayStyle === 'image',
                },
              )}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

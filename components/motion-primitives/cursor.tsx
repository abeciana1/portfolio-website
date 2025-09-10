/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { TextCursor, Pointer, MousePointer2 } from 'lucide-react'

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
type PointerTypes = 'pointer' | 'text' | 'default'

export default function Cursor({
  className,
  springConfig,
  variants,
  transition,
  onPositionChange,
  hoverSelector = '[data-cursor],[href],button,[role="button"],[data-cursor-pointer="pointer"],[data-cursor-pointer="text"],[data-cursor-pointer="default"]',
  onHoverChange,
}: CursorProps) {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const [displayLabel, setDisplayLabel] = useState<string>('') // text bubble (HTML allowed)
  const [displayStyle, setDisplayStyle] = useState<string>('initial') // variant key
  const [displayPointer, setDisplayPointer] = useState<PointerTypes>('default')
  const [isVisible] = useState(true)

  console.log('displayPointer', displayPointer)

  // Tracks the current [data-cursor] element for messaging
  const lastTargetRef = useRef<HTMLElement | null>(null)

  // Tracks the element we set cursor:none on (inline), so we can restore it
  const forcedElRef = useRef<StylableEl | null>(null)
  const forcedPrevInlineCursorRef = useRef<string | null>(null)

  // Only treat elements with a .style property as stylable (HTMLElement/SVGElement)
  const asStylable = (el: Element | null): StylableEl | null =>
    el && 'style' in (el as any) ? (el as StylableEl) : null

  // Detect pointer type when data attribute isn't provided
  const detectPointerType = (el: Element | null): PointerTypes => {
    if (!el) return 'default'
    const textHost = (el as Element).closest('input,textarea,[contenteditable="true"],select,[data-cursor-pointer="text"]')
    if (textHost) return 'text'
    const clickable = (el as Element).closest('a,button,[role="button"],[onclick]')
    if (clickable) return 'pointer'
    // fallback to computed style
    const cs = window.getComputedStyle(el as Element)
    console.log('cs.cursor', cs.cursor)
    if (cs.cursor.includes('text')) return 'text'
    if (cs.cursor.includes('pointer')) return 'pointer'
    return 'default'
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
          if (prev === null) forcedElRef.current.style.removeProperty('cursor')
          else forcedElRef.current.style.setProperty('cursor', prev)
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

      // ---- (B) Compute custom-cursor target for messaging and pointer icon
      const target = (raw?.closest(hoverSelector) ?? null) as HTMLElement | null

      if (target !== lastTargetRef.current) {
        // leaving previous target
        if (lastTargetRef.current) {
          setDisplayLabel('')
          setDisplayStyle('initial')
          setDisplayPointer('default')
          onHoverChange?.(target)
        }
        // entering new target
        if (target) {
          console.log('target', target.dataset)
          const nextLabel = target.dataset.cursor ?? ''
          const nextVariant = target.dataset.cursorVariant ?? 'initial'
          const attrPointer = target.dataset.cursorPointer as PointerTypes
          const autoPointer = detectPointerType(target ?? raw)
          setDisplayLabel(nextLabel)
          setDisplayStyle(nextVariant)
          setDisplayPointer(attrPointer ?? autoPointer)
        }
        lastTargetRef.current = target
      }
    }

    const reset = () => {
      // Reset message/variant/icon
      setDisplayLabel('')
      setDisplayStyle('initial')
      setDisplayPointer('default')
      lastTargetRef.current = null

      // Restore any forced inline cursor
      if (forcedElRef.current) {
        const prev = forcedPrevInlineCursorRef.current
        if (prev === null) forcedElRef.current.style.removeProperty('cursor')
        else forcedElRef.current.style.setProperty('cursor', prev)
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
      // cleanup if unmounting while we forced an element
      if (forcedElRef.current) {
        const prev = forcedPrevInlineCursorRef.current
        if (prev === null) forcedElRef.current.style.removeProperty('cursor')
        else forcedElRef.current.style.setProperty('cursor', prev)
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
            <div className="relative">
              {/* pointer icon */}
              {displayPointer === 'default' && (
                <CursorPointer cursorVariant={displayStyle} icon={MousePointer2} />
              )}
              {displayPointer === 'pointer' && (
                <CursorPointer cursorVariant={displayStyle} icon={Pointer} />
              )}
              {displayPointer === 'text' && (
                <CursorPointer cursorVariant={displayStyle} icon={TextCursor} />
              )}

              {/* DOT vs BUBBLE */}
              {displayStyle === 'initial' && !displayLabel ? (
                /* --- tiny dot --- */
                <div
                  className={clsx(
                    'absolute left-5 top-3 w-7 h-7 rounded-full bg-foreground dark:bg-pillGrey text-background dark:text-foreground',
                    {
                      ['ml-2']: displayPointer !== 'default',
                    },
                  )}
                />
              ) : (
                /* --- label bubble --- */
                <div
                  className={clsx(
                    'absolute ml-2 left-5 top-3 inline-flex items-center gap-1',
                    'px-2 py-1 rounded-full text-lg font-medium leading-none',
                    'whitespace-nowrap pointer-events-none',
                    {
                      ['bg-success text-background']:
                        displayStyle === 'joke' || displayStyle === 'callToAction',
                      ['bg-blue text-background px-3 py-2']: displayStyle === 'blogCard' || displayStyle === 'section' || displayStyle === 'navLink' || displayStyle === 'image',
                      ['bg-danger text-background']:
                        displayStyle === 'jobCard' || displayStyle === 'projectCard' || displayStyle === 'testimonialCard',
                      ['max-w-fit break-words rounded-md']: displayStyle === 'testimonialCard',
                      ['bg-jasmine text-foreground']: displayStyle === 'tool',
                      ['bg-success w-0 h-0']: displayPointer === 'text'
                    },
                  )}
                >
                  {/* render your HTML inside a span so the container keeps control over size */}
                  <span
                    // keep inline-block so padding applies around content nicely
                    className="inline-block"
                    dangerouslySetInnerHTML={{ __html: displayLabel }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

type CursorPointerProps = {
  cursorVariant: string
  icon: React.ElementType
}

const CursorPointer: React.FC<CursorPointerProps> = ({ icon, cursorVariant }) => {
  const Icon = icon as React.ElementType
  return (
    <Icon
      size={24}
      strokeWidth={3}
      absoluteStrokeWidth
      className={clsx({
        ['text-foreground dark:text-background']: cursorVariant === 'initial',
        ['text-success']: cursorVariant === 'joke' || cursorVariant === 'callToAction',
        ['text-blue']: cursorVariant === 'section' || cursorVariant === 'blogCard' || cursorVariant === 'navLink' || cursorVariant === 'image',
        ['text-danger']:
          cursorVariant === 'jobCard' ||
          cursorVariant === 'projectCard' ||
          cursorVariant === 'testimonialCard',
        ['text-jasmine']: cursorVariant === 'tool',
      })}
    />
  )
}

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
import useBreakpoint from '@/hooks/useBreakpoint'

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

  const { mounted, isLaptop, isXl, isDesktop } = useBreakpoint()

  // ---- Enable custom cursor only on large screens and non-coarse pointers
  const [isCoarse, setIsCoarse] = useState(false)
  useEffect(() => {
    const coarse =
      (typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches) ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
    setIsCoarse(!!coarse)
  }, [])
  const enableCustom = mounted && (isLaptop || isXl) && !isCoarse

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
    const textHost = (el as Element).closest(
      'input,textarea,[contenteditable="true"],select,[data-cursor-pointer="text"]',
    )
    if (textHost) return 'text'
    const clickable = (el as Element).closest('a,button,[role="button"],[onclick]')
    if (clickable) return 'pointer'
    const cs = window.getComputedStyle(el as Element)
    if (cs.cursor.includes('text')) return 'text'
    if (cs.cursor.includes('pointer')) return 'pointer'
    return 'default'
  }

  // center on mount
  useEffect(() => {
    cursorX.set(window.innerWidth / 2)
    cursorY.set(window.innerHeight / 2)
  }, [cursorX, cursorY])

  // helper to restore any inline cursor we forced
  const restoreForced = () => {
    if (forcedElRef.current) {
      const prev = forcedPrevInlineCursorRef.current
      if (prev === null) forcedElRef.current.style.removeProperty('cursor')
      else forcedElRef.current.style.setProperty('cursor', prev)
      forcedElRef.current = null
      forcedPrevInlineCursorRef.current = null
    }
  }

  // Main pointer logic — runs ONLY when enableCustom = true
  useEffect(() => {
    if (!enableCustom) {
      // if turning off, restore anything we modified and bail
      restoreForced()
      return
    }

    const update = (e: MouseEvent) => {
      const { clientX, clientY } = e
      cursorX.set(clientX)
      cursorY.set(clientY)
      onPositionChange?.(clientX, clientY)

      const raw = document.elementFromPoint(clientX, clientY) as Element | null
      const allowNative = raw?.closest('[data-cursor-allow-native="true"]');
      if (allowNative) {
        // stop forcing inline cursor:none
        restoreForced();

        // optionally idle the custom cursor while over this region
        setDisplayLabel('');
        setDisplayStyle('initial');
        setDisplayPointer('default');
        lastTargetRef.current = null;

        return; // ⬅️ critical: do NOT proceed to hide the native cursor
      }
      // (A) Force-hide native cursor inline on the element under the pointer
      const nextStylable = asStylable(raw)
      if (forcedElRef.current !== nextStylable) {
        restoreForced()
        if (nextStylable) {
          const prevInline = nextStylable.style.getPropertyValue('cursor')
          forcedPrevInlineCursorRef.current = prevInline || null
          nextStylable.style.setProperty('cursor', 'none', 'important')
          forcedElRef.current = nextStylable
        }
      }

      // (B) Compute target for messaging and pointer icon
      const target = (raw?.closest(hoverSelector) ?? null) as HTMLElement | null
      if (target !== lastTargetRef.current) {
        // leaving previous
        if (lastTargetRef.current) {
          setDisplayLabel('')
          setDisplayStyle('initial')
          setDisplayPointer('default')
          onHoverChange?.(target)
        }
        // entering new
        if (target) {
          const nextLabel = target.dataset.cursor ?? ''
          const nextVariant = target.dataset.cursorVariant ?? 'initial'
          const attrPointer = target.dataset.cursorPointer as PointerTypes | undefined
          const autoPointer = detectPointerType(target ?? raw)
          setDisplayLabel(nextLabel)
          setDisplayStyle(nextVariant)
          setDisplayPointer(attrPointer ?? autoPointer)
        }
        lastTargetRef.current = target
      }
    }

    const reset = () => {
      setDisplayLabel('')
      setDisplayStyle('initial')
      setDisplayPointer('default')
      lastTargetRef.current = null
      restoreForced()
    }

    document.addEventListener('mousemove', update)
    document.addEventListener('mouseleave', reset)
    window.addEventListener('blur', reset)

    return () => {
      document.removeEventListener('mousemove', update)
      document.removeEventListener('mouseleave', reset)
      window.removeEventListener('blur', reset)
      restoreForced()
    }
  }, [enableCustom, hoverSelector, onPositionChange, cursorX, cursorY, onHoverChange])

  const cursorXSpring = useSpring(cursorX, springConfig || { duration: 0 })
  const cursorYSpring = useSpring(cursorY, springConfig || { duration: 0 })

  // Render nothing on small / coarse devices → native cursor is used
  if (!enableCustom) return null

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
                <div className="absolute left-5 top-3 w-7 h-7 rounded-full bg-foreground dark:bg-pillGrey" />
              ) : (
                <div
                  className={clsx(
                    'absolute ml-2 left-5 top-3 inline-flex items-center gap-1',
                    'px-2 py-1 rounded-full text-lg font-medium leading-none',
                    'whitespace-nowrap pointer-events-none',
                    {
                      ['bg-success text-background']:
                        displayStyle === 'joke' || displayStyle === 'callToAction',
                      ['bg-blue text-background px-3 py-2']:
                        displayStyle === 'blogCard' ||
                        displayStyle === 'section' ||
                        displayStyle === 'navLink' ||
                        displayStyle === 'image',
                      ['bg-danger text-background']:
                        displayStyle === 'jobCard' ||
                        displayStyle === 'projectCard' ||
                        displayStyle === 'testimonialCard',
                      ['max-w-fit break-words rounded-md']: displayStyle === 'testimonialCard',
                      ['bg-jasmine text-foreground']: displayStyle === 'tool',
                      ['bg-success w-0 h-0']: displayPointer === 'text',
                    },
                  )}
                >
                  <span
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
        ['text-blue']:
          cursorVariant === 'section' ||
          cursorVariant === 'blogCard' ||
          cursorVariant === 'navLink' ||
          cursorVariant === 'image',
        ['text-danger']:
          cursorVariant === 'jobCard' ||
          cursorVariant === 'projectCard' ||
          cursorVariant === 'testimonialCard',
        ['text-jasmine']: cursorVariant === 'tool',
      })}
    />
  )
}

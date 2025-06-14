'use client'
import React, { useEffect, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import { AnimatePresence, motion, MotionConfig, type Transition } from 'motion/react';
import cx from 'classnames'

// * item content
import DarkModeToggle from '@/components/_navigation/DarkModeToggle';

const transition: Transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.25,
};

const Toolbar = () => {
  const [active, setActive] = useState<number | null>(null);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);

  const ITEMS = [
    {
      id: 1,
      label: 'Dark mode',
      component: <DarkModeToggle />,
      content: null,
    }
  ]

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;

    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  return (
    <MotionConfig transition={transition}>
      <div className="z-50 fixed w-full bottom-8" ref={ref}>
        <div className='w-full relative flex justify-center'>
          <div className="h-full w-full max-w-fit rounded-xl border border-zinc-950/10 bg-white">
            <div className="overflow-hidden">
              <AnimatePresence initial={false} mode="sync">
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0 }}
                    animate={{ height: heightContent || 0 }}
                    exit={{ height: 0 }}
                    style={{ width: maxWidth }}
                  >
                    <div ref={contentRef} className="p-2">
                      {ITEMS.map((item) => {
                        if (!item.content) return null;
                        const isSelected = active === item.id;
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isSelected ? 1 : 0 }}
                            exit={{ opacity: 0 }}
                          >
                            <div className={cx('px-2 pt-2 text-sm', { block: isSelected, hidden: !isSelected })}>
                              {item.content}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex space-x-2 p-2" ref={menuRef}>
              {ITEMS.map((item) => {
                if (item.content) {
                  return (
                    <button
                      key={item.id}
                      aria-label={item.label}
                      className={cx(
                        'relative flex h-9 w-9 shrink-0 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]',
                        { 'bg-zinc-100 text-zinc-800': active === item.id }
                      )}
                      type="button"
                      onClick={() => {
                        if (!item.content) return;
                        if (!isOpen) setIsOpen(true);
                        if (active === item.id) {
                          setIsOpen(false);
                          setActive(null);
                          return;
                        }
                        setActive(item.id);
                        }}
                    >
                      {item.component}
                    </button>
                  )
                } else {
                  return (
                    <div key={item?.id}>
                      { item.component }
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

export default Toolbar
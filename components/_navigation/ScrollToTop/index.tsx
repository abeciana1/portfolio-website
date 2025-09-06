'use client'
import { SquareChevronUp } from 'lucide-react'

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      data-testid="scroll-to-top"
      aria-label="Scroll to the top of the page"
      className="transition delay-50 duration-100 ease-in-out hover:bg-zinc-200 rounded-md h-10 w-10 flex justify-center items-center text-foreground"
      onClick={scrollToTop}
    >
      <SquareChevronUp size={24} />
    </button>
  )
}

export default ScrollToTop

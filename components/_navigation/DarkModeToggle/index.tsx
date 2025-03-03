'use client'
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'

type Theme = 'light' | 'dark'

const DarkModeToggle = () => {
  const [theme, setTheme] = useState<Theme>('light')

  const darkModeHandler = (theme: Theme) => {
    setTheme(theme)
    Cookies.set('theme', theme, { expires: 365 })
  }

  console.log('Cookies', Cookies)

  useEffect(() => {
    if (Cookies.get('theme') === 'true') {
      setTheme('dark')
    } else if (Cookies.get('theme') === 'false') {
      setTheme('light')
    } else {
      setTheme('light')
    }
  }, [])

  return (
    <button
      data-testid='dark-mode-toggle'
      aria-label='Toggle Dark Mode'
      onClick={() => darkModeHandler(theme === 'light' ? 'dark' : 'light')}
      className='border-solid border-[1px] border-zinc-200 rounded-full h-10 w-10'
    >
      {(theme === 'dark') &&
        <Moon size={24} />
      }
      {(theme === 'light') &&
        <Sun size={24} /> 
      }
    </button>
  )
}

export default DarkModeToggle
'use client'
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'

type Theme = 'light' | 'dark'

const DarkModeToggle = () => {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const storedTheme = Cookies.get('theme') || 'light';
    setTheme(storedTheme as Theme);
    document.documentElement.className = storedTheme;
  }, []);

  const darkModeHandler = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    Cookies.set('theme', newTheme, { expires: 365 });
  };

  return (
    <span className='relative'>
      <button
        data-testid='dark-mode-toggle'
        aria-label='Toggle Dark Mode'
        onClick={darkModeHandler}
        className='relative transition delay-50 duration-100 ease-in-out hover:bg-zinc-200 rounded-md h-10 w-10 flex justify-center items-center text-foreground'
      >
        {(theme === 'light') &&
          <Moon size={24} />
        }
        {(theme === 'dark') &&
          <Sun size={24} />
        }
      </button>
    </span>
  )
}

export default DarkModeToggle
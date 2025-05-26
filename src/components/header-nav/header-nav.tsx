import { useState } from 'react'

import { Menu, X, LogOut, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { navLinks } from '@/_mocks/data-nav-bar.mock'
import { LanguageSwitcher } from '@/components/language/language-switcher'
import Logo from '@/components/logo/logo'
import { ThemeToggle } from '@/components/theme/theme-toogle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { path } from '@/core/constants/path'
import { useAuthStore } from '@/core/store/features/auth/authStore'

const handleSmoothScroll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, to: string) => {
  e.preventDefault()
  const el = document.querySelector(to)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const Header = () => {
  const { t } = useTranslation(['home'])
  const { t: tAuth } = useTranslation(['auth'])
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <header className='fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur dark:border-gray-800'>
      <nav className='container flex items-center justify-between px-4 py-3 mx-auto'>
        <Logo />
        <ul className='items-center hidden gap-6 md:flex'>
          {navLinks.map((link) => (
            <li key={link.to}>
              <button
                onClick={(e) => handleSmoothScroll(e, link.to)}
                className='px-2 py-1 font-medium text-gray-700 transition-colors bg-transparent border-none rounded cursor-pointer dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
                tabIndex={0}
                aria-label={t(`home.${link.labelKey}`)}
              >
                {t(`home.${link.labelKey}`)}
              </button>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-4'>
          <ThemeToggle />
          <LanguageSwitcher />

          {isAuthenticated ? (
            <div className='flex sm:hidden'>
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    role='button'
                    tabIndex={0}
                    className='relative w-10 h-10 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
                  >
                    <Avatar className='w-10 h-10'>
                      <AvatarImage src={'/images/avatar.png'} alt={user?.name} />
                      <AvatarFallback>{getInitials(user?.name || '')}</AvatarFallback>
                    </Avatar>
                  </div>
                </PopoverTrigger>
                <PopoverContent className='p-4 w-60'>
                  <div className='space-y-4'>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>{user?.name}</p>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>{user?.email}</p>
                    </div>
                    <div className='space-y-2'>
                      <div className='border-b border-gray-200 dark:border-gray-800'>
                        <Button variant='ghost' className='flex items-center justify-start w-full'>
                          <Link to={path.profile.root} className='flex items-center'>
                            <User className='w-4 h-4 mr-2' />
                            {tAuth('auth.profile')}
                          </Link>
                        </Button>
                      </div>
                      <Button variant='destructive' className='w-full' onClick={handleLogout}>
                        <LogOut className='w-4 h-4 mr-2' />
                        {tAuth('auth.logout')}
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : null}
          {isAuthenticated ? (
            <div className='hidden sm:flex'>
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    role='button'
                    tabIndex={0}
                    className='relative w-10 h-10 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
                  >
                    <Avatar className='w-10 h-10'>
                      <AvatarImage src={'/images/avatar.png'} alt={user?.name} />
                      <AvatarFallback>{getInitials(user?.name || '')}</AvatarFallback>
                    </Avatar>
                  </div>
                </PopoverTrigger>
                <PopoverContent className='p-4 w-60'>
                  <div className='space-y-4'>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>{user?.name}</p>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>{user?.email}</p>
                    </div>
                    <div className='space-y-2'>
                      <div className='border-b border-gray-200 dark:border-gray-800'>
                        <Button variant='ghost' className='flex items-center justify-start w-full'>
                          <Link to={path.profile.root} className='flex items-center'>
                            <User className='w-4 h-4 mr-2' />
                            {tAuth('auth.profile')}
                          </Link>
                        </Button>
                      </div>
                      <Button variant='destructive' className='w-full' onClick={handleLogout}>
                        <LogOut className='w-4 h-4 mr-2' />
                        {tAuth('auth.logout')}
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <div className='items-center hidden gap-2 md:flex'>
              <Button
                variant='outline'
                className='px-4 py-2 font-medium text-gray-900 transition-all duration-200 border border-gray-200 rounded-md dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-blue-500'
              >
                <Link to={path.auth.login}>{tAuth('auth.login')}</Link>
              </Button>
              <Button className='px-4 py-2 font-medium text-white transition-all duration-200 bg-blue-600 rounded-md dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500'>
                <Link to={path.auth.register}>{tAuth('auth.register')}</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className='flex items-center justify-center p-2 rounded md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className='text-gray-700 w-7 h-7 dark:text-gray-200' />
          ) : (
            <Menu className='text-gray-700 w-7 h-7 dark:text-gray-200' />
          )}
        </button>
      </nav>

      {/* Mobile nav menu */}
      {menuOpen && (
        <div className='absolute left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden top-full dark:bg-gray-900 dark:border-gray-800 animate-fade-in'>
          <ul className='flex flex-col gap-2 p-4'>
            {navLinks.map((link) => (
              <li key={link.to}>
                <button
                  onClick={(e) => {
                    handleSmoothScroll(e, link.to)
                    setMenuOpen(false)
                  }}
                  className='w-full px-2 py-2 font-medium text-left text-gray-700 transition-colors bg-transparent border-none rounded cursor-pointer dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
                  tabIndex={0}
                  aria-label={t(`home.${link.labelKey}`)}
                >
                  {t(`home.${link.labelKey}`)}
                </button>
              </li>
            ))}
            {}
            {!isAuthenticated && (
              <div className='flex flex-col gap-2'>
                <Button
                  variant='outline'
                  className='px-4 py-2 font-medium text-gray-900 transition-all duration-200 border border-gray-200 rounded-md dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-blue-500'
                >
                  <Link to={path.auth.login} onClick={() => setMenuOpen(false)}>
                    {tAuth('auth.login')}
                  </Link>
                </Button>
                <Button className='px-4 py-2 font-medium text-white transition-all duration-200 bg-blue-600 rounded-md dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500'>
                  <Link to={path.auth.register} onClick={() => setMenuOpen(false)}>
                    {tAuth('auth.register')}
                  </Link>
                </Button>
              </div>
            )}
          </ul>
        </div>
      )}
      <style>{`html { scroll-behavior: smooth; }`}</style>
    </header>
  )
}

export default Header

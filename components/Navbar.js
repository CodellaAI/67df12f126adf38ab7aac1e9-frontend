
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => pathname === path

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600">Tale Weaver</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/') 
                    ? 'border-primary-500 text-secondary-900' 
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/public-tales" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/public-tales') 
                    ? 'border-primary-500 text-secondary-900' 
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                Public Tales
              </Link>
              {isAuthenticated && (
                <Link 
                  href="/generate" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/generate') 
                      ? 'border-primary-500 text-secondary-900' 
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                  }`}
                >
                  Create Tale
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="relative ml-3">
                <div className="flex">
                  <Link href="/dashboard" className="mr-4 text-sm font-medium text-secondary-700 hover:text-secondary-900">
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-secondary-700 hover:text-secondary-900"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-secondary-700 hover:text-secondary-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary-400 hover:text-secondary-500 hover:bg-secondary-100"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/') 
                ? 'border-primary-500 text-primary-700 bg-primary-50' 
                : 'border-transparent text-secondary-500 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-700'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/public-tales"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/public-tales') 
                ? 'border-primary-500 text-primary-700 bg-primary-50' 
                : 'border-transparent text-secondary-500 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-700'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Public Tales
          </Link>
          {isAuthenticated && (
            <>
              <Link
                href="/generate"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/generate') 
                    ? 'border-primary-500 text-primary-700 bg-primary-50' 
                    : 'border-transparent text-secondary-500 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Create Tale
              </Link>
              <Link
                href="/dashboard"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/dashboard') 
                    ? 'border-primary-500 text-primary-700 bg-primary-50' 
                    : 'border-transparent text-secondary-500 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </>
          )}
        </div>
        
        <div className="pt-4 pb-3 border-t border-secondary-200">
          {isAuthenticated ? (
            <div className="mt-3 space-y-1">
              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-secondary-500 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-700"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="mt-3 space-y-1">
              <Link
                href="/login"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-secondary-500 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-700"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-secondary-500 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-700"
                onClick={() => setIsOpen(false)}
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

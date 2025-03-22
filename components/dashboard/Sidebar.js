
"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, PlusCircle, Users, Settings, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { logout } = useAuth()

  const isActive = (path) => pathname === path

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Create Tale', href: '/generate', icon: PlusCircle },
    { name: 'Public Tales', href: '/public-tales', icon: Users },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-50 p-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md text-secondary-500 hover:text-secondary-900"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-secondary-900 bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col h-full">
            <div className="h-16 flex items-center justify-between px-4 border-b border-secondary-200">
              <span className="text-xl font-bold text-primary-600">Tale Weaver</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-secondary-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 ${
                      isActive(item.href) ? 'text-primary-700' : 'text-secondary-500 group-hover:text-secondary-900'
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="p-4 border-t border-secondary-200">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  logout()
                }}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 w-full"
              >
                <LogOut className="mr-3 h-6 w-6 text-secondary-500 group-hover:text-secondary-900" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-secondary-200 bg-white">
          <div className="h-16 flex items-center px-6 border-b border-secondary-200">
            <span className="text-xl font-bold text-primary-600">Tale Weaver</span>
          </div>
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.href) ? 'text-primary-700' : 'text-secondary-500 group-hover:text-secondary-900'
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="p-4 mt-auto">
              <button
                onClick={logout}
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 w-full"
              >
                <LogOut className="mr-3 h-5 w-5 text-secondary-500 group-hover:text-secondary-900" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

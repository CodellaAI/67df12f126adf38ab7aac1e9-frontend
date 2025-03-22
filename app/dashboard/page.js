
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'
import { PlusCircle, BookOpen, Clock, BarChart2 } from 'lucide-react'
import TaleCard from '@/components/dashboard/TaleCard'

export default function Dashboard() {
  const [tales, setTales] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalTales: 0,
    publicTales: 0,
    likesReceived: 0
  })
  const { user } = useAuth()

  useEffect(() => {
    const fetchTales = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tales/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setTales(response.data.tales)
        
        // Calculate stats
        const totalTales = response.data.tales.length
        const publicTales = response.data.tales.filter(tale => tale.isPublic).length
        const likesReceived = response.data.tales.reduce((sum, tale) => sum + (tale.likes || 0), 0)
        
        setStats({
          totalTales,
          publicTales,
          likesReceived
        })
      } catch (error) {
        console.error('Error fetching tales:', error)
        toast.error('Failed to load your tales')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTales()
  }, [])

  const handleTogglePublic = async (id, currentStatus) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tales/${id}`,
        { isPublic: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      
      // Update local state
      setTales(tales.map(tale => 
        tale._id === id ? { ...tale, isPublic: !currentStatus } : tale
      ))
      
      // Update stats
      setStats(prev => ({
        ...prev,
        publicTales: currentStatus 
          ? prev.publicTales - 1 
          : prev.publicTales + 1
      }))
      
      toast.success(`Tale is now ${!currentStatus ? 'public' : 'private'}`)
    } catch (error) {
      console.error('Error updating tale:', error)
      toast.error('Failed to update tale visibility')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this tale?')) return
    
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/tales/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      // Update local state
      const deletedTale = tales.find(tale => tale._id === id)
      setTales(tales.filter(tale => tale._id !== id))
      
      // Update stats
      setStats(prev => ({
        totalTales: prev.totalTales - 1,
        publicTales: deletedTale.isPublic ? prev.publicTales - 1 : prev.publicTales,
        likesReceived: prev.likesReceived - (deletedTale.likes || 0)
      }))
      
      toast.success('Tale deleted successfully')
    } catch (error) {
      console.error('Error deleting tale:', error)
      toast.error('Failed to delete tale')
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
        <Link href="/generate" className="btn-primary">
          <PlusCircle className="mr-2 h-5 w-5" />
          Create New Tale
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-white">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-500">Total Tales</p>
              <p className="text-2xl font-semibold text-secondary-900">{stats.totalTales}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-white">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <BarChart2 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-500">Public Tales</p>
              <p className="text-2xl font-semibold text-secondary-900">{stats.publicTales}</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-white">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-500">Likes Received</p>
              <p className="text-2xl font-semibold text-secondary-900">{stats.likesReceived}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-secondary-900 mb-4">Your Tales</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : tales.length === 0 ? (
          <div className="card bg-white text-center py-12">
            <h3 className="text-lg font-medium text-secondary-700 mb-2">You haven't created any tales yet</h3>
            <p className="text-secondary-500 mb-6">Get started by creating your first magical tale</p>
            <Link href="/generate" className="btn-primary">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Your First Tale
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tales.map(tale => (
              <TaleCard
                key={tale._id}
                tale={tale}
                onTogglePublic={handleTogglePublic}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

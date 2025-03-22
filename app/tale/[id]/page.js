
"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'
import { ArrowLeft, Heart, Share2, Loader2 } from 'lucide-react'

export default function TaleDetail() {
  const { id } = useParams()
  const [tale, setTale] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchTale = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tales/${id}`)
        setTale(response.data.tale)
        
        // Check if user has liked this tale
        if (isAuthenticated) {
          try {
            const likeResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/tales/${id}/like`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              }
            )
            setIsLiked(likeResponse.data.liked)
          } catch (error) {
            console.error('Error checking like status:', error)
          }
        }
      } catch (error) {
        console.error('Error fetching tale:', error)
        toast.error('Failed to load tale')
        router.push('/public-tales')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTale()
  }, [id, isAuthenticated, router])

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to like tales')
      return
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tales/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      
      setIsLiked(response.data.liked)
      setTale(prev => ({
        ...prev,
        likes: response.data.liked ? prev.likes + 1 : prev.likes - 1
      }))
      
      toast.success(response.data.liked ? 'Tale liked!' : 'Like removed')
    } catch (error) {
      console.error('Error liking tale:', error)
      toast.error('Failed to update like')
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
      </div>
    )
  }

  if (!tale) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-50 px-4">
        <h1 className="text-2xl font-bold text-secondary-900 mb-4">Tale not found</h1>
        <p className="text-secondary-600 mb-8">The tale you're looking for doesn't exist or may have been removed.</p>
        <Link href="/public-tales" className="btn-primary">
          Browse Public Tales
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/public-tales" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all tales
        </Link>
        
        <div className="card bg-white mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">{tale.title}</h1>
              <p className="text-secondary-600">
                By {tale.author?.name || 'Anonymous'} • For ages {tale.ageRange} • 
                Topic: {tale.topic.charAt(0).toUpperCase() + tale.topic.slice(1)}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={handleLike}
                className={`p-2 rounded-full ${isLiked ? 'bg-red-100 text-red-600' : 'bg-secondary-100 text-secondary-600'} hover:bg-opacity-80 transition-colors`}
                aria-label={isLiked ? 'Unlike' : 'Like'}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 rounded-full bg-secondary-100 text-secondary-600 hover:bg-opacity-80 transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="prose prose-primary max-w-none">
            {tale.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-secondary-700">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-secondary-200 flex items-center justify-between">
            <div className="flex items-center">
              <Heart className={`h-5 w-5 ${isLiked ? 'text-red-600 fill-current' : 'text-secondary-600'} mr-1`} />
              <span className="text-secondary-700">{tale.likes} {tale.likes === 1 ? 'like' : 'likes'}</span>
            </div>
            
            <div className="text-secondary-600 text-sm">
              Created on {new Date(tale.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        {isAuthenticated && user?._id === tale.author?._id && (
          <div className="text-center">
            <Link href="/dashboard" className="text-primary-600 hover:text-primary-700">
              Manage this tale in your dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

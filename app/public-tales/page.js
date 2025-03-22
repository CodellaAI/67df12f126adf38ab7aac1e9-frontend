
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'
import { Search, Filter, Loader2, Heart } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PublicTales() {
  const [tales, setTales] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    ageRange: '',
    topic: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const { isAuthenticated } = useAuth()

  const ageRanges = [
    { value: '', label: 'All Ages' },
    { value: '2-4', label: '2-4 years' },
    { value: '5-7', label: '5-7 years' },
    { value: '8-10', label: '8-10 years' },
    { value: '11-13', label: '11-13 years' }
  ]

  const topics = [
    { value: '', label: 'All Topics' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'animals', label: 'Animals' },
    { value: 'friendship', label: 'Friendship' },
    { value: 'nature', label: 'Nature' },
    { value: 'space', label: 'Space' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' },
    { value: 'sports', label: 'Sports' }
  ]

  useEffect(() => {
    const fetchTales = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tales/public`)
        setTales(response.data.tales)
      } catch (error) {
        console.error('Error fetching tales:', error)
        toast.error('Failed to load tales')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTales()
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const resetFilters = () => {
    setSearchTerm('')
    setFilters({
      ageRange: '',
      topic: ''
    })
  }

  const filteredTales = tales.filter(tale => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      tale.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tale.content && tale.content.toLowerCase().includes(searchTerm.toLowerCase()))
    
    // Filter by age range
    const matchesAgeRange = filters.ageRange === '' || tale.ageRange === filters.ageRange
    
    // Filter by topic
    const matchesTopic = filters.topic === '' || tale.topic === filters.topic
    
    return matchesSearch && matchesAgeRange && matchesTopic
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-900 mb-4">Public Tales</h1>
            <p className="text-secondary-600 max-w-3xl">
              Explore a collection of magical tales created by our community. Find stories perfect for your child's age and interests.
            </p>
          </div>
          
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-secondary-400" />
              </div>
              <input
                type="text"
                placeholder="Search tales by title or content..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary md:w-auto"
            >
              <Filter className="mr-2 h-5 w-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {isAuthenticated && (
              <Link href="/generate" className="btn-primary md:w-auto">
                Create Your Own Tale
              </Link>
            )}
          </div>
          
          {showFilters && (
            <div className="mb-8 p-6 bg-white rounded-xl shadow-soft">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ageRange" className="block text-sm font-medium text-secondary-700 mb-1">
                    Age Range
                  </label>
                  <select
                    id="ageRange"
                    name="ageRange"
                    className="input-field"
                    value={filters.ageRange}
                    onChange={handleFilterChange}
                  >
                    {ageRanges.map(range => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-secondary-700 mb-1">
                    Topic
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    className="input-field"
                    value={filters.topic}
                    onChange={handleFilterChange}
                  >
                    {topics.map(topic => (
                      <option key={topic.value} value={topic.value}>
                        {topic.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
            </div>
          ) : filteredTales.length === 0 ? (
            <div className="card bg-white text-center py-12">
              <h3 className="text-lg font-medium text-secondary-700 mb-2">No tales found</h3>
              <p className="text-secondary-500 mb-6">Try adjusting your filters or search terms</p>
              <button
                onClick={resetFilters}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTales.map(tale => (
                <Link href={`/tale/${tale._id}`} key={tale._id} className="card card-hover">
                  <div className="mb-4">
                    <div className="text-xs font-medium text-primary-600 mb-1">
                      Ages {tale.ageRange} • {tale.topic.charAt(0).toUpperCase() + tale.topic.slice(1)}
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-2 line-clamp-1">{tale.title}</h3>
                    <p className="text-secondary-600 line-clamp-3">
                      {tale.content.substring(0, 150)}...
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-secondary-500">
                      By {tale.author?.name || 'Anonymous'}
                    </div>
                    <div className="flex items-center text-secondary-500">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{tale.likes}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

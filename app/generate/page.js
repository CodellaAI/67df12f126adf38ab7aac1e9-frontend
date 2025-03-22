
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Wand2, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function GenerateTale() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTale, setGeneratedTale] = useState(null)
  const router = useRouter()

  const ageRanges = [
    { value: '2-4', label: '2-4 years (Toddlers)' },
    { value: '5-7', label: '5-7 years (Early readers)' },
    { value: '8-10', label: '8-10 years (Middle childhood)' },
    { value: '11-13', label: '11-13 years (Pre-teens)' }
  ]

  const topics = [
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

  const onSubmit = async (data) => {
    setIsGenerating(true)
    setGeneratedTale(null)
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tales/generate`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      
      setGeneratedTale(response.data.tale)
      toast.success('Tale generated successfully!')
    } catch (error) {
      console.error('Error generating tale:', error)
      toast.error(error.response?.data?.message || 'Failed to generate tale. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!generatedTale) return
    
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tales`,
        {
          title: generatedTale.title,
          content: generatedTale.content,
          ageRange: generatedTale.ageRange,
          topic: generatedTale.topic,
          isPublic: false
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      
      toast.success('Tale saved to your collection!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error saving tale:', error)
      toast.error('Failed to save tale. Please try again.')
    }
  }

  const handleGenerateAnother = () => {
    setGeneratedTale(null)
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <Link href="/dashboard" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to dashboard
      </Link>
      
      <h1 className="text-3xl font-bold text-secondary-900 mb-8">Create a Magical Tale</h1>
      
      {!generatedTale ? (
        <div className="card bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="ageRange" className="block text-sm font-medium text-secondary-700 mb-1">
                Child's Age Range
              </label>
              <select
                id="ageRange"
                className={`input-field ${errors.ageRange ? 'ring-red-500 focus:ring-red-500' : ''}`}
                {...register('ageRange', { required: 'Age range is required' })}
              >
                <option value="">Select age range</option>
                {ageRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              {errors.ageRange && (
                <p className="mt-1 text-sm text-red-600">{errors.ageRange.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-secondary-700 mb-1">
                Topic
              </label>
              <select
                id="topic"
                className={`input-field ${errors.topic ? 'ring-red-500 focus:ring-red-500' : ''}`}
                {...register('topic', { required: 'Topic is required' })}
              >
                <option value="">Select a topic</option>
                {topics.map(topic => (
                  <option key={topic.value} value={topic.value}>
                    {topic.label}
                  </option>
                ))}
              </select>
              {errors.topic && (
                <p className="mt-1 text-sm text-red-600">{errors.topic.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="mainCharacter" className="block text-sm font-medium text-secondary-700 mb-1">
                Main Character Name (optional)
              </label>
              <input
                id="mainCharacter"
                type="text"
                className="input-field"
                placeholder="Leave blank for a random character"
                {...register('mainCharacter')}
              />
            </div>
            
            <div>
              <label htmlFor="setting" className="block text-sm font-medium text-secondary-700 mb-1">
                Setting (optional)
              </label>
              <input
                id="setting"
                type="text"
                className="input-field"
                placeholder="e.g., Enchanted forest, Space station, etc."
                {...register('setting')}
              />
            </div>
            
            <div>
              <label htmlFor="additionalDetails" className="block text-sm font-medium text-secondary-700 mb-1">
                Additional Details (optional)
              </label>
              <textarea
                id="additionalDetails"
                rows={3}
                className="input-field"
                placeholder="Any specific elements you'd like to include in the story..."
                {...register('additionalDetails')}
              />
            </div>
            
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full btn-primary"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Crafting your tale...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Generate Tale
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="card bg-white">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">{generatedTale.title}</h2>
            
            <div className="prose prose-primary max-w-none">
              {generatedTale.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-secondary-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSave}
              className="btn-primary flex-1"
            >
              Save to My Collection
            </button>
            <button
              onClick={handleGenerateAnother}
              className="btn-secondary flex-1"
            >
              Generate Another Tale
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


import Link from 'next/link'
import { Eye, EyeOff, Trash2, ExternalLink } from 'lucide-react'

export default function TaleCard({ tale, onTogglePublic, onDelete }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <div className="card bg-white">
      <div className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <div className="text-xs font-medium text-primary-600">
            Ages {tale.ageRange} • {tale.topic.charAt(0).toUpperCase() + tale.topic.slice(1)}
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => onTogglePublic(tale._id, tale.isPublic)}
              className={`p-1.5 rounded-full ${
                tale.isPublic ? 'bg-green-100 text-green-600' : 'bg-secondary-100 text-secondary-600'
              } hover:bg-opacity-80 transition-colors`}
              title={tale.isPublic ? 'Make private' : 'Make public'}
            >
              {tale.isPublic ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
            <button
              onClick={() => onDelete(tale._id)}
              className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-opacity-80 transition-colors"
              title="Delete tale"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <h3 className="text-lg font-bold text-secondary-900 mb-2 line-clamp-1">{tale.title}</h3>
        <p className="text-secondary-600 text-sm line-clamp-3 mb-4">
          {truncateContent(tale.content)}
        </p>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-secondary-200">
        <div className="text-xs text-secondary-500">
          Created {formatDate(tale.createdAt)}
        </div>
        <div className="flex items-center">
          {tale.isPublic && (
            <div className="flex items-center text-secondary-500 mr-3 text-xs">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>{tale.likes || 0}</span>
            </div>
          )}
          <Link 
            href={`/tale/${tale._id}`}
            className="inline-flex items-center text-xs font-medium text-primary-600 hover:text-primary-700"
          >
            View Tale
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}

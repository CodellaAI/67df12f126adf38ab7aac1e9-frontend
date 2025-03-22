
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowRight, Sparkles, Book, Heart, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-secondary-900">
                  Create Magical Tales for <span className="text-primary-600">Children</span> with AI
                </h1>
                <p className="text-xl text-secondary-600 max-w-2xl">
                  Craft personalized stories tailored to your child's age, interests, and imagination. Powered by advanced AI to create engaging, age-appropriate tales.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/generate" className="btn-primary">
                    Create Your Tale <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link href="/public-tales" className="btn-secondary">
                    Browse Public Tales
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src="/images/hero-illustration.jpg" 
                  alt="Children reading a magical storybook"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-secondary-900">How Tale Weaver Works</h2>
              <p className="mt-4 text-xl text-secondary-600 max-w-3xl mx-auto">
                Our AI-powered platform makes it easy to create personalized stories in just a few simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="card card-hover">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                  <Sparkles className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Customize Your Tale</h3>
                <p className="text-secondary-600">
                  Select your child's age, preferred topics, characters, and settings to create a perfectly tailored story.
                </p>
              </div>
              
              <div className="card card-hover">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                  <Book className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Generate Instantly</h3>
                <p className="text-secondary-600">
                  Our AI crafts a unique, engaging story in seconds based on your specifications.
                </p>
              </div>
              
              <div className="card card-hover">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                  <Heart className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Share & Collect</h3>
                <p className="text-secondary-600">
                  Save your tales, make them public, and explore stories created by other parents and educators.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-secondary-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-secondary-900">Loved by Parents & Educators</h2>
              <p className="mt-4 text-xl text-secondary-600 max-w-3xl mx-auto">
                See what our community is saying about Tale Weaver AI.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "My 5-year-old daughter can't get enough of these personalized stories. It's become our nightly ritual!",
                  author: "Sarah M., Parent"
                },
                {
                  quote: "As a kindergarten teacher, I use Tale Weaver to create custom stories that address specific learning themes in my classroom.",
                  author: "Michael T., Educator"
                },
                {
                  quote: "The ability to customize stories based on my son's interests has made bedtime reading so much more engaging.",
                  author: "Jennifer L., Parent"
                }
              ].map((testimonial, index) => (
                <div key={index} className="card bg-white">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-secondary-700 mb-4 italic">"{testimonial.quote}"</p>
                  <p className="text-secondary-600 font-medium">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to create magical tales?</h2>
                <p className="text-primary-100 text-lg mb-8">
                  Join thousands of parents and educators creating personalized stories that children love.
                </p>
                <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-primary-700 bg-white rounded-md shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

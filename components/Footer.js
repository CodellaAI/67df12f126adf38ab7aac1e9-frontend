
export default function Footer() {
  return (
    <footer className="bg-white border-t border-secondary-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-xl font-bold text-primary-600 mb-4">Tale Weaver</div>
            <p className="text-secondary-600 max-w-md">
              Create magical, personalized stories for children with our AI-powered tale generator. Perfect for parents, teachers, and storytellers.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 tracking-wider uppercase mb-4">Explore</h3>
            <ul className="space-y-4">
              <li>
                <a href="/" className="text-base text-secondary-600 hover:text-secondary-900">
                  Home
                </a>
              </li>
              <li>
                <a href="/public-tales" className="text-base text-secondary-600 hover:text-secondary-900">
                  Public Tales
                </a>
              </li>
              <li>
                <a href="/generate" className="text-base text-secondary-600 hover:text-secondary-900">
                  Create a Tale
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 tracking-wider uppercase mb-4">Account</h3>
            <ul className="space-y-4">
              <li>
                <a href="/login" className="text-base text-secondary-600 hover:text-secondary-900">
                  Sign In
                </a>
              </li>
              <li>
                <a href="/register" className="text-base text-secondary-600 hover:text-secondary-900">
                  Create Account
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-base text-secondary-600 hover:text-secondary-900">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-secondary-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-secondary-500">
            &copy; {new Date().getFullYear()} Tale Weaver AI. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-secondary-500 hover:text-secondary-900">
              <span className="sr-only">Privacy Policy</span>
              Privacy Policy
            </a>
            <a href="#" className="text-secondary-500 hover:text-secondary-900">
              <span className="sr-only">Terms of Service</span>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

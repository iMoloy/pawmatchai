import Link from "next/link";

export default function Hero() {
  return (
    <section className="h-[65vh] min-h-125 bg-linear-to-br from-teal-50 to-slate-100 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Find Your Perfect{" "}
                <span className="text-teal-700">Pet Match</span> with AI
              </h1>
              <p className="text-lg text-slate-600 max-w-lg">
                Discover your ideal companion through our intelligent matching
                system. Browse thousands of pets waiting for their forever
                homes.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search by breed, location, or name..."
                className="w-full px-6 py-4 pr-12 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white bg-teal-700 rounded-full hover:bg-teal-800 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/ai-match"
                className="px-8 py-4 bg-teal-700 text-white rounded-full font-semibold text-center hover:bg-teal-800 transition-colors shadow-lg hover:shadow-xl"
              >
                Find My Match with AI
              </Link>
              <Link
                href="/explore"
                className="px-8 py-4 bg-white text-teal-700 border border-teal-700 rounded-full font-semibold text-center hover:bg-teal-50 transition-colors"
              >
                Explore Pets
              </Link>
            </div>
          </div>

          {/* Right Image/Carousel */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-tr from-teal-400 to-coral-400 opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=1200" 
                alt="Happy dog looking out" 
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

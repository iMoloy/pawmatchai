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
              <a
                href="/match"
                className="px-8 py-4 bg-teal-700 text-white rounded-full font-semibold text-center hover:bg-teal-800 transition-colors shadow-lg hover:shadow-xl"
              >
                Find My Match with AI
              </a>
              <a
                href="/explore"
                className="px-8 py-4 bg-white text-teal-700 border border-teal-700 rounded-full font-semibold text-center hover:bg-teal-50 transition-colors"
              >
                Explore Pets
              </a>
            </div>
          </div>

          {/* Right Image/Carousel */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-tr from-teal-400 to-coral-400 opacity-20"></div>
              <div className="w-full h-full bg-slate-200 rounded-3xl flex items-center justify-center">
                <svg
                  className="w-32 h-32 text-teal-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.9c-3.91-.5-7-3.78-7-7.9 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.9zm6.79-1.79c.13-.58.21-1.17.21-1.79 0-4.12-3.09-7.4-7-7.9v1.9c0 .55.45 1 1 1h4.59l5-5H17V5h4c1.1 0 2 .9 2 2v4h-2V7.59l-5 5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

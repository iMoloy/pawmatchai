import React from "react";

export default function Newsletter() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 border border-slate-200 shadow-sm">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Stay Updated with PawMatch AI
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Get the latest pet profiles, adoption stories, and AI matching
              tips delivered to your inbox
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="grow px-6 py-4 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-teal-700 text-white font-medium rounded-full hover:bg-teal-800 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <p className="text-sm text-slate-500 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

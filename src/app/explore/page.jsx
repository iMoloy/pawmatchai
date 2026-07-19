"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PetCard from "@/components/PetCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  // TanStack Query to fetch data from the Express backend
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pets", { search, species, ageRange, size, location, sort, page }],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/api/pets", {
        params: {
          search,
          species,
          ageRange,
          size,
          location,
          sort,
          page,
          limit: 8
        }
      });
      return response.data;
    },
    placeholderData: (keepPreviousData) => keepPreviousData, // Keep previous data visible while fetching new page
  });

  const clearFilters = () => {
    setSearch("");
    setSpecies("");
    setAgeRange("");
    setSize("");
    setLocation("");
    setSort("newest");
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Banner Section */}
        <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-r from-teal-700 to-emerald-600 text-white p-8 md:p-12 shadow-lg">
          <div className="absolute top-0 right-0 opacity-10 translate-x-12 -translate-y-12">
            <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="bg-teal-500/30 text-teal-100 border border-teal-400/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Find Your Friend
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 tracking-tight leading-tight">
              Explore Our Adorable Pets
            </h1>
            <p className="text-teal-100 text-lg mt-3 font-medium">
              Every pet deserves a loving home. Filter by species, age, and size to meet your perfect match.
            </p>
          </div>
        </div>

        {/* Filters and Search Bar Container */}
        <section className="bg-white rounded-2xl border border-slate-200/60 p-6 md:p-8 shadow-sm mb-10">
          <div className="grid grid-cols-1 gap-6">
            
            {/* Search Bar */}
            <div className="relative w-full max-w-xl mx-auto">
              <label htmlFor="search" className="sr-only">Search pets</label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="search"
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1); // Reset page to 1 on search
                }}
                placeholder="Search by name, breed, location..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Filter controls row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
              
              {/* Species Select */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="species" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Species</label>
                <select
                  id="species"
                  value={species}
                  onChange={(e) => {
                    setSpecies(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all duration-200"
                >
                  <option value="">All Species</option>
                  <option value="dog">Dogs</option>
                  <option value="cat">Cats</option>
                </select>
              </div>

              {/* Age Select */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="age" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Age Range</label>
                <select
                  id="age"
                  value={ageRange}
                  onChange={(e) => {
                    setAgeRange(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all duration-200"
                >
                  <option value="">All Ages</option>
                  <option value="puppy">Puppy / Kitten (&lt;1 yr)</option>
                  <option value="young">Young (1-3 yrs)</option>
                  <option value="adult">Adult (3-7 yrs)</option>
                  <option value="senior">Senior (7+ yrs)</option>
                </select>
              </div>

              {/* Size Select */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="size" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Size</label>
                <select
                  id="size"
                  value={size}
                  onChange={(e) => {
                    setSize(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all duration-200"
                >
                  <option value="">All Sizes</option>
                  <option value="small">Small (under 15 lbs)</option>
                  <option value="medium">Medium (15-50 lbs)</option>
                  <option value="large">Large (over 50 lbs)</option>
                </select>
              </div>

              {/* Location Select */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="location" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all duration-200"
                >
                  <option value="">Anywhere</option>
                  <option value="nearby">Near Me (Same State)</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="sort" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sort By</label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all duration-200"
                >
                  <option value="newest">Newest Listed</option>
                  <option value="closest">Closest Location</option>
                  <option value="youngest">Youngest Age</option>
                </select>
              </div>

            </div>

            {/* Clear filters action */}
            {(search || species || ageRange || size || location || sort !== "newest") && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-teal-600 hover:text-teal-850 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear Filters
                </button>
              </div>
            )}

          </div>
        </section>

        {/* Loading Spinner */}
        {isLoading ? (
          <LoadingSpinner message="Searching for pets..." />
        ) : isError ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md mx-auto">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-bold text-red-800 mb-1">Failed to load pets</h3>
            <p className="text-red-700 text-sm mb-4">
              {error?.message || "There was an error communicating with the backend server."}
            </p>
            <button
              onClick={() => clearFilters()}
              className="px-6 py-2 bg-red-700 text-white font-semibold rounded-xl text-sm hover:bg-red-800 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-650 text-sm font-medium">
                Showing <span className="font-bold text-slate-800">{data?.pets?.length || 0}</span> of <span className="font-bold text-slate-800">{data?.totalCount || 0}</span> pets available
              </p>
            </div>

            {/* Pets Grid */}
            {data?.pets?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.pets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">No pets found</h3>
                <p className="text-slate-500 text-sm mb-6">
                  We couldn't find any pets matching your criteria. Try adjusting or clearing your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-teal-700 text-white font-semibold rounded-xl text-sm hover:bg-teal-800 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {data?.totalPages > 1 && (
              <nav className="mt-12 flex justify-center items-center gap-1.5" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3.5 py-2 text-slate-650 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {[...Array(data.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-xl transition-all ${
                      page === i + 1
                        ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
                        : "bg-white text-slate-650 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(Math.min(data.totalPages, page + 1))}
                  disabled={page === data.totalPages}
                  className="px-3.5 py-2 text-slate-650 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

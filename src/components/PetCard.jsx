import React from 'react';
import Link from 'next/link';

export default function PetCard({ pet }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
      {/* Image with zoom on hover */}
      <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
        {pet.image ? (
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6.75 6.75h.01M12 6.75h.01M17.25 6.75h.01"
              />
            </svg>
          </div>
        )}
        
        {/* Badge (e.g. Sex or Badge) */}
        <div className="absolute top-3 right-3 flex gap-1">
          {pet.sex && (
            <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full shadow-sm ${
              pet.sex === 'Male' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-pink-50 text-pink-700 border border-pink-200'
            }`}>
              {pet.sex}
            </span>
          )}
          {pet.vaccinated && (
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-full shadow-sm">
              Vaccinated
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow justify-between">
        <div>
          {/* Breed / Species Tag */}
          <div className="text-xs font-semibold text-teal-600 tracking-wider uppercase mb-1">
            {pet.breed} {pet.species ? `• ${pet.species}` : ''}
          </div>
          
          {/* Name */}
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors">
            {pet.name}
          </h3>

          {/* Meta row: Age & Location */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {typeof pet.age === 'number' ? `${pet.age} ${pet.age === 1 ? 'year' : 'years'}` : pet.age}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 truncate">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {pet.location}
            </span>
          </div>
        </div>

        {/* Adoption Fee & View Details Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div>
            <p className="text-xs text-slate-400 uppercase font-medium">Adoption Fee</p>
            <p className="text-lg font-bold text-teal-800">${pet.fee || '100'}</p>
          </div>
          <Link
            href={`/pets/${pet.id}`}
            className="px-4 py-2.5 bg-teal-700 text-white font-semibold text-sm rounded-xl hover:bg-teal-850 hover:shadow-md transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

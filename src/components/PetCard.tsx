import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Pet {
 id: string | number;
 name: string;
 breed: string;
 species?: string;
 age: string | number;
 location: string;
 fee?: number | string;
 image?: string;
 sex?: string;
 vaccinated?: boolean;
}

interface PetCardProps {
 pet: Pet;
 aiReason?: string;
 onLike?: (id: string | number) => void;
 onDislike?: (id: string | number) => void;
}

export default function PetCard({ pet, aiReason, onLike, onDislike }: PetCardProps) {
 return (
 <div className={`group bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full ${aiReason ? 'ring-2 ring-teal-500/30' : ''}`}>
 {/* Image with zoom on hover */}
 <div className="aspect-4/3 bg-slate-100 relative overflow-hidden">
 {pet.image ? (
 <img
 src={pet.image}
 alt={pet.name}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
 />
 ) : (
 <div className="w-full h-full flex items-center justify-center">
 <span className="text-4xl">📷</span>
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
 <span className="text-xs">🎂</span>
 {typeof pet.age === 'number' ? `${pet.age} ${pet.age === 1 ? 'year' : 'years'}` : pet.age}
 </span>
 <span>•</span>
 <span className="flex items-center gap-1 truncate">
 <span className="text-xs">📍</span>
 {pet.location}
 </span>
 </div>
 </div>

 {/* AI Reason Blurb */}
 {aiReason && (
 <div className="mt-4 mb-2 p-4 rounded-xl bg-linear-to-r from-teal-50 to-emerald-50 border border-teal-100/50">
 <div className="flex items-start gap-3">
 <span className="text-teal-600 text-lg">✨</span>
 <p className="text-sm text-slate-700 italic leading-relaxed flex-1">
 &quot;{aiReason}&quot;
 </p>
 </div>
 {(onLike || onDislike) && (
 <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-teal-100/50">
 <button 
 onClick={(e) => { e.preventDefault(); onDislike && onDislike(pet.id); }}
 className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors shadow-sm"
 aria-label="Not a good match"
 >
 <span className="text-base">👎</span>
 </button>
 <button 
 onClick={(e) => { e.preventDefault(); onLike && onLike(pet.id); }}
 className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-colors shadow-sm"
 aria-label="Good match"
 >
 <span className="text-base">👍</span>
 </button>
 </div>
 )}
 </div>
 )}

 {/* Adoption Fee & View Details Button */}
 <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
 <div>
 <p className="text-xs text-slate-400 uppercase font-medium">Adoption Fee</p>
 <p className="text-lg font-bold text-teal-800">${pet.fee || '100'}</p>
 </div>
 <Link
 href={`/pets/${pet.id}`}
 className="px-4 py-2.5 bg-linear-to-r from-teal-600 to-emerald-600 text-white border-0 font-semibold text-sm rounded-full hover:from-teal-700 hover:to-emerald-700 hover:shadow-md transition-all duration-200"
 >
 View Details
 </Link>
 </div>
 </div>
 </div>
 );
}
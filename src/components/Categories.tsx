import React from "react";

const categories = [
  {
    id: 1,
    title: "Dogs",
    description: "Loyal & energetic companions",
    count: "240+",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 005 0" />
      </svg>
    ),
    emoji: "🐶",
  },
  {
    id: 2,
    title: "Cats",
    description: "Independent & loving companions",
    count: "180+",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m-15 0l15 15" />
      </svg>
    ),
    emoji: "🐱",
  },
  {
    id: 3,
    title: "Small Pets",
    description: "Little bundles of pure joy",
    count: "95+",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    emoji: "🐰",
  },
  {
    id: 4,
    title: "Others",
    description: "Special rescue companions",
    count: "65+",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    emoji: "🐾",
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find your perfect companion by choosing from our popular categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/explore?species=${category.title === "Others" || category.title === "Small Pets" ? "" : category.title}`}
              className="group bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-teal-50 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform shadow-inner">
                {category.emoji}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">{category.title}</h3>
              <p className="text-xs text-slate-500 mb-3">{category.description}</p>
              <span className="inline-block px-3 py-1 bg-teal-100/80 text-teal-800 font-bold text-xs rounded-full">
                {category.count} pets
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const categories = [
  {
    id: 1,
    title: 'Dogs',
    description: 'Man\'s best friend',
    count: '240+',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 4.5C2.895 4.5 2 5.395 2 6.5v11c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-5.5c0-.276-.224-.5-.5-.5H17V6.5c0-1.105-.895-2-2-2H4zm0 2h11v8.5c0 .276.224.5.5.5H17v4.5c0 .276-.224.5-.5.5H4c-.276 0-.5-.224-.5-.5v-11c0-.276.224-.5.5-.5zm15 4.5V6.5c0-.276.224-.5.5-.5h1c.276 0 .5.224.5.5v2.5c0 .276-.224.5-.5.5h-1c-.276 0-.5-.224-.5-.5z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Cats',
    description: 'Independent companions',
    count: '180+',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C9.238 2 7 4.238 7 7c0 1.657.673 3.157 1.75 4.187C6.373 12.517 4 14.646 4 18v2c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-2c0-3.354-2.373-5.483-5.75-5.813C16.327 10.157 17 8.657 17 7c0-2.762-2.238-5-5-5z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Small Pets',
    description: 'Little bundles of joy',
    count: '95+',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.55 7 13 7 13s7-7.45 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Others',
    description: 'Special companions',
    count: '65+',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.9c-3.91-.5-7-3.78-7-7.9 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.9zm6.79-1.79c.13-.58.21-1.17.21-1.79 0-4.12-3.09-7.4-7-7.9v1.9c0 .55.45 1 1 1h4.59l5-5H17V5h4c1.1 0 2 .9 2 2v4h-2V7.59l-5 5z" />
      </svg>
    ),
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
              href={`/explore?category=${category.title.toLowerCase()}`}
              className="group bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 group-hover:bg-teal-200 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{category.title}</h3>
              <p className="text-slate-600 mb-2">{category.description}</p>
              <span className="text-teal-700 font-medium">{category.count} pets</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
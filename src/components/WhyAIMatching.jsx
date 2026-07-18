const features = [
  {
    id: 1,
    title: 'Smart Matching',
    description: 'Our AI analyzes your lifestyle and preferences to suggest compatible pets',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m0 16v1m-6-8h2m2 0h2m-2 0v-2m2 0v2m7.614-5.614l-1.414 1.414M6 19.29l1.414-1.414M16.95 7.05a8.025 8.025 0 0111.314 0 8.025 8.025 0 01-11.314 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Personality Analysis',
    description: 'We consider behavioral traits to ensure perfect compatibility',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-4.19-2.83a1 1 0 00-1.553.83v5.66a1 1 0 001.553.83l4.19-2.83a1 1 0 000-1.66z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Instant Recommendations',
    description: 'Get personalized matches in seconds with our advanced algorithms',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Proven Success',
    description: '98% of our matches lead to successful adoptions',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.45 3.45 0 001.936 3.556C9.623 9.752 9.604 12.608 8 14c-1.605 1.398-2.597 3.21-2.597 5.303v2.023h20V12.82c0-1.1-.99-2.918-2.6-4.004a3.45 3.45 0 00-1.936-1.357" />
      </svg>
    ),
  },
];

export default function WhyAIMatching() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why AI Matching?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our intelligent system ensures better matches for happier families
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React from "react";

const features = [
  {
    id: 1,
    title: "Smart Matching",
    description: "Our AI analyzes your lifestyle and preferences to suggest compatible pets",
    icon: (
      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Personality Analysis",
    description: "We consider behavioral traits and energy levels to ensure perfect harmony",
    icon: (
      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m0 16v1m-6-8h2m2 0h2m-2 0v-2m2 0v2m7.614-5.614l-1.414 1.414M6 19.29l1.414-1.414M16.95 7.05a8.025 8.025 0 11-11.314 0" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Instant Recommendations",
    description: "Get personalized, ranked matches in seconds with custom AI explanations",
    icon: (
      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Proven Success",
    description: "98% of our AI recommendation matches lead to happy long-term adoptions",
    icon: (
      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function WhyAIMatching() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Why AI Matching?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Our intelligent system ensures better matches for happier families
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-3xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-50 rounded-2xl flex items-center justify-center shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";

const steps = [
  {
    id: 1,
    title: 'Browse Pets',
    description: 'Explore thousands of pets available for adoption near you',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4 4m4-4l-4-4M5 11V7a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Get AI Matches',
    description: 'Our AI analyzes your preferences to find your perfect match',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m0 16v1m-6-8h2m2 0h2m-2 0v-2m2 0v2m7.614-5.614l-1.414 1.414M6 19.29l1.414-1.414M16.95 7.05a8.025 8.025 0 1111.314 0 8.025 8.025 0 01-11.314 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Chat with Paws',
    description: 'Connect directly with pet owners and rescue organizations',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.41-4.03 8-9 8a9.863 9.863 0 01-4.255-.94L3 20l1.679-3.01a9.863 9.863 0 01-.94-4.256C7.97 7.03 12 3 17 3c4.97 0 9 3.59 9 7.99" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Meet Your Pet',
    description: 'Schedule a meet and greet to find your forever friend',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8 3-8-3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Finding your perfect pet companion has never been easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-700">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

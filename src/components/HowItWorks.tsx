import React from "react";

const steps = [
  {
    id: 1,
    title: "Browse Pets",
    description: "Explore hundreds of verified pets available for adoption near you",
    icon: "🔍",
  },
  {
    id: 2,
    title: "Get AI Matches",
    description: "Our neural matching engine analyzes your lifestyle to recommend compatible pets",
    icon: "✨",
  },
  {
    id: 3,
    title: "Chat with Paws",
    description: "Ask questions, get instant advice, and interact with our AI adoption assistant",
    icon: "💬",
  },
  {
    id: 4,
    title: "Meet & Adopt",
    description: "Submit your request online and schedule a meet-and-greet with shelter hosts",
    icon: "🤝",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Finding your perfect pet companion has never been easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-300 relative"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-teal-50 rounded-2xl flex items-center justify-center shadow-inner">
                <span className="text-4xl">{step.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

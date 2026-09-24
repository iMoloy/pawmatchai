import React from "react";

const features = [
 {
 id: 1,
 title: "Smart Matching",
 description: "Our AI analyzes your lifestyle and preferences to suggest compatible pets",
 icon: "🧠",
 },
 {
 id: 2,
 title: "Personality Analysis",
 description: "We consider behavioral traits and energy levels to ensure perfect harmony",
 icon: "🎭",
 },
 {
 id: 3,
 title: "Instant Recommendations",
 description: "Get personalized, ranked matches in seconds with custom AI explanations",
 icon: "⚡",
 },
 {
 id: 4,
 title: "Proven Success",
 description: "98% of our AI recommendation matches lead to happy long-term adoptions",
 icon: "🏆",
 },
];

export default function WhyAIMatching() {
 return (
 <section className="py-10 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-10">
 <h2 className="text-fluid-heading mb-6 text-slate-900 mb-4 tracking-tight">
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
 <span className="text-3xl">{feature.icon}</span>
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

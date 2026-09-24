import React from "react";

const stats = [
  {
    id: 1,
    value: '12,500+',
    label: 'Pets Adopted',
    icon: "❤️",
  },
  {
    id: 2,
    value: '3,200+',
    label: 'Active Listings',
    icon: "📋",
  },
  {
    id: 3,
    value: '24 hrs',
    label: 'Avg. Match Time',
    icon: "⏱️",
  },
  {
    id: 4,
    value: '98%',
    label: 'Success Rate',
    icon: "⭐",
  },
];

export default function AdoptionStats() {
  return (
    <section className="py-16 bg-teal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="flex justify-center mb-4">
                <span className="text-4xl mb-1">{stat.icon}</span>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-teal-100 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

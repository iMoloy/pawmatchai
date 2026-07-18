const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    image: "https://i.pravatar.cc/150?img=1",
    text: "PawMatch AI helped me find the perfect companion for my family. The AI matching was incredibly accurate!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    image: "https://i.pravatar.cc/150?img=2",
    text: "I was skeptical at first, but the AI recommendations led me to my best friend Luna. Highly recommend!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Austin, TX",
    image: "https://i.pravatar.cc/150?img=3",
    text: "The process was seamless and the community was so supportive. Thank you for bringing Max into our lives!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Happy Tails from Adopters
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hear from families who found their perfect matches
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-slate-300 mr-4 shrink-0">
                  <div className="w-full h-full rounded-full bg-teal-200 flex items-center justify-center text-teal-700 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <p className="text-slate-700 mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.81 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.81-2.034a1 1 0 00-1.175 0l-2.81 2.034c-.784.57-1.838-.197-1.539-1.118l1.069-3.292a1 1 0 00-.364-1.118L2.979 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

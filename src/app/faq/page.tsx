export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Help & FAQ</h1>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">How does the AI matching work?</h2>
          <p className="text-gray-700">Our AI analyzes your lifestyle, living situation, and preferences, then compares them against the traits and needs of available pets to find your perfect companion.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">What is the adoption fee?</h2>
          <p className="text-gray-700">Adoption fees vary by pet and cover vaccinations, spaying/neutering, and a microchip. The specific fee is listed on each pet's profile.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Can I return a pet if it's not a good fit?</h2>
          <p className="text-gray-700">Yes, we have a return policy. However, we encourage working with our behaviorists first to resolve any transition issues. Our AI matching helps minimize mismatched adoptions.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Do you adopt out-of-state?</h2>
          <p className="text-gray-700">Currently, we only facilitate adoptions within a 100-mile radius of our partner shelters to ensure we can provide proper post-adoption support.</p>
        </div>
      </div>
    </div>
  );
}

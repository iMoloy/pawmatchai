export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-blue max-w-none text-gray-700">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">1. Information We Collect</h2>
        <p className="mb-4">At PawMatch AI, we collect information you provide directly to us when you create an account, update your profile, or communicate with our AI assistant. This may include your name, email address, and preferences regarding pet adoption.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">2. How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to provide, maintain, and improve our services. Specifically, your preferences help our AI match you with the perfect pet. We do not sell your personal information to third parties.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">3. Data Security</h2>
        <p className="mb-4">We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or destruction.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">4. Contact Us</h2>
        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at privacy@pawmatch.ai.</p>
      </div>
    </div>
  );
}

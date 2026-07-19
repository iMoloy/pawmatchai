export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      <div className="prose prose-blue max-w-none text-gray-700">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">1. Acceptance of Terms</h2>
        <p className="mb-4">By accessing and using PawMatch AI, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">2. Use of AI Services</h2>
        <p className="mb-4">Our AI matching system provides recommendations based on your input. While we strive for accuracy, adoption decisions should be made carefully and in consultation with our partner shelters.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">3. User Responsibilities</h2>
        <p className="mb-4">You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to provide accurate information during the adoption process.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">4. Pet Availability</h2>
        <p className="mb-4">Pet listings are subject to change. A high AI match score does not guarantee adoption approval or pet availability.</p>
      </div>
    </div>
  );
}

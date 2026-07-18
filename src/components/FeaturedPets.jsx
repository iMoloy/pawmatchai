import PetCard from './PetCard';

const placeholderPets = [
  { id: 1, name: 'Buddy', breed: 'Golden Retriever', age: 3, location: 'New York, NY', badge: 'Available' },
  { id: 2, name: 'Luna', breed: 'Persian Cat', age: 2, location: 'Los Angeles, CA', badge: 'New' },
  { id: 3, name: 'Max', breed: 'Beagle', age: 4, location: 'Chicago, IL', badge: 'Available' },
  { id: 4, name: 'Bella', breed: 'Siamese Cat', age: 1, location: 'Miami, FL', badge: 'Urgent' },
  { id: 5, name: 'Charlie', breed: 'Poodle', age: 2, location: 'Seattle, WA', badge: 'Available' },
  { id: 6, name: 'Daisy', breed: 'Maine Coon', age: 3, location: 'Denver, CO', badge: 'New' },
  { id: 7, name: 'Rocky', breed: 'Bulldog', age: 5, location: 'Boston, MA', badge: 'Available' },
  { id: 8, name: 'Mittens', breed: 'Ragdoll', age: 2, location: 'Austin, TX', badge: 'Available' },
];

export default function FeaturedPets() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Featured Pets
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Meet some of our adorable pets waiting for their forever homes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {placeholderPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/explore"
            className="inline-block px-8 py-3 bg-teal-700 text-white font-medium rounded-full hover:bg-teal-800 transition-colors"
          >
            View All Pets
          </a>
        </div>
      </div>
    </section>
  );
}
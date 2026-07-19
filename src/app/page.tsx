import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import FeaturedPets from '../components/FeaturedPets';
import WhyAIMatching from '../components/WhyAIMatching';
import Categories from '../components/Categories';
import Testimonials from '../components/Testimonials';
import AdoptionStats from '../components/AdoptionStats';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <FeaturedPets />
        <WhyAIMatching />
        <Categories />
        <Testimonials />
        <AdoptionStats />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

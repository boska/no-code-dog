import Hero from "@/components/hero";
import HomeSections from "@/components/home-sections";
import PricingSection from "@/components/pricing-section";

export default async function Index() {
  return (
    <>
      <Hero />
      <HomeSections />
      <PricingSection />
    </>
  );
}

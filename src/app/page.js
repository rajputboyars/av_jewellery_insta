import AboutSection from "@/components/AboutSection";
import Banner from "@/components/Banner";
import CategorySection from "@/components/CategorySection";
import ContactSection from "@/components/ContactSection";
import HappyCustomers from "@/components/HappyCustomers";
export default function Home() {
  return (
    <div >

      <Banner />
      <CategorySection/>
      <AboutSection/>
      <HappyCustomers/>
      <ContactSection/>
    </div>
  );
}

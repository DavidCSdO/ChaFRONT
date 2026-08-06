import Loader from "@/components/sections/Loader";
import Navbar from "@/components/layout/Navbar";
import PageTracker from "@/components/PageTracker";
import Hero from "@/components/sections/Hero";
import OurStory from "@/components/sections/OurStory";
import TheBigDay from "@/components/sections/TheBigDay";
import Schedule from "@/components/sections/Schedule";
import DressCode from "@/components/sections/DressCode";
import Gallery from "@/components/sections/Gallery";
import Guestbook from "@/components/sections/Guestbook";
import GiftList from "@/components/sections/GiftList";
import RSVP from "@/components/sections/RSVP";
import PolaroidWall from "@/components/sections/PolaroidWall";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";

export default function Home() {
  return (
    <main className="relative bg-primary overflow-x-hidden w-full max-w-[100vw]">
      <PageTracker />
      <Loader />
      <Navbar />
      <Hero />
      <OurStory />
      <TheBigDay />
      <Schedule />
      <DressCode />
      <Gallery />
      <Guestbook />
      <GiftList />
      <RSVP />
      <PolaroidWall />
      <Footer />
      <BackToTop />
    </main>
  );
}

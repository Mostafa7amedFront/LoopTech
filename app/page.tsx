import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { StatsSection } from "@/components/stats-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <StatsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

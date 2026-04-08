import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FounderSection from '@/components/FounderSection'
import ExecutiveOverview from '@/components/ExecutiveOverview'
import PortfolioSection from '@/components/PortfolioSection'
import FrameworksSection from '@/components/FrameworksSection'
import StatusSection from '@/components/StatusSection'
import ValuationSection from '@/components/ValuationSection'
import EthicsSection from '@/components/EthicsSection'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ScrollProgressBar } from '@/components/animations/ScrollProgressBar'
import { FadeInUp } from '@/components/animations/FadeInUp'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <FadeInUp>
          <HeroSection />
        </FadeInUp>
        <FadeInUp>
          <FounderSection />
        </FadeInUp>
        <FadeInUp>
          <ExecutiveOverview />
        </FadeInUp>
        <FadeInUp>
          <PortfolioSection />
        </FadeInUp>
        <FadeInUp>
          <FrameworksSection />
        </FadeInUp>
        <FadeInUp>
          <StatusSection />
        </FadeInUp>
        <FadeInUp>
          <ValuationSection />
        </FadeInUp>
        <FadeInUp>
          <EthicsSection />
        </FadeInUp>
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  )
}

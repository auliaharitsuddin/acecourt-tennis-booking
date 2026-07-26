import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { CourtShowcase } from "@/components/home/court-showcase";
import { Features } from "@/components/home/features";
import { CtaSection } from "@/components/home/cta-section";

export default async function Home() {
  const courts = await prisma.court.findMany({ orderBy: { number: "asc" } });

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <CourtShowcase courts={courts} />
        <Features />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}

import Head from "next/head";
import HeroSection from "@/component/ui/hero-section";
import StatsSection from "@/component/ui/stats";

export default function Home() {
  return (
      <main>
        <Head>
          <title>Gestock - Application de gestion de factures</title>
          <meta
              name='description'
              content='Beautiful and responsive UI components and templates for React and Vue with Tailwind CSS.'
          />
        </Head>
        <HeroSection />
        <StatsSection />
      </main>
  );
}
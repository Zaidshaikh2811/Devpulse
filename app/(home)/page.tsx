

import { title, subtitle } from "@/components/primitives";
import FeatureArticles from "@/components/UI/FeatureArticles";

import FeaturedCategorie from "@/components/UI/FeaturedCategorie";
import Footer from "@/components/UI/Footer";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevPulse",
  description: "Your go-to blog for cutting-edge tutorials, frameworks, and guides on building high-performance web apps.",
}



export default function Home() {
  return (
    <>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-2xl text-center justify-center">
          <h1>
            <span className={title()}>Build Smarter&nbsp;</span>
            <span className={title({ color: "blue" })}>with Insights&nbsp;</span>
            <br />
            <span className={title()}>from Top Tech & SaaS Experts</span>
          </h1>
          <p className={subtitle({ class: "mt-6" })}>
            Your go-to blog for cutting-edge tutorials, frameworks, and guides on building high-performance web apps.
          </p>
        </div>
      </section>

      {/* Featured Categories */}
      <FeaturedCategorie />

      {/* Featured Articles */}
      <FeatureArticles />

      <Footer />
    </>
  );
}


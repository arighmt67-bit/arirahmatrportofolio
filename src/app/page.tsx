import { Suspense } from "react";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Courses from "@/components/Courses";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { LazyCommandPalette } from "@/components/Lazy";
import Nav from "@/components/Nav";
import PipelineLab from "@/components/PipelineLab";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Ticker from "@/components/Ticker";

export default function Home() {
  return (
    <>
      <a href="#konten" className="skip-link">
        Lompat ke konten utama
      </a>
      <Nav />
      <main id="konten">
        <Hero />
        <Ticker />
        <Suspense>
          <About />
        </Suspense>
        <Suspense>
          <Skills />
        </Suspense>
        <Suspense>
          <Projects />
        </Suspense>
        <Suspense>
          <PipelineLab />
        </Suspense>
        <Suspense>
          <Courses />
        </Suspense>
        <Suspense>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <LazyCommandPalette />
    </>
  );
}

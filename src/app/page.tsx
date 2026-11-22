import About from "@/components/About";
import CommandPalette from "@/components/CommandPalette";
import Contact from "@/components/Contact";
import Courses from "@/components/Courses";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
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
        <About />
        <Skills />
        <Projects />
        <PipelineLab />
        <Courses />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}

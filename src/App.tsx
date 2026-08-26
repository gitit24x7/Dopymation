import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Marquee } from "./components/sections/Marquee";
import { Eras } from "./components/sections/Eras";
import { Gallery } from "./components/sections/Gallery";
import { Manifesto } from "./components/sections/Manifesto";
import { Faq } from "./components/sections/Faq";
import { FinalCta } from "./components/sections/FinalCta";

function App() {
  return (
    <>
      <div className="grain-overlay" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Eras />
        <Gallery />
        <Manifesto />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

export default App;

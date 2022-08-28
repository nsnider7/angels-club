import Header from "./organisms/header";
import About from "./molecules/about";
import TraitsAndBenefits from "./molecules/traits-and-benefits";
import Roadmap from "./molecules/roadmap";
import TheArt from "./molecules/the-art";
import Founders from "./molecules/founders";
import FAQ from "./molecules/faq";
import Footer from "./organisms/footer";

import videoSrc from "./assets/smoke720.mp4";

import "./App.css";

function App() {
  return (
    <>
      <div className="page-wrapper">
        <Header />
        <main>
          <About />
          <TraitsAndBenefits />
          <Roadmap />
          <TheArt />
          <Founders />
          <FAQ />
        </main>
      </div>
      <Footer />
      <video className="hero-video" autoPlay loop muted>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </>
  );
}

export default App;

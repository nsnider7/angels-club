import Header from "./organisms/header";
import About from "./molecules/about";
import Mint from "./molecules/mint";
import TraitsAndBenefits from "./molecules/traits-and-benefits";
import Roadmap from "./molecules/roadmap";
import TheArt from "./molecules/the-art";
import Founders from "./molecules/founders";
import FAQ from "./molecules/faq";
import Footer from "./organisms/footer";

import "./App.css";

function App() {
  return (
    <>
      <div className="page-wrapper">
        <Header />
        <main>
          <About />
          <Mint/>
          <TraitsAndBenefits />
          <Roadmap />
          <TheArt />
          <Founders />
          <FAQ />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;

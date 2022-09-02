import { useEffect, useState } from "react";
import Carousel from "nuka-carousel";

import "./index.css";

import angel001 from "../../assets/art/1.jpg";
import angel002 from "../../assets/art/2.jpg";
import angel003 from "../../assets/art/5.jpg";
import angel004 from "../../assets/art/4.jpg";

export default function TheArt() {
  const [cellSpacing, setCellSpacing] = useState(0);
  const [numberOfSlides, setNumberOfSlides] = useState(3);

  useEffect(() => {
    if (window) {
      const mq = "(max-width: 47.9375em)";
      const mqTablet = "(min-width: 47.9375em)";
      const isMobile = window.matchMedia(mq).matches;

      setCellSpacing(140);

      if (isMobile) {
        setNumberOfSlides(1);
      } else {
        setNumberOfSlides(3);
      }

      window.matchMedia(mqTablet).addEventListener("change", (event) => {
        if (event.matches) {
          setCellSpacing(140);
        } else {
          setCellSpacing(0);
        }
      });

      window.matchMedia(mq).addEventListener("change", (event) => {
        if (event.matches) {
          setNumberOfSlides(1);
        } else {
          setNumberOfSlides(3);
        }
      });
    }
  }, []);

  return (
    <div id="the-art" className="the-art-container">
      <h2 className="the-art-title">The Art</h2>
      <Carousel
        animation="fade"
        cellAlign="center"
        cellSpacing={cellSpacing}
        defaultControlsConfig={{
          pagingDotsClassName: "the-art-carousel-paging",
        }}
        slidesToShow={numberOfSlides}
        wrapAround={true}
      >
        <img
          className="the-art-gallery-item"
          src={angel001}
          width="313"
          height="313"
          alt=""
          loading="lazy"
        />
        <img
          className="the-art-gallery-item"
          src={angel002}
          width="313"
          height="313"
          alt=""
          loading="lazy"
        />
        <img
          className="the-art-gallery-item"
          src={angel003}
          width="313"
          height="313"
          alt=""
          loading="lazy"
        />
        <img
          className="the-art-gallery-item"
          src={angel004}
          width="313"
          height="313"
          alt=""
          loading="lazy"
        />
      </Carousel>
    </div>
  );
}

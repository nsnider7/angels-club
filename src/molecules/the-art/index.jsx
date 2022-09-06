import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "./index.css";

import angel001 from "../../assets/art/1.jpg";
import angel002 from "../../assets/art/2.jpg";
import angel003 from "../../assets/art/5.jpg";
import angel004 from "../../assets/art/4.jpg";

export default function TheArt() {
  return (
    <div id="the-art" className="the-art-container">
      <h2 className="the-art-title">The Art</h2>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        centeredSlides={true}
        loop={true}
        modules={[Navigation]}
        navigation={true}
        spaceBetween={30}
        slidesPerView={3}
      >
        <SwiperSlide>
          <img
            className="the-art-gallery-item"
            src={angel001}
            width="313"
            height="313"
            alt=""
            loading="lazy"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="the-art-gallery-item"
            src={angel002}
            width="313"
            height="313"
            alt=""
            loading="lazy"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="the-art-gallery-item"
            src={angel003}
            width="313"
            height="313"
            alt=""
            loading="lazy"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="the-art-gallery-item"
            src={angel004}
            width="313"
            height="313"
            alt=""
            loading="lazy"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

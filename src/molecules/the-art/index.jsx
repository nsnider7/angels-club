import "./index.css";

import angel001 from "../../assets/art/1.jpg";
import angel002 from "../../assets/art/2.jpg";
import angel003 from "../../assets/art/5.jpg";
import angel004 from "../../assets/art/4.jpg";

export default function TheArt() {
  return (
    <div id="the-art" className="the-art-container">
      <h2 className="the-art-title">The Art</h2>
      <ul className="reset-list the-art-gallery">
        <li>
          <img
            className="the-art-gallery-item"
            src={angel001}
            width="313"
            height="313"
            alt=""
            loading="lazy"
          />
        </li>
        <li>
          <img
            className="the-art-gallery-item"
            src={angel002}
            width="313"
            height="313"
            alt=""
            loading="lazy"
          />
        </li>
        <li>
          <img
            className="the-art-gallery-item"
            src={angel003}
            width="313"
            height="313"
            alt=""
            loading="lazy"
          />
        </li>
        <li>
          <img
            className="the-art-gallery-item"
            src={angel004}
            width="313"
            height="313"
            alt=""
            loading="lazy"
          />
        </li>
      </ul>
    </div>
  );
}

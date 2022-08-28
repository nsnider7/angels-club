import "./index.css";

import angel001 from "../../assets/art/angel001.png";
import angel002 from "../../assets/art/angel002.png";

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
      </ul>
    </div>
  );
}

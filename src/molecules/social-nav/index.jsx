import "./index.css";

export default function SocialNav() {
  return (
    <nav aria-label="Social navigation" className="social-nav">
      <ul className="reset-list">
        <li>
          <a className="icon icon-twitter" href="https://twitter.com/AngelsClub777">
            <span className="visually-hidden">Follow Angels Club Twitter</span>
          </a>
        </li>
        <li>
          <a className="icon icon-discord" href="https://discord.gg/84DrHhpbkm">
            <span className="visually-hidden">Join Angels Club on Discord</span>
          </a>
        </li>
        <li>
          <a className="icon icon-opensea" href="https://opensea.io/">
            <span className="visually-hidden">Join Angels Club on OpenSea</span>
          </a>
        </li>
        <li>
          <a className="icon icon-instagram" href="https://www.instagram.com/angels.club666/">
            <span className="visually-hidden">
              Follow Angels Club on Instagram
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

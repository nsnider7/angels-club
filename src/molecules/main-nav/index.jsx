import "./index.css";

export default function MainNav() {
  return (
    <nav aria-label="Main navigation" className="main-nav">
      <ul className="reset-list">
        <li>
          <a href="#how">The How</a>
        </li>
        <li>
          <a href="#benefits">Benefits</a>
        </li>
        <li>
          <a href="#roadmap">Roadmap</a>
        </li>
        <li>
          <a href="#the-art">The Art</a>
        </li>
        <li>
          <a href="#founders">Founders</a>
        </li>
        <li>
          <a href="#faq">FAQ</a>
        </li>
      </ul>
    </nav>
  );
}

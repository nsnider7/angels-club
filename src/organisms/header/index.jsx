import Logo from "../../atoms/logo";
import MainNav from "../../molecules/main-nav";
import SocialNav from "../../molecules/social-nav";

import "./index.css";

export default function Header() {
  return (
    <header className="page-header">
      <Logo />
      <div className="navigation-container">
        <MainNav />
        <SocialNav />
      </div>
    </header>
  );
}

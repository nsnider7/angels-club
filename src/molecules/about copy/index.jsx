import Button from "../../atoms/buttons";

import "./index.css";

export default function About() {
  return (
    <div id="how" className="about-container">
      <h1>What is Angels Club</h1>
      <p>
        Angels Club is a collection of 2000 realistic NFTs categorized by level
        of rarity and generated with hundreds of elements.
      </p>
      <p>
        The angels are stored on the Ethereum BlockChain and hosted on
        interplanetary file system. Our main objective is to become a worldwide
        chain of clubs on the metaverse as well as provide profitable utilities
        to our holders.
      </p>
      <p>
        <Button
          extraClasses="button-cta button-icon icon icon-discord"
          href="https://discord.gg/84DrHhpbkm"
          label="join discord"
          type="link-external"
        />
      </p>
      <h2 className="featured-title">How did Angels Club come about</h2>
      <p>
        The angels are the guardians of the universe, starting off with the
        highest order of angels and moving onto the lowest order. We are the
        guardians of the metaverse willing to protect our members as well as non
        members. Our angels will spread their wings among all the NFT holders
        and more.
      </p>
    </div>
  );
}

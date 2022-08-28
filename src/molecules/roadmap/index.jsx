import "./index.css";

export default function Roadmap() {
  return (
    <div id="roadmap" className="roadmap-container">
      <h2 className="roadmap-title">Detailed Roadmap</h2>
      <ol className="reset-list roadmap-list">
        <li className="phase-1">
          <div className="phase-content-container">
            <h3 className="roadmap-phase-title">Phase 1</h3>
            <ul className="reset-list phase-feature-list">
              <li>Building a solid community</li>
              <li>Assigning roles/team members</li>
              <li>Sneak peaks</li>
              <li>Doxxed team</li>
            </ul>
          </div>
        </li>
        <li className="phase-2">
          <div className="phase-content-container">
            <h3 className="roadmap-phase-title">Phase 2</h3>
            <ul className="reset-list phase-feature-list">
              <li>First supply announcement</li>
              <li>Mint price and date announcement</li>
              <li>Biggest cash giveaway announcement</li>
              <li>Angels Club website launch</li>
              <li>1st mint</li>
            </ul>
          </div>
        </li>
        <li className="phase-3">
          <div className="phase-content-container">
            <h3 className="roadmap-phase-title">Phase 3</h3>
            <ul className="reset-list phase-feature-list">
              <li>Huge marketing campaign</li>
              <li>Collaboration with worldwide projects</li>
              <li>2nd mint</li>
              <li>Angels reveal</li>
            </ul>
          </div>
        </li>
        <li className="phase-4">
          <div className="phase-content-container">
            <h3 className="roadmap-phase-title">Phase 4</h3>
            <ul className="reset-list phase-feature-list">
              <li>Tradable utility token</li>
              <li>Stacking website and stacking process</li>
              <li>Stable ecosystem</li>
              <li>Exclusive Metaverse angels club</li>
              <li>
                5% of 2nd mint profits will be donated to charities around the
                world.
              </li>
            </ul>
          </div>
        </li>
        <li className="phase-5">
          <div className="phase-content-container">
            <h3 className="roadmap-phase-title">Phase 5</h3>
            <ul className="reset-list phase-feature-list">
              <li>Buy our first land in the Metaverse</li>
              <li>Build our Angels world</li>
              <li>Build our first club</li>
              <li>Merchandises website</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  );
}

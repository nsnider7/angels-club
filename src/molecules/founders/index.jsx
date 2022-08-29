import "./index.css";

import teamMember004 from "../../assets/art/1.jpg";
import teamMember001 from "../../assets/founders/team-member001.png";
import teamMember002 from "../../assets/founders/team-member002.png";
import teamMember003 from "../../assets/founders/team-member003.png";

export default function Founders() {
  const teamMembers = [
    {
      id: 1,
      name: "Karim",
      title: "Founder",
      imgAlt: "",
      imgSrc: teamMember004,
      bio: "",
    },
    {
      id: 2,
      name: "Hadi",
      title: "Founder",
      imgAlt: "",
      imgSrc: teamMember001,
      bio: "",    },
    {
      id: 3,
      name: "Jack",
      title: "Artist",
      imgAlt: "",
      imgSrc: teamMember002,
      bio: "",    },
    {
      id: 4,
      name: "Nick",
      title: "Developer",
      imgAlt: "",
      imgSrc: teamMember003,
      bio: "",    },
  ];
  return (
    <div id="founders" className="founder-container">
      <h3 className="founders-title">The Founders</h3>

      <ul className="reset-list founders-list">
        {teamMembers.map((member) => (
          <li key={member.id}>
            <div className="founder-profile-header">
              <div className="founder-profile-img-container">
                <img
                  alt={member.imgAlt}
                  className="founder-profile-img"
                  width="350"
                  height="350"
                  loading="lazy"
                  src={member.imgSrc}
                />
              </div>
              <h4>
                {member.name} <br />
                {member.title}
              </h4>
            </div>
            <p className="readable-line-length">{member.bio}</p>
          </li>
        ))}
      </ul>
    </div>

  );
}

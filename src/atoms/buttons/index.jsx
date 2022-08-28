import "./index.css";

export default function Button({ extraClasses, href, label, type }) {
  // this will catch both the link and external-link types
  if (type.toLowerCase().includes("link")) {
    const externalProps = {
      target: "_blank",
      rel: "noopener noreferrer",
    };

    let linkProps = {
      className: `button ${extraClasses || ""}`,
      href,
    };

    linkProps =
      type === "link-external" ? { ...linkProps, ...externalProps } : linkProps;

    return <a {...linkProps}>{label}</a>;
  }

  return (
    <button type={type} className={`button ${extraClasses || ""}`}>
      {label}
    </button>
  );
}

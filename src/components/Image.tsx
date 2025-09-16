import React from "react";

type Props = {
  src?: string;
  alt?: string;
  description?: string;
}

export default function Image(props: Props) {
  const [isHovered, setIsHovered] = React.useState(false);
  return <div>
    <img src={props.src} style={{
      scale: isHovered ? 3 : 1,
      transition: "scale 0.3s",
      position: "relative",
      zIndex: isHovered ? 10 : 1,
    }}
      alt={props.alt}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
    <p style={{
      fontStyle: "italic",
      fontWeight: "500"
    }}>{props.description}</p>
  </div>
}

import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Quote = () => {
  return (
    <q>
      We are passionate about revolutionizing the way we learn. Our innovative
      platform
      <HighlightText text={"combines technology"} />,
      <span className="bg-color4 bg-clip-text text-transparent"> expertise</span>, and community to create
      an <span className="bg-color5 bg-clip-text text-transparent">unparalleled educational experience</span>.
    </q>
  );
};

export default Quote;
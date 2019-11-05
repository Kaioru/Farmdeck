import React from "react";
import logo from "../../assets/farmicon.jpg";

export default function SectionHeading() {
  return (
    <header className="react-rainbow-admin_header rainbow-position_fixed rainbow-flex rainbow-align_center rainbow-p-horizontal_large rainbow-background-color_white">
      <img
        src={logo}
        alt="rainbow logo"
        className="rainbow-m-left_medium react-rainbow-admin_header-logo"
      />
    </header>
  );
}

import React from "react";
import logo from "../../assets/farmicon.jpg";
import { Button } from "react-rainbow-components";
export default function SectionHeading() {
  return (
    <header className="react-rainbow-admin_header rainbow-position_fixed rainbow-flex rainbow-align_center rainbow-p-horizontal_large rainbow-background-color_white">
      <img
        src={logo}
        alt="rainbow logo"
        className="rainbow-m-left_medium react-rainbow-admin_header-logo"
      />
      <section className="rainbow-flex rainbow-align_center react-rainbow-admin_header-actions">
        <Button
          label="Sign In"
          onClick={() => alert("clicked!")}
          variant="brand"
          className="rainbow-m-around_medium"
        />
      </section>
    </header>
  );
}

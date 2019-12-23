import React from "react";
import logo from "../../assets/farmicon.jpg";
import { Button } from "react-rainbow-components";
import { navigateTo } from "../../history";

export default function SectionHeading(props) {
  const ButtonAuth = () => {
    if (props.auth) {
      return (
        <Button
          label="Sign Out"
          onClick={() => navigateTo("/signin")}
          variant="brand"
          className="rainbow-m-around_medium"
        />
      );
    } else {
      return (
        <Button
          label="Sign In"
          onClick={() => navigateTo("/signin")}
          variant="brand"
          className="rainbow-m-around_medium"
        />
      );
    }
  };
  return (
    <header className="react-rainbow-admin_header rainbow-position_fixed rainbow-flex rainbow-align_center rainbow-p-horizontal_large rainbow-background-color_white">
      <img
        src={logo}
        alt="rainbow logo"
        className="rainbow-m-left_medium react-rainbow-admin_header-logo"
      />
      <section className="rainbow-flex rainbow-align_center react-rainbow-admin_header-actions">
        <ButtonAuth />
      </section>
    </header>
  );
}

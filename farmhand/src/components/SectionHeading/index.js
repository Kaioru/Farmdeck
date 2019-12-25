import React from "react";
import ButtonAuth from "./buttonAuth";
import logo from "../../assets/farmicon.jpg";
import "./styles.css";
export default function SectionHeading(props) {
  return (
    <header className="react-rainbow-admin_header rainbow-position_fixed rainbow-flex rainbow-align_center rainbow-p-horizontal_large rainbow-background-color_white">
      <img
        src={logo}
        alt="rainbow logo"
        className="rainbow-m-left_medium react-rainbow-admin_header-logo"
      />
      <section className="rainbow-flex rainbow-align_center react-rainbow-admin_header-actions">
        <ButtonAuth auth={props.auth} token={props.token} />
      </section>
    </header>
  );
}

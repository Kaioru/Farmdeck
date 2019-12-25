import React from "react";
import ButtonAuth from "./buttonAuth";
import logo from "../../assets/farmicon.jpg";
import "./styles.css";
import { navigateTo } from "../../history";
export default function SectionHeading(props) {
  return (
    <header className="react-rainbow-admin_header rainbow-position_fixed rainbow-flex rainbow-align_center rainbow-p-horizontal_large rainbow-background-color_white">
      <a href="/home">
        <img
          src={logo}
          alt="Farmdeck"
          className="rainbow-m-left_medium react-rainbow-admin_header-logo"
        />
      </a>
      <section className="rainbow-flex rainbow-align_center react-rainbow-admin_header-actions">
        <ButtonAuth
          auth={props.auth}
          token={props.token}
          logout={props.logout}
        />
      </section>
    </header>
  );
}

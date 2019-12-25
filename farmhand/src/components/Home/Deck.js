import React from "react";
import { Card } from "react-rainbow-components";
import "./styles.css";

export default function Deck({ title }) {
  return (
    <Card className="deckCard">
      <div className="rainbow-align-content_center">
        <h1>{title}</h1>
      </div>
    </Card>
  );
}

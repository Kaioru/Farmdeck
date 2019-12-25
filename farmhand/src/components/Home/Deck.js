import React from "react";
import { Card, Button } from "react-rainbow-components";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
export default function Deck(props) {
  const { title, id, deletedeck, onClick } = props;
  return (
    <Card
      className="deckCard"
      actions={
        <Button
          className="deleteBtn"
          variant="destructive"
          onClick={() => deletedeck(id)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      }
      footer={
        <Button
          className="linkBtn"
          variant="neutral"
          onClick={() => onClick(id)}
        >
          Select
        </Button>
      }
    >
      <div className="rainbow-align-content_center">
        <h1>{title}</h1>
      </div>
    </Card>
  );
}

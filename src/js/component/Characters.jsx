import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card from "./Card.jsx";

const Characters = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCharacters();
  }, []);

  return (
    <div className=" scroll-container">
      {store.ppl.map((char, index) => (
        <Card
          key={index}
          id={char.url.split("/").pop()}
          name={char.name}
          desc={
            <div>
              <p>Gender: {char.gender}</p>
              <p>Hair Color: {char.hair_color}</p>
              <p>Eye Color: {char.eye_color}</p>
            </div>
          }
          type="characters"
        />
      ))}
    </div>
  );
};

export default Characters;

import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card from "./Card.jsx";

const Planets = () => {

  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPlanets();
  }, []);

  return (
    <div className=" scroll-container">
      {store.plan.map((plan, index) => (
        <Card
          key={index}
          id={plan.url.split("/").pop()}
          name={plan.name}
          desc={
            <div>
              <p>Population: {plan.population}</p>
              <p>Terrain: {plan.terrain}</p>
            </div>
          }
          type="planets"
        />
      ))}

    </div>
  )
}

export default Planets

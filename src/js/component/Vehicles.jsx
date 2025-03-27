import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card from "./Card.jsx";

const Vehicles = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getVehicles();
  }, []);

  return (
    <div className="scroll-container">
      {store.veh.map((veh, index) => (
        <Card
          key={index}
          id={veh.url.split("/").pop()}
          name={veh.name}
          desc={
            <div>
              <p>Model: {veh.model}</p>
              <p>Cost in credits: {veh.cost_in_credits}</p>
            </div>
          }
          type="vehicles"  
        />
      ))}
    </div>
  );
};

export default Vehicles;

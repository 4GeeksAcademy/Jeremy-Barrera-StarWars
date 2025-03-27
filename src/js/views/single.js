import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
    const { store, actions } = useContext(Context);
    const { type, theid } = useParams(); 
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (type === "planets") {
                    const planet = store.plan.find((p) => p.url.split("/").pop() === theid);
                    if (planet) {
                        setData(planet);
                    } else {
                        await actions.getPlanets();
                        const updatedPlanet = store.plan.find((p) => p.url.split("/").pop() === theid);
                        setData(updatedPlanet);
                    }
                } else if (type === "vehicles") {
                    const vehicle = store.veh.find((v) => v.url.split("/").pop() === theid);
                    if (vehicle) {
                        setData(vehicle);
                    } else {
                        await actions.getVehicles();
                        const updatedVehicle = store.veh.find((v) => v.url.split("/").pop() === theid);
                        setData(updatedVehicle);
                    }
                } else if (type === "characters") {
                    const character = store.ppl.find((p) => p.url.split("/").pop() === theid);
                    if (character) {
                        setData(character);
                    } else {
                        await actions.getCharacters();
                        const updatedCharacter = store.ppl.find((p) => p.url.split("/").pop() === theid);
                        setData(updatedCharacter);
                    }
                }
            } catch (error) {
                console.error("Error fetching details:", error);
            }
        };

        fetchData();
    }, [theid, store, actions, type]);

    if (!data) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h1 className="display-4">{data.name}</h1>
            <hr />
            {type === "planets" && (
                <>
                    <p><strong>Population:</strong> {data.population}</p>
                    <p><strong>Terrain:</strong> {data.terrain}</p>
                    <p><strong>Climate:</strong> {data.climate}</p>
                    <p><strong>Gravity:</strong> {data.gravity}</p>
                </>
            )}
            {type === "vehicles" && (
                <>
                    <p><strong>Model:</strong> {data.model}</p>
                    <p><strong>Manufacturer:</strong> {data.manufacturer}</p>
                    <p><strong>Cost in Credits:</strong> {data.cost_in_credits}</p>
                    <p><strong>Passengers:</strong> {data.passengers}</p>
                </>
            )}
            {type === "characters" && (
                <>
                    <p><strong>Gender:</strong> {data.gender}</p>
                    <p><strong>Hair Color:</strong> {data.hair_color}</p>
                    <p><strong>Eye Color:</strong> {data.eye_color}</p>
                    <p><strong>Birth Year:</strong> {data.birth_year}</p>
                    <p><strong>Height:</strong> {data.height} cm</p>
                    <p><strong>Mass:</strong> {data.mass} kg</p>
                </>
            )}
            <Link to="/">
                <button className="btn btn-primary">Back Home</button>
            </Link>
        </div>
    );
};

import React from "react";
import Characters from "../component/Characters.jsx";
import Vehicles from "../component/Vehicles.jsx";
import Planets from "../component/Planets.jsx";

export const Home = () => (
	<div className="p-3">
		<h1>Characters</h1>
		<Characters />
		<h1>Planets</h1>
		<Planets />
		<h1>Vehicles</h1>
		<Vehicles />
	</div>
);


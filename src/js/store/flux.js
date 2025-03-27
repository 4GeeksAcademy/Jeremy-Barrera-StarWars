const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			plan: [],
			veh: [],
			ppl: [],
			fav: JSON.parse(localStorage.getItem("favorites")) || [],
		},
		actions: {
			getCharacters: async () => {
				const store = getStore();
				if (store.ppl.length > 0) return;

				try {
					const response = await fetch("https://www.swapi.tech/api/people");
					if (!response.ok) throw new Error("Something went wrong");
					const data = await response.json();

					const charactersWithDetails = await Promise.all(
						data.results.map(async (char) => {
							const characterResponse = await fetch(char.url);
							if (!characterResponse.ok) throw new Error("Failed to fetch character details");
							const characterData = await characterResponse.json();

							return {
								name: characterData.result.properties.name,
								gender: characterData.result.properties.gender,
								hair_color: characterData.result.properties.hair_color,
								eye_color: characterData.result.properties.eye_color,
								url: char.url,
							};
						})
					);

					setStore({ ppl: charactersWithDetails });
				} catch (error) {
					console.log(error);
				}
			},
			getPlanets: async () => {
				const store = getStore();
				if (store.plan.length > 0) return;

				try {
					const response = await fetch("https://www.swapi.tech/api/planets");
					if (!response.ok) throw new Error("Something went wrong fetching planets");

					const data = await response.json();
					const planetsWithDetails = await Promise.all(
						data.results.map(async (plan) => {
							const planetsResponse = await fetch(plan.url);
							if (!planetsResponse.ok) throw new Error("Failed to fetch planet details");

							const planetsData = await planetsResponse.json();
							return {
								name: planetsData.result.properties.name,
								population: planetsData.result.properties.population,
								terrain: planetsData.result.properties.terrain,
								climate: planetsData.result.properties.climate,
								gravity: planetsData.result.properties.gravity,
								url: plan.url,
							};
						})
					);

					setStore({ plan: planetsWithDetails });
				} catch (error) {
					console.log(error);
				}
			},

			getVehicles: async () => {
				const store = getStore();
				if (store.veh.length > 0) return;
			
				try {
					const response = await fetch("https://www.swapi.tech/api/vehicles");
					if (!response.ok) throw new Error("Something went wrong fetching vehicles");
			
					const data = await response.json();
					const vehiclesWithDetails = await Promise.all(
						data.results.map(async (veh) => {
							const vehiclesResponse = await fetch(veh.url); 
							if (!vehiclesResponse.ok) throw new Error("Failed to fetch vehicle details");
			
							const vehiclesData = await vehiclesResponse.json();
							return {
								name: vehiclesData.result.properties.name,
								model: vehiclesData.result.properties.model,
								passengers: vehiclesData.result.properties.passengers,
								cost_in_credits: vehiclesData.result.properties.cost_in_credits,
								manufacturer: vehiclesData.result.properties.manufacturer,
								url: veh.url,
							};
						})
					);
			
					setStore({ veh: vehiclesWithDetails });
				} catch (error) {
					console.log(error);
				}
			},
			

			addFavorite: (item) => {
				const store = getStore();
				if (!store.fav.includes(item)) {
					const updatedFavorites = [...store.fav, item];
					setStore({ fav: updatedFavorites });
					localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
				}
			},
			removeFavorite: (name) => {
				const store = getStore();
				const updatedFavorites = store.fav.filter((item) => item !== name);
				setStore({ fav: updatedFavorites });
				localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
			},
		}
	};
};

export default getState;

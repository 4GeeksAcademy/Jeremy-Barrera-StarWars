import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light px-3 py-1">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">
					<img className="img" src="https://www.freepnglogos.com/uploads/star-wars-logo-31.png" alt="Star Wars Logo" />
				</span>
			</Link>
			<div className="ml-auto">
				<div className="dropdown">
					<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
						Favorites <span className="badge bg-secondary">{store.fav.length}</span>
					</button>
					<ul className="dropdown-menu">
						{store.fav.length > 0 ? (
							store.fav.map((item, index) => (
								<li key={index} className="d-flex justify-content-between align-items-center px-2">
									<span>{item}</span>
									<button 
										className="btn btn-sm ms-2"
										onClick={() => actions.removeFavorite(item)}  
									>
										🗑
									</button>
								</li>
							))
						) : (
							<li className="dropdown-item text-muted">empty</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

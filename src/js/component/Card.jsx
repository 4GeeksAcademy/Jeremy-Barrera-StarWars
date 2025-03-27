import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Card = ({ name, desc, id, type }) => {
  const { store, actions } = useContext(Context);
  const isFavorite = store.fav.includes(name);

  return (
    <div>
      <div className="card" style={{ width: "19rem" }}>
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOmU61OY62YXukcIQ7iyxEfu4A7T-WE0LXGeB5OjebxU88Ch7f1XXrXgC8pDoICUqld4o&usqp=CAU"
          }
          className="card-img-top"
          alt={name}
        />
        <div className="card-body">
          <h5 className="card-title">{name || "Card Title"}</h5>
          <div className="card-text">{desc || "Some quick example text to describe the card."}</div>
          <div className="d-flex justify-content-between">
            <Link to={`/single/${type}/${id}`} className="btn btn-primary">
              Learn More
            </Link>
            <button
              className="btn"
              onClick={() => {
                isFavorite ? actions.removeFavorite(name) : actions.addFavorite(name);
              }}
            >
              <i className={`fa-heart fa-lg ${isFavorite ? "fa-solid text-danger" : "fa-regular text-secondary"}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

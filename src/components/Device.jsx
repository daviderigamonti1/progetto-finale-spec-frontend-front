import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

import { FaStar, FaRegStar } from "react-icons/fa";

export default React.memo(function Device({ device, isSelected, onToggle, onToggleFavorite }) {
    const { toggleFavorites, isFavorite } = useContext(GlobalContext);

    return (
        <>
            <div>
                <Link to={`/devices/${device.id}`}>
                    <h3>
                        {device.title}
                    </h3>
                </Link>
                <span>{device.category}</span>
            </div>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(device.id)}
            />
            <button onClick={() => toggleFavorites(device)}>
                {isFavorite(device) ? <FaStar /> : <FaRegStar />}
            </button>
        </>
    )
});
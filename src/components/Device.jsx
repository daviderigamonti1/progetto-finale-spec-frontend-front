import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

import { FaStar, FaRegStar } from "react-icons/fa";

export default React.memo(function Device({ device, isSelected, onToggle }) {
    const { toggleFavorites, isFavorite } = useContext(GlobalContext);

    return (
        <>
            <div className="device-header">
                <Link to={`/devices/${device.id}`} className="device-title">
                    <h3>{device.title}</h3>
                </Link>
                <span className="device-category">{device.category}</span>
            </div>
            <div className="device-controls">

                {/* Checkbox per comparazione */}
                <label className="checkbox-label">
                    Confronta
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggle(device.id)}
                        className="device-checkbox"
                    />
                </label>

                {/* Bottone preferiti */}
                <button onClick={() => toggleFavorites(device)} className="favorite-button">
                    {isFavorite(device) ? <FaStar /> : <FaRegStar />}
                </button>
            </div>
        </>
    )
});
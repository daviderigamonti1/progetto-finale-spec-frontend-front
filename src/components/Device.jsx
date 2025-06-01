import React from "react";
import { Link } from "react-router-dom"

export default React.memo(function Device({ device, isSelected, onToggle }) {
    return (
        <>
            <div>
                <Link to={`/devices/${device.id}`}><h3>{device.title}</h3></Link>
                <span>{device.category}</span>
            </div>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(device.id)}
            />
        </>
    )
});
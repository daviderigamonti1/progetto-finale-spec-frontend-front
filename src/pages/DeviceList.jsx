import { useState, useContext, useMemo, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext";

function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    }
}

export default function DeviceList() {
    const { devices } = useContext(GlobalContext);

    const [searchTitle, setSearchTitle] = useState("");

    const filteredDevice = useMemo(() => {
        return [...devices].filter(device =>
            device.title.toLowerCase().includes(searchTitle.toLowerCase()));
    }, [devices, searchTitle]);

    const debouncedSetSearchTitle = useCallback(
        debounce(setSearchTitle, 500)
        , []);

    return (
        <>
            {/* SearchBar */}
            <input
                type="text"
                placeholder="Cerca un dispositivo..."
                onChange={e => debouncedSetSearchTitle(e.target.value)}
            />

            {/* Lista Dispositivi */}
            <ul>
                {filteredDevice.map((device) => (
                    <li key={device.id} className="card">
                        <h3>{device.title}</h3>
                        <span>{device.category}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}
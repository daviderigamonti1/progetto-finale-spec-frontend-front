import { useState, useContext, useMemo, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

import Device from "../components/Device";

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
    const { devices, toggleFavorites } = useContext(GlobalContext);

    const [searchTitle, setSearchTitle] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedDevicesIds, setSelectedDevicesIds] = useState([]);

    const filteredAndSorteredDevice = useMemo(() => {
        const filtered = [...devices].filter(device => {
            const matchesTitle = !searchTitle || device.title.toLowerCase().includes(searchTitle.toLowerCase());
            const matchesCategory = !categoryFilter || device.category === categoryFilter;
            return matchesTitle && matchesCategory;
        });
        return filtered.sort((a, b) => sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title))
    }, [devices, searchTitle, categoryFilter, sortOrder]);

    const debouncedSetSearchTitle = useCallback(
        debounce(setSearchTitle, 500)
        , []);

    const uniqueCategories = useMemo(() => {
        return devices.reduce((acc, device) => {
            if (device.category && !acc.includes(device.category)) {
                acc.push(device.category);
            }
            return acc;
        }, []);
    }, [devices]);

    function toggleOrder() {
        setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    }

    function toggleSelection(deviceId) {
        setSelectedDevicesIds(prev => {
            if (selectedDevicesIds.includes(deviceId)) {
                return prev.filter(id => id !== deviceId);
            } else if (prev.length < 2) {
                return [...prev, deviceId];
            } else {
                return prev;
            }
        });
    }

    return (
        <>
            <div className="device-list-container">
                {/* SearchBar */}
                <input
                    type="text"
                    placeholder="Cerca un dispositivo..."
                    onChange={e => debouncedSetSearchTitle(e.target.value)}
                />

                {/* Filtro Categoria */}
                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                    <option value="">Scegli una categoria</option>
                    {uniqueCategories.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                {/* Ordina dispositivi (A-Z / Z-A) */}
                <button onClick={toggleOrder}>
                    {sortOrder === "asc" ? "A-Z" : "Z-A"}
                </button>

                {/* Lista Dispositivi */}
                {selectedDevicesIds.length === 2 && (
                    <Link to={`/devices/compare/${selectedDevicesIds[0]}/${selectedDevicesIds[1]}`}>Confronta</Link>
                )}
                <ul>
                    {filteredAndSorteredDevice.map((device) => (
                        <li key={device.id} className="card">
                            <Device
                                device={device}
                                isSelected={selectedDevicesIds.includes(device.id)}
                                onToggle={toggleSelection}
                            />
                        </li >
                    ))}
                </ul>
            </div >


        </>
    )
}
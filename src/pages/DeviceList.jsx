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
    const { devices, uniqueCategories } = useContext(GlobalContext);

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

    function toggleOrder() {
        setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    }

    const toggleSelection = useCallback((deviceId) => {
        setSelectedDevicesIds(prev => {
            if (prev.includes(deviceId)) {
                return prev.filter(id => id !== deviceId);
            } else {
                return [...prev, deviceId];
            }
        });
    }, []);

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
                <button onClick={toggleOrder} className="sort-button">
                    {sortOrder === "asc" ? "A-Z" : "Z-A"}
                </button>

                {/* Bottone confronta */}
                {selectedDevicesIds.length >= 2 && (
                    <Link to={`/devices/compare/${selectedDevicesIds.join(",")}`} className="compare-button">
                        Confronta
                    </Link>
                )}

                {/* Lista Dispositivi */}
                {filteredAndSorteredDevice.length > 0 ? (
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
                ) : (
                    <p>Nessun dispositivo trovato.</p>
                )}
            </div >
        </>
    )
}
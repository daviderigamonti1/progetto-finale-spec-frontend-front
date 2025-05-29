import { useState, useContext, useMemo, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

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
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

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

    const uniqueCategories = devices.reduce((acc, device) => {
        if (device.category && !acc.includes(device.category)) {
            acc.push(device.category);
        }
        return acc;
    }, []);

    function toggleOrder() {
        setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    }

    return (
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
            <ul>
                {filteredAndSorteredDevice.map((device) => (
                    <li key={device.id} className="card">
                        <div>
                            <Link to={`/device/${device.id}`}><h3>{device.title}</h3></Link>
                            <span>{device.category}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}
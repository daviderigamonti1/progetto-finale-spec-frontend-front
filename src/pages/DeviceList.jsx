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
    const [categoryFilter, setCategoryFilter] = useState("");

    const filteredDevice = useMemo(() => {
        return [...devices].filter(device => {
            const matchesTitle = !searchTitle || device.title.toLowerCase().includes(searchTitle.toLowerCase());
            const matchesCategory = !categoryFilter || device.category === categoryFilter;
            return matchesTitle && matchesCategory;
        });
    }, [devices, searchTitle, categoryFilter]);

    const debouncedSetSearchTitle = useCallback(
        debounce(setSearchTitle, 500)
        , []);

    const uniqueCategories = devices.reduce((acc, device) => {
        if (device.category && !acc.includes(device.category)) {
            acc.push(device.category);
        }
        return acc;
    }, []);

    return (
        <>
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
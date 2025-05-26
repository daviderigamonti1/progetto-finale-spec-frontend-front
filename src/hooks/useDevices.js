import { useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export default function useDevices() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetch(`${VITE_API_URL}/devices`)
            .then(res => res.json())
            .then(data => setDevices(data))
            .catch(err => console.error(err))
    }, []);

    return devices;
}
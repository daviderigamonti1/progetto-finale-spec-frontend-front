import { useState, useRef, useContext, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

export default function AddDevice() {
    const { uniqueCategories, addDevice } = useContext(GlobalContext);

    const [deviceTitle, setDeviceTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [categoryError, setCategoryError] = useState("");

    const categoryRef = useRef();
    const brandRef = useRef();
    const modelRef = useRef();
    const releaseRef = useRef();
    const priceRef = useRef();

    const deviceTitleError = useMemo(() => {
        if (!deviceTitle.trim())
            return "Inserire il nome del dispositivo."
        if ([...deviceTitle].some(char => symbols.includes(char)))
            return "Non può contenere simboli."
        return "";
    }, [deviceTitle]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (deviceTitleError) {
            setTitleError(deviceTitleError);
            return;
        }

        if (!categoryRef.current.value) {
            setCategoryError("Inserire la categoria del dispositivo");
            return;
        }

        const newDevice = {
            title: deviceTitle.trim(),
            category: categoryRef.current.value
        }

        if (brandRef.current.value) newDevice.brand = brandRef.current.value;
        if (modelRef.current.value) newDevice.model = modelRef.current.value;
        if (releaseRef.current.value) newDevice.releaseYear = parseInt(releaseRef.current.value);
        if (priceRef.current.value) newDevice.price = parseInt(priceRef.current.value);

        try {
            await addDevice(newDevice);
            alert("Dispositivo creato con successo.");
            setDeviceTitle("");
            categoryRef.current.value = "";
            brandRef.current.value = "";
            modelRef.current.value = "";
            releaseRef.current.value = "";
            priceRef.current.value = "";
            setTitleError("");
            setCategoryError("");
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="add-device-container">
            <h2>Aggiungi un dispositivo</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input
                        type="text"
                        value={deviceTitle}
                        onChange={e => setDeviceTitle(e.target.value)}
                    />
                </label>
                {titleError && (
                    <p>{titleError}</p>
                )}
                <label>
                    Categoria:
                    <select ref={categoryRef}>
                        <option value="">Scegli una categoria</option>
                        {uniqueCategories.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </label>
                {categoryError && (
                    <p>{categoryError}</p>
                )}
                <label>
                    Marca:
                    <input type="text" ref={brandRef} />
                </label>
                <label>
                    Modello:
                    <input type="text" ref={modelRef} />
                </label>
                <label>
                    Anno di rilascio:
                    <input type="number" ref={releaseRef} />
                </label>
                <label>
                    Prezzo:
                    <input type="number" ref={priceRef} />
                </label>
                <button type="submit">Aggiungi dispositivo</button>
            </form>
        </div>
    )
}
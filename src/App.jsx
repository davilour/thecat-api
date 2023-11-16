import Select from "./Select";
import Card from "./Cards";
import { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
    const [selectedBreed, setSelectedBreed] = useState("");

    const handleSelectBreed = (breed) => {
        setSelectedBreed(breed);
        updateCat(selectedBreed);
    };

    const updateCat = (breed) => {
        axios
            .get(`https://api.thecatapi.com/v1/breeds/${breed.id}`)
            .then((response) => {
                setSelectedBreed(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar a imagem do gato:", error);
            });
    };

    return (
        <>
            <div className="app">
                <h2>Selecione a raça de um gatinho!</h2>
                <Select onSelectBreed={handleSelectBreed} />
                {selectedBreed && <Card selectedBreed={selectedBreed} />}
            </div>
        </>
    );
}

export default App;

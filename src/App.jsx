import Select from "./Select";
import Card from "./Cards";
import Body from "./Body";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [cat, setCat] = useState([]);
    const [selectedBreedId, setSelectedBreedId] = useState("");

    const handleSelectBreed = (breedId) => {
        setSelectedBreedId(breedId); // Atualiza o estado com o ID da raça selecionada
    };

    useEffect(() => {
        // Verifique se um ID de raça foi selecionado antes de buscar a imagem
        if (selectedBreedId) {
            updateCat(selectedBreedId);
        }
    }, [selectedBreedId]);

    const updateCat = (breedId) => {
        axios
            .get(
                `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
            )
            .then((response) => {
                console.log(response.data);
                setCat(response.data);
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

                {cat.length > 0 && (
                    <Card cat={cat[Math.floor(Math.random() * cat.length)]} />
                )}
                <Body />
            </div>
        </>
    );
}

export default App;

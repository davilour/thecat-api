import Select from "./Select";
import Card from "./Cards";
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function App() {
    const [selectedBreed, setSelectedBreed] = useState("");
    const [initialBreeds, setInitialBreeds] = useState([]);

    const handleSelectBreed = (breed) => {
        setSelectedBreed(breed);
        updateCat();
    };

    // const handleCardImageClick = () => {
    //     updateCat();
    // };

    const updateCat = (breed) => {
        if (breed && breed.id) {
            axios
                .get(`https://api.thecatapi.com/v1/breeds/${breed.id}`)
                .then((response) => {
                    setSelectedBreed(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao buscar a imagem do gato:", error);
                });
        }
    };

    useEffect(() => {
        if (initialBreeds) {
            axios
                .get("https://api.thecatapi.com/v1/breeds")
                .then((response) => {
                    // Pega 10 raças aleatórias
                    const randomBreeds = getRandomBreeds(response.data, 10);
                    setInitialBreeds(randomBreeds);
                })
                .catch((error) => {
                    console.error("Erro ao buscar raças iniciais:", error);
                });
        }
    }, []);

    const getRandomBreeds = (breeds, count) => {
        const shuffledBreeds = breeds.sort(() => Math.random() - Math.random());
        return shuffledBreeds.slice(0, count);
    };
    return (
        <>
            <div className="app">
                <h2>Selecione a raça de um gatinho!</h2>
                <Select onSelectBreed={handleSelectBreed} />
                <div className="card-container">
                    {selectedBreed ? (
                        <Card
                            key={selectedBreed.id}
                            selectedBreed={selectedBreed}
                        />
                    ) : (
                        initialBreeds.map((breed) => (
                            <Card key={breed.id} selectedBreed={breed} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default App;

/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios"; // Importe a biblioteca Axios

const Select = () => {
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        updateBreeds();
    }, []);

    const updateBreeds = () => {
        axios
            .get(`https://api.thecatapi.com/v1/breeds`) // Use a instância da biblioteca Axios para fazer a solicitação
            .then((response) => {
                setBreeds(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar as raças de gatos:", error);
            });
    };

    return (
        <div>
            <select>
                {breeds.map((breed) => (
                    <option value={breed.id} key={breed.id}>
                        {breed.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;

import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const Select = ({ onSelectBreed }) => {
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        updateBreeds();
    }, []);

    const updateBreeds = () => {
        axios
            .get(`https://api.thecatapi.com/v1/breeds`)
            .then((response) => {
                console.log(response.data);
                setBreeds(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar as raças de gatos:", error);
            });
    };

    const handleSelectChange = (e) => {
        const breedId = e.target.value; // ID da raça selecionada
        onSelectBreed(breedId);
    };

    return (
        <div>
            <select onChange={handleSelectChange}>
                <option value="">Selecione uma raça</option>
                {breeds.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                        {breed.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
Select.propTypes = {
    onSelectBreed: PropTypes.func.isRequired, // Validação da propriedade onSelectBreed como uma função obrigatória
};

export default Select;

// Card.js
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./style.css";

const Card = ({ selectedBreed }) => {
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [isLoadingInfo, setIsLoadingInfo] = useState(false);
    const [catImage, setCatImage] = useState(null);
    const [catInfo, setCatInfo] = useState(null);

    const updateCatInfo = useCallback(() => {
        setIsLoadingImage(true);
        setIsLoadingInfo(true);

        axios
            .get(
                `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreed.id}`
            )
            .then((imageResponse) => {
                setCatImage(imageResponse.data[0]);
                setIsLoadingImage(false);

                axios
                    .get(
                        `https://api.thecatapi.com/v1/breeds/${selectedBreed.id}`
                    )
                    .then((infoResponse) => {
                        setCatInfo(infoResponse.data);
                        setIsLoadingInfo(false);
                    })
                    .catch((error) => {
                        console.error(
                            "Erro ao buscar informações do gato:",
                            error
                        );
                        setIsLoadingInfo(false);
                    });
            })
            .catch((error) => {
                console.error("Erro ao buscar a imagem do gato:", error);
                setIsLoadingImage(false);
            });
    }, [selectedBreed]);

    useEffect(() => {
        updateCatInfo();
    }, [selectedBreed.id, updateCatInfo]);

    return (
        <div className="card">
            {isLoadingImage || isLoadingInfo ? (
                <p>Carregando...</p>
            ) : (
                <>
                    {catImage && catImage.url && (
                        <img
                            src={catImage.url}
                            alt={selectedBreed.id}
                            //onClick={onCardImageClick}
                        />
                    )}
                    <h4>Nome:</h4>
                    <p>{catInfo && catInfo.name}</p>
                    <h4>Origem: </h4>
                    <p>{catInfo && catInfo.origin}</p>
                    <h4>Expectativa de vida:</h4>
                    <p>{catInfo && catInfo.life_span} Anos</p>
                    <button
                        className="buttonwiki"
                        onClick={() => {
                            const wikipediaUrl = catInfo.wikipedia_url.replace(
                                /"/g,
                                ""
                            );
                            window.open(wikipediaUrl, "_blank");
                        }}
                    >
                        WIKIPEDIA
                    </button>
                </>
            )}
        </div>
    );
};

// Card.propTypes = {
//     selectedBreed: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         onCardImageClick: PropTypes.func.isRequired,
//     }).isRequired,
// };

export default Card;

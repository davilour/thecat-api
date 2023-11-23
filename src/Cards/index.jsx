import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import CommentInput from "../Comments/index.jsx";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { firestore } from "/src/services/firebase.js";
import "./style.css";

const Card = ({ selectedBreed }) => {
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [isLoadingInfo, setIsLoadingInfo] = useState(false);
    const [catImage, setCatImage] = useState(null);
    const [catInfo, setCatInfo] = useState(null);
    const [comments, setComments] = useState([]);

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
        // Buscar comentários do Firestore quando a raça é selecionada
        const fetchComments = async () => {
            try {
                const commentsSnapshot = await getDocs(
                    collection(
                        firestore,
                        "comments",
                        selectedBreed.id,
                        "comments"
                    )
                );

                const fetchedComments = commentsSnapshot.docs.map(
                    (doc) => doc.data().comment
                );
                setComments(fetchedComments);
            } catch (error) {
                console.error("Erro ao buscar comentários:", error);
            }
        };

        fetchComments();
        updateCatInfo();
    }, [selectedBreed.id, updateCatInfo]);

    const handleCommentSubmit = async (comment) => {
        try {
            // Enviar comentário para o Firestore
            await addDoc(
                collection(firestore, "comments", selectedBreed.id, "comments"),
                { comment }
            );

            // Atualizar localmente a lista de comentários
            setComments((prevComments) => [...prevComments, comment]);
        } catch (error) {
            console.error("Erro ao enviar comentário:", error);
        }
    };

    return (
        <div className="card">
            {isLoadingImage || isLoadingInfo ? (
                <p>Carregando...</p>
            ) : (
                <>
                    {catImage && catImage.url && (
                        <img src={catImage.url} alt={selectedBreed.id} />
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

                    <CommentInput onCommentSubmit={handleCommentSubmit} />

                    <div>
                        <h4>Comentários:</h4>
                        <ul>
                            {comments.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

Card.propTypes = {
    selectedBreed: PropTypes.object.isRequired,
};

export default Card;

import { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

const Card = ({ cat, name, onCardClick }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCardClick = () => {
        if (onCardClick) {
            setIsLoading(true);

            // Chame a função de clique do card e aguarde a atualização da imagem
            onCardClick().then(() => {
                setIsLoading(false);
            });
        }
    };

    return (
        <div className="card" onClick={handleCardClick}>
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    <img src={cat.url} alt={name} />
                    <p>{name}</p>
                </>
            )}
        </div>
    );
};

Card.propTypes = {
    cat: PropTypes.shape({
        url: PropTypes.string,
    }).isRequired,
    name: PropTypes.string.isRequired,
    onCardClick: PropTypes.func,
};

export default Card;

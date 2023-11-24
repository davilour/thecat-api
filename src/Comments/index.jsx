import { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

const CommentInput = ({ onCommentSubmit }) => {
    const [comment, setComment] = useState("");

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        if (comment.trim() !== "") {
            onCommentSubmit(comment);
            setComment(""); // Limpar o input
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Digite seu comentário..."
                value={comment}
                onChange={handleCommentChange}
                className="inputcomment"
            />
            <button className="sendcomment" onClick={handleSubmit}>
                Enviar Comentário
            </button>
        </div>
    );
};

CommentInput.propTypes = {
    onCommentSubmit: PropTypes.func.isRequired,
};

export default CommentInput;

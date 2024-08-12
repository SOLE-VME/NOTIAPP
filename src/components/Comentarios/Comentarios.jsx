// Comentarios.jsx
import React, { useState, useEffect } from 'react';
import { fetchComentarios, eliminarComentario } from '../../hooks/CommentsCon';
import EditarComentario from './EditarComentario'; 
import './Comentarios.css';

const Comentarios = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const loadComments = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchComentarios();
                setComments(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadComments();
    }, []);

    const handleDelete = async (commentId) => {
        try {
            await eliminarComentario(commentId);
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (err) {
            setError('Error al eliminar el comentario');
        }
    };

    const handleEdit = (commentId) => {
        setEditingCommentId(commentId);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditingCommentId(null);
    };

    const handleSaveEdit = () => {
        handleCloseEditModal();
      
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="my-4">Comentarios</h1>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {comments.length > 0 ? (
                <ul className="list-group">
                    {comments.map((comment) => (
                        <li key={comment.id} className="list-group-item">
                            <div>
                                <strong>Autor:</strong> {comment.author}
                            </div>
                            <div>
                                <strong>Contenido:</strong> {comment.content}
                            </div>
                            <div>
                                <small>
                                    <strong>Creado:</strong> {new Date(comment.created_at).toLocaleDateString()}
                                </small>
                            </div>
                            <div className="btn-group" role="group">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => handleEdit(comment.id)}
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(comment.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="alert alert-info" role="alert">
                    No hay comentarios disponibles.
                </div>
            )}
            {showEditModal && (
                <EditarComentario
                    comentarioId={editingCommentId}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
};

export default Comentarios;

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Comentarios.css'; 

export const CrearComentario = ({ articleId, onCommentCreated, comments, setComments }) => {
    const { auth } = useContext(AuthContext);
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(null); 
    const [editContent, setEditContent] = useState('');

    useEffect(() => {
        if (editing) {
            setEditContent(editing.content);
        }
    }, [editing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!auth.isAuthenticated) {
            setError('Debes estar autenticado para comentar.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (editing) {
                // Editar comentario
                const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/comments/${editing.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${auth.token}`,
                    },
                    body: JSON.stringify({
                        content: editContent,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error al editar el comentario');
                }

                const data = await response.json();
                setComments(comments.map(comment => comment.id === data.id ? data : comment));
                setEditing(null);
                setEditContent('');
            } else {
                // Crear comentario
                const response = await fetch('https://sandbox.academiadevelopers.com/infosphere/comments/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${auth.token}`,
                    },
                    body: JSON.stringify({
                        content,
                        article: articleId,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error al crear el comentario');
                }

                const data = await response.json();
                onCommentCreated(data);
                setContent('');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (commentId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/comments/${commentId}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${auth.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el comentario');
            }

            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h5>{editing ? 'Editar comentario' : 'Deja un comentario'}</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="3"
                            value={editing ? editContent : content}
                            onChange={(e) => editing ? setEditContent(e.target.value) : setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? (editing ? 'Actualizando...' : 'Enviando...') : (editing ? 'Actualizar Comentario' : 'Enviar Comentario')}
                    </button>
                    {editing && (
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => {
                                setEditing(null);
                                setEditContent('');
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

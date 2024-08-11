import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { fetchArticle, fetchEliminarArticulo } from "../../hooks/ArticlesCon";
import { CrearComentario } from "../Comentarios/CrearComentarios";

const placeholderImage = "https://colegioteo.cl/imagenes/noticias/550x600/sin_imagen.jpg";

export const VerArticulo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticle = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchArticle(id);
                setArticle(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadArticle();
    }, [id]);

    useEffect(() => {
        const loadComments = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/comments/?article=${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los comentarios');
                }
                const data = await response.json();
                setComments(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadComments();
    }, [id]);

    const handleVolver = () => {
        navigate("/");
    };

    const handleNuevoArticulo = () => {
        navigate("/articles/nuevo-articulo");
    };

    const handleEditarArticulo = () => {
        navigate(`/articles/editar/${id}`);
    };

    const handleEliminarArticulo = async () => {
        try {
            await fetchEliminarArticulo(id);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCommentCreated = (newComment) => {
        setComments([newComment, ...comments]);
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

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container">
            {article ? (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="my-4 neon-title">{article.title}</h1>
                        {auth.isAuthenticated && (
                            <button onClick={handleNuevoArticulo} className="btn neon-btn">
                                Nuevo Artículo
                            </button>
                        )}
                    </div>
                    <div className="card neon-card">
                        <div className="card-img-container">
                            <img
                                src={article.image || placeholderImage}
                                className="card-img-top neon-img"
                                alt={article.caption || "Imagen del artículo"}
                            />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title neon-title">{article.title}</h5>
                            <p className="card-text">{article.abstract}</p>
                            <p className="card-text">{article.content}</p>
                            <p className="card-text">
                                <small className="text-muted">Creado: {new Date(article.created_at).toLocaleDateString()}</small>
                            </p>
                            <p className="card-text">
                                <small className="text-muted">Actualizado: {new Date(article.updated_at).toLocaleDateString()}</small>
                            </p>
                            <p className="card-text">
                                <small className="text-muted">Vistas: {article.view_count}</small>
                            </p>
                            
                            {article.categories && article.categories.length > 0 && (
                                <div className="mb-3">
                                    <h6 className="neon-title">Categorías:</h6>
                                    <ul className="list-unstyled">
                                        {article.categories.map((category) => (
                                            <li key={category} className="badge bg-primary me-1">
                                                {category}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {article.tags && article.tags.length > 0 && (
                                <div className="mb-3">
                                    <h6 className="neon-title">Etiquetas:</h6>
                                    <ul className="list-unstyled">
                                        {article.tags.map((tag) => (
                                            <li key={tag} className="badge bg-secondary me-1">
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {article.reactions && article.reactions.length > 0 && (
                                <div className="mb-3">
                                    <h6 className="neon-title">Reacciones:</h6>
                                    <ul className="list-unstyled">
                                        {article.reactions.map((reaction) => (
                                            <li key={reaction} className="badge bg-success me-1">
                                                {reaction}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="card-footer text-muted text-center">
                            <button onClick={handleVolver} className="btn neon-btn me-2">Volver</button>
                            {auth.isAuthenticated && (
                                <>
                                    <button onClick={handleEditarArticulo} className="btn neon-btn me-2">Editar Artículo</button>
                                    <button onClick={handleEliminarArticulo} className="btn neon-btn">Eliminar Artículo</button>
                                </>
                            )}
                        </div>
                    </div>
                    {auth.isAuthenticated && (
                        <CrearComentario articleId={id} onCommentCreated={handleCommentCreated} />
                    )}
                    <div className="mt-4">
                        <h4 className="neon-title">Comentarios:</h4>
                        {comments.length === 0 ? (
                            <p>No hay comentarios aún.</p>
                        ) : (
                            <ul className="list-unstyled">
                                {comments.map((comment) => (
                                    <li key={comment.id} className="mb-3">
                                        <div className="card neon-comment">
                                            <div className="card-body">
                                                <p className="card-text">{comment.content}</p>
                                                <p className="card-text">
                                                    <small className="text-muted">Publicado el {new Date(comment.created_at).toLocaleDateString()}</small>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            ) : (
                <p>No se encontró el artículo.</p>
            )}
        </div>
    );
};

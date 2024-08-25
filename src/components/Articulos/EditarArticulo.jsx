import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticle, fetchActualizarArticulo } from "../../hooks/ArticlesCon"; 

export const EditarArticulo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [content, setContent] = useState("");
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticle = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchArticle(id);
                if (data) {
                    setArticle(data);
                    setTitle(data.title);
                    setAbstract(data.abstract || "");
                    setContent(data.content);
                    setCaption(data.caption || "");
                } else {
                    throw new Error("El artículo no se encontró.");
                }
            } catch (err) {
                setError("Error al cargar el artículo: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        loadArticle();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await fetchActualizarArticulo(id, { title, abstract, content, caption });
            navigate(`/articles/${id}`);
        } catch (err) {
            setError("Error al actualizar el artículo: " + err.message);
        }
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
            <h1 className="my-4">Editar Artículo</h1>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {article && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="abstract">Copete</label>
                        <textarea
                            className="form-control"
                            id="abstract"
                            rows="3"
                            value={abstract}
                            onChange={(e) => setAbstract(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Contenido</label>
                        <textarea
                            className="form-control"
                            id="content"
                            rows="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="caption">Epígrafe de la Imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            id="caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Actualizar Artículo</button>
                </form>
            )}
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import { fetchComentario, actualizarComentario } from '../../hooks/CommentsCon'; 

const EditarComentario = ({ comentarioId, onClose, onSave }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadComentario = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchComentario(comentarioId);
                setContent(data.content);
            } catch (err) {
                setError('Error al cargar el comentario');
            } finally {
                setLoading(false);
            }
        };

        loadComentario();
    }, [comentarioId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await actualizarComentario(comentarioId, { content });
            onSave();
            onClose();
        } catch (err) {
            setError('Error al actualizar el comentario');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="modal">
            <h2>Editar Comentario</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="content">Contenido</label>
                    <textarea
                        id="content"
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditarComentario;

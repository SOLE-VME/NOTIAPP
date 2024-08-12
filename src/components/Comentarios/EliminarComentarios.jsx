import { fetchEliminarComentario } from "../../hooks/CommentsCon"; 

const handleEliminarComentario = async (commentId) => {
    try {
        await fetchEliminarComentario(commentId, auth.token);
        setComments(comments.filter(comment => comment.id !== commentId));
    } catch (err) {
        console.error(err.message);
    }
};


{comments.map((comment) => (
    <li key={comment.id} className="mb-3">
        <div className="card">
            <div className="card-body">
                <p className="card-text">{comment.content}</p>
                <p className="card-text">
                    <small className="text-muted">Publicado el {new Date(comment.created_at).toLocaleDateString()}</small>
                </p>
                {auth.isAuthenticated && auth.username === comment.author.username && (
                    <>
                        <button onClick={() => handleEliminarComentario(comment.id)} className="btn btn-danger me-2">
                            Eliminar
                        </button>
                        <EditarComentario
                            commentId={comment.id}
                            articleId={id}
                            initialContent={comment.content}
                            onEditSuccess={(updatedComment) => {
                                const updatedComments = comments.map(c => c.id === updatedComment.id ? updatedComment : c);
                                setComments(updatedComments);
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    </li>
))}
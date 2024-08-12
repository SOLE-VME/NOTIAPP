import React, { useEffect, useState } from "react";
import { fetchProfiles } from "../../hooks/useFetchUsers";
import './styles.css'; 

export const Perfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadProfiles = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchProfiles(currentPage);
                setProfiles(data.profiles);
                setTotalPages(Math.ceil(data.totalCount / 10));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProfiles();
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border neon-text" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center neon-bg" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center neon-text mb-4 animate-title">Perfiles de Usuarios</h1>
            {profiles.length > 0 ? (
                <>
                    <div className="row">
                        {profiles.map((profile) => (
                            <div key={profile.user__id} className="col-md-4 mb-4">
                                <div className="card neon-card shadow-lg border-0 rounded-lg">
                                    {profile.image ? (
                                        <img
                                            src={profile.image}
                                            className="card-img-top rounded-top neon-img"
                                            alt={`${profile.username}'s profile`}
                                        />
                                    ) : (
                                        <img
                                            src="https://pbs.twimg.com/media/FTsDfnWVUAAfDQS.jpg"
                                            className="card-img-top rounded-top neon-img"
                                            alt="No Imagen"
                                        />
                                    )}
                                    <div className="card-body neon-bg">
                                        <h5 className="card-title neon-text">{profile.username}</h5>
                                        <p className="card-text">
                                            <strong>Nombre:</strong> {profile.first_name} {profile.last_name}
                                        </p>
                                        <p className="card-text">
                                            <strong>Email:</strong> {profile.email}
                                        </p>
                                        <p className="card-text">
                                            <strong>Fecha de Nacimiento:</strong> {profile.dob || "No disponible"}
                                        </p>
                                        <p className="card-text">
                                            <strong>Biografía:</strong> {profile.bio || "No disponible"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <button
                                    className="page-link neon-btn"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Anterior
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li
                                    key={index + 1}
                                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link neon-btn"
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className="page-item">
                                <button
                                    className="page-link neon-btn"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Siguiente
                                </button>
                            </li>
                        </ul>
                    </nav>
                </>
            ) : (
                <div className="alert alert-info text-center neon-bg" role="alert">
                    No se encontraron perfiles.
                </div>
            )}
        </div>
    );
};

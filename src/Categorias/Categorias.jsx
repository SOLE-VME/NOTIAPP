import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "./categorycon";

export const Categorias = () => {
    const { auth } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    const handleCreateCategory = async () => {
        try {
            const data = await createCategory({ category: newCategory }, auth.token);
            setCategories([...categories, data]);
            setNewCategory('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateCategory = async (id, updatedCategoryData) => {
        try {
            const data = await updateCategory(id, updatedCategoryData, auth.token);
            setCategories(categories.map(cat => cat.id === id ? data : cat));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id, auth.token);
            setCategories(categories.filter(cat => cat.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    return (
        <div>
            <h2>Categorías de Artículos</h2>
            <div className="mb-3">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nueva categoría"
                    className="form-control"
                />
                <button onClick={handleCreateCategory} className="btn btn-primary mt-2">Crear Categoría</button>
            </div>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        {category.category}
                        <button onClick={() => handleUpdateCategory(category.id, { category: "New Category" })}>
                            Editar
                        </button>
                        <button onClick={() => handleDeleteCategory(category.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

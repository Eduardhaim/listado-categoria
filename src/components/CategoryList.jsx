import { useState, useEffect } from "react";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        if (!res.ok) throw new Error("Error al cargar las categorías");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Categorías</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const img =
            Array.isArray(cat.image) && cat.image.length > 0 && cat.image[0]
              ? cat.image[0]
              : typeof cat.image === "string" && cat.image.trim() !== ""
              ? cat.image
              : "https://via.placeholder.com/300x200?text=Sin+Imagen";

          return (
            <div
              key={cat.id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center hover:scale-105 transition-transform"
            >
              <img
                src={img}
                alt={cat.name}
                className="w-40 h-40 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold text-center">{cat.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { getCats, deleteCat } from "../api/cats";

type Cat = {
  id: number;
  name: string;
  years_of_experience: number;
  breed: string;
  salary: number;
};

export default function CatList({
  onEdit,
}: {
  onEdit: (cat: Cat) => void;
}) {
  const [cats, setCats] = useState<Cat[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCats() {
      try {
        const data = await getCats();
        setCats(data);
      } catch (err) {
        setError("Failed to fetch cats");
      }
    }
    fetchCats();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCat(id);
      setCats(cats.filter((cat) => cat.id !== id));
    } catch (err) {
      setError("Failed to delete cat");
    }
  };

  return (
    <div className="mt-4">
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {cats.map((cat) => (
          <li key={cat.id} className="p-4 border rounded">
            <p>
              <strong>{cat.name}</strong> ({cat.breed}, {cat.years_of_experience} years)
            </p>
            <p>Salary: ${cat.salary}</p>
            <button
              onClick={() => onEdit(cat)}
              className="mr-2 text-blue-500"
            >
              Edit Salary
            </button>
            <button
              onClick={() => handleDelete(cat.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
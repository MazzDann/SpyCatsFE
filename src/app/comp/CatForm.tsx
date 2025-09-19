"use client";
import { useState } from "react";
import { createCat, updateCatSalary } from "../api/cats";

type CatFormProps = {
  cat?: {
    id: number;
    name: string;
    years_of_experience: number;
    breed: string;
    salary: number;
  };
  onSuccess: () => void;
};

export default function CatForm({ cat, onSuccess }: CatFormProps) {
  const [formData, setFormData] = useState({
    name: cat?.name || "",
    years_of_experience: cat?.years_of_experience || 0,
    breed: cat?.breed || "",
    salary: cat?.salary || 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (cat) {
        await updateCatSalary(cat.id, formData.salary);
      } else {
        await createCat(formData);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.detail || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {!cat && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="p-2 border rounded w-full"
            required
          />
          <input
            type="number"
            placeholder="Years of Experience"
            value={formData.years_of_experience}
            onChange={(e) =>
              setFormData({
                ...formData,
                years_of_experience: parseInt(e.target.value),
              })
            }
            className="p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Breed"
            value={formData.breed}
            onChange={(e) =>
              setFormData({ ...formData, breed: e.target.value })
            }
            className="p-2 border rounded w-full"
            required
          />
        </>
      )}
      <input
        type="number"
        placeholder="Salary"
        value={formData.salary}
        onChange={(e) =>
          setFormData({ ...formData, salary: parseFloat(e.target.value) })
        }
        className="p-2 border rounded w-full"
        required
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        {cat ? "Update Salary" : "Add Cat"}
      </button>
    </form>
  );
}
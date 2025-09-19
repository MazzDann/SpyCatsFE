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
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (cat) {
        await updateCatSalary(cat.id, formData.salary);
        setSuccess("Salary updated successfully!");
      } else {
        await createCat(formData);
        setSuccess("Cat added successfully!");
      }
      setFormData({ ...formData, salary: 0 }); // Reset salary field
      onSuccess(); // Trigger list refresh
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
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
            disabled={isLoading}
          />
          <input
            type="number"
            placeholder="Years of Experience"
            value={formData.years_of_experience}
            onChange={(e) =>
              setFormData({
                ...formData,
                years_of_experience: parseInt(e.target.value) || 0,
              })
            }
            className="p-2 border rounded w-full"
            required
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </>
      )}
      <input
        type="number"
        placeholder="Salary"
        value={formData.salary}
        onChange={(e) =>
          setFormData({
            ...formData,
            salary: parseFloat(e.target.value) || 0,
          })
        }
        className="p-2 border rounded w-full"
        required
        disabled={isLoading}
        step="0.01"
      />
      <button
        type="submit"
        className={`p-2 rounded w-full text-white ${
          isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : cat ? "Update Salary" : "Add Cat"}
      </button>
    </form>
  );
}
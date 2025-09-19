"use client";
import { useCallback, useEffect, useState } from "react";
import CatForm from "./comp/CatForm";
import CatList from "./comp/CatList";
import { Cat, getCats } from "./api/cats";
import MissionList from "./comp/MissionList";
import MissionForm from "./comp/MissionForm";
import { toast } from "react-toastify/unstyled";

export default function Home() {
  const [editingCat, setEditingCat] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [cats, setCats] = useState<{ id: number; name: string }[]>([]);

  const fetchCats = async () => {
    try {
      const data = await getCats();
      setCats(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch cats");
    }
  };

  useEffect(() => {
    fetchCats();
  }, [refreshKey]);
  const handleSuccess = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
    setEditingCat(null);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spy Cat Agency Dashboard</h1>
      <CatForm cat={editingCat} onSuccess={handleSuccess} />
      <CatList key={refreshKey} onEdit={setEditingCat} />

      <h2 className="text-xl font-bold mb-2 mt-4">Manage Missions</h2>
      <MissionForm cats={cats} onSuccess={handleSuccess} />
      <MissionList cats={cats} refreshKey={refreshKey} />

    </div>
  );
}
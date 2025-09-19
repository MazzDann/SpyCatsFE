"use client";
import { useCallback, useState } from "react";
import CatForm from "./comp/CatForm";
import CatList from "./comp/CatList";
import { Cat } from "./api/cats";

export default function Home() {const [editingCat, setEditingCat] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
const handleSuccess = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
    setEditingCat(null);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spy Cat Agency Dashboard</h1>
      <CatForm cat={editingCat} onSuccess={handleSuccess} />
      <CatList key={refreshKey} onEdit={setEditingCat} />
    </div>
  );
}
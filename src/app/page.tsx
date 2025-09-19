"use client";
import { useState } from "react";
import CatForm from "./comp/CatForm";
import CatList from "./comp/CatList";

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  const [editingCat, setEditingCat] = useState<any>(null);

  const handleSuccess = () => {
    setRefresh((r) => r + 1);
    setEditingCat(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spy Cat Agency Dashboard</h1>
      <CatForm cat={editingCat} onSuccess={handleSuccess} />
      <CatList key={refresh} onEdit={setEditingCat} />
    </div>
  );
}
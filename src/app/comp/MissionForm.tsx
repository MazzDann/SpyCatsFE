"use client";
import { useState } from "react";
import { createMission } from "../api/cats";
import { toast } from "react-toastify";

type MissionFormProps = {
    cats: { id: number; name: string }[];
    onSuccess: () => void;
};

export default function MissionForm({ cats, onSuccess }: MissionFormProps) {
    const [targets, setTargets] = useState([{ name: "", country: "", notes: "" }]);
    const [catId, setCatId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addTarget = () => {
        if (targets.length < 3) {
            setTargets([...targets, { name: "", country: "", notes: "" }]);
        } else {
            toast.error("Cannot add more than 3 targets");
        }
    };

    const removeTarget = (index: number) => {
        if (targets.length > 1) {
            setTargets(targets.filter((_, i) => i !== index));
        } else {
            toast.error("Mission must have at least 1 target");
        }
    };

    const updateTarget = (index: number, field: string, value: string) => {
        const newTargets = [...targets];
        newTargets[index] = { ...newTargets[index], [field]: value };
        setTargets(newTargets);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (targets.length < 1 || targets.length > 3) {
            setError("Mission must have 1 to 3 targets");
            toast.error("Mission must have 1 to 3 targets");
            setIsLoading(false);
            return;
        }

        for (const target of targets) {
            if (!target.name || !target.country) {
                setError("All targets must have a name and country");
                toast.error("All targets must have a name and country");
                setIsLoading(false);
                return;
            }
        }

        try {
            await createMission({ cat_id: catId, targets });
            toast.success("Mission created successfully!");
            setTargets([{ name: "", country: "", notes: "" }]);
            setCatId(null);
            onSuccess();
        } catch (err: any) {
            setError(err.message || "Failed to create mission");
            toast.error(err.message || "Failed to create mission");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <div>
                <label className="block text-sm font-medium">Assign Cat (Optional)</label>
                <select
                    value={catId || ""}
                    onChange={(e) => setCatId(e.target.value ? parseInt(e.target.value) : null)}
                    className="p-2 border rounded w-full"
                    disabled={isLoading}
                >
                    <option value="">No Cat</option>
                    {cats.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h3 className="text-lg font-medium">Targets (1-3)</h3>
                {targets.map((target, index) => (
                    <div key={index} className="space-y-2 border p-4 rounded mb-2">
                        <input
                            type="text"
                            placeholder="Target Name"
                            value={target.name}
                            onChange={(e) => updateTarget(index, "name", e.target.value)}
                            className="p-2 border rounded w-full"
                            required
                            disabled={isLoading}
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            value={target.country}
                            onChange={(e) => updateTarget(index, "country", e.target.value)}
                            className="p-2 border rounded w-full"
                            required
                            disabled={isLoading}
                        />
                        <input
                            type="text"
                            placeholder="Notes (Optional)"
                            value={target.notes}
                            onChange={(e) => updateTarget(index, "notes", e.target.value)}
                            className="p-2 border rounded w-full"
                            disabled={isLoading}
                        />
                        {targets.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeTarget(index)}
                                className="text-red-500 hover:underline"
                                disabled={isLoading}
                            >
                                Remove Target
                            </button>
                        )}
                    </div>
                ))}
                {targets.length < 3 && (
                    <button
                        type="button"
                        onClick={addTarget}
                        className="text-blue-500 hover:underline"
                        disabled={isLoading}
                    >
                        Add Target
                    </button>
                )}
            </div>
            <button
                type="submit"
                className={`p-2 rounded w-full text-white transition ${
                    isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={isLoading}
            >
                {isLoading ? "Processing..." : "Create Mission"}
            </button>
        </form>
    );
}
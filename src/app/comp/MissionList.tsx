"use client";
import { useState, useEffect } from "react";
import { getMissions, assignCatToMission, updateTargetNotes, markTargetComplete } from "../api/cats";
import { toast } from "react-toastify";

type Cat = { id: number; name: string };
type Target = { id: number; name: string; country: string; notes: string; complete: boolean };
type Mission = { id: number; cat_id: number | null; complete: boolean; targets: Target[]; cat?: Cat };

export default function MissionList({
    cats,
    refreshKey,
}: {
    cats: Cat[];
    refreshKey: number;
}) {
    const [missions, setMissions] = useState<Mission[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [notesInput, setNotesInput] = useState<{ [key: number]: string }>({});

    const fetchMissions = async () => {
        setIsLoading(true);
        try {
            const data = await getMissions();
            setMissions(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Failed to fetch missions");
            toast.error(err.message || "Failed to fetch missions");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMissions();
    }, [refreshKey]);

    const handleAssignCat = async (missionId: number, catId: number) => {
        try {
            await assignCatToMission(missionId, catId);
            toast.success("Cat assigned to mission!");
            fetchMissions();
        } catch (err: any) {
            toast.error(err.message || "Failed to assign cat");
        }
    };

    const handleUpdateNotes = async (targetId: number) => {
        const notes = notesInput[targetId] || "";
        try {
            await updateTargetNotes(targetId, notes);
            toast.success("Target notes updated!");
            fetchMissions();
        } catch (err: any) {
            toast.error(err.message || "Failed to update notes");
        }
    };

    const handleMarkComplete = async (targetId: number) => {
        try {
            await markTargetComplete(targetId);
            toast.success("Target marked as complete!");
            fetchMissions();
        } catch (err: any) {
            toast.error(err.message || "Failed to mark target complete");
        }
    };

    return (
        <div className="mt-4">
            {isLoading && <p>Loading missions...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <h2 className="text-xl font-bold mb-2">Missions</h2>
            <ul className="space-y-4">
                {missions.map((mission) => (
                    <li key={mission.id} className="p-4 border rounded">
                        <p>
                            <strong>Mission {mission.id}</strong> (Status: {mission.complete ? "Complete" : "Incomplete"})
                        </p>
                        <p>Assigned Cat: {mission.cat ? mission.cat.name : "None"}</p>
                        {!mission.complete && (
                            <div className="mt-2">
                                <label className="block text-sm font-medium">Assign Cat</label>
                                <select
                                    onChange={(e) => e.target.value && handleAssignCat(mission.id, parseInt(e.target.value))}
                                    className="p-2 border rounded"
                                    disabled={isLoading}
                                >
                                    <option value="">Select Cat</option>
                                    {cats.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <h3 className="text-lg font-medium mt-2">Targets</h3>
                        <ul className="space-y-2">
                            {mission.targets.map((target) => (
                                <li key={target.id} className="p-2 border rounded">
                                    <p>
                                        <strong>{target.name}</strong> ({target.country}, {target.complete ? "Complete" : "Incomplete"})
                                    </p>
                                    <p>Notes: {target.notes || "None"}</p>
                                    {!target.complete && !mission.complete && (
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                placeholder="Update Notes"
                                                value={notesInput[target.id] || ""}
                                                onChange={(e) => setNotesInput({ ...notesInput, [target.id]: e.target.value })}
                                                className="p-2 border rounded w-full"
                                                disabled={isLoading}
                                            />
                                            <button
                                                onClick={() => handleUpdateNotes(target.id)}
                                                className="mt-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                disabled={isLoading}
                                            >
                                                Update Notes
                                            </button>
                                            <button
                                                onClick={() => handleMarkComplete(target.id)}
                                                className="mt-1 ml-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                                                disabled={isLoading}
                                            >
                                                Mark Complete
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
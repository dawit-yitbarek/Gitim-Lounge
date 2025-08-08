import React, { useEffect, useState } from "react";
import { protectedApi } from "./Api";
import { Heart } from "lucide-react";
import { MyPoemSkeleton } from "./SkeletonPlaceholder";

export default function MyPoems() {
    const [openPoemId, setOpenPoemId] = useState(null);
    const [userPoems, setUserPoems] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('failed to fetch poems')
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [deletePoemLoad, setDeletePoemLoad] = useState(false);
    const [deletePoemError, setDeletePoemError] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");
                const poemsRes = await protectedApi.get(`/api/poems/me`);
                setUserPoems(poemsRes.data);
            } catch (err) {
                setError("Failed to fetch poems");
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDeletePoem = async (id) => {
        try {
            setDeletePoemError("");
            setDeletePoemLoad(true);
            await protectedApi.delete(`/api/poems/${id}`);
            setUserPoems(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            setDeletePoemError("Failed to delete poem. Please try again.");
            console.error("Failed to delete poem:", err);
        } finally {
            setDeletePoemLoad(false);
        }
    };

    const togglePoem = (id) => {
        setOpenPoemId((prevId) => (prevId === id ? null : id));
    };

    return (
        <>
            {/* Poems List */}
            <div className="rounded-xl shadow-lg p-6 space-y-6" style={{ backgroundColor: "#d0c3ba" }}>
                <h2 className="text-2xl font-semibold text-[#10214b] mb-2">My Poems</h2>

                {loading ? Array(5).fill().map((_, i) => <MyPoemSkeleton key={i} />)
                    : error ? <p className="text-md text-red-500"> {error}</p>
                        : userPoems.length === 0 ?
                            <p className="text-gray-700">You haven't posted any poems yet.</p>
                            : userPoems.map((poem) => {
                                const isOpen = openPoemId === poem.id;

                                return (
                                    <div
                                        key={poem.id}
                                        className="bg-[#ebe7e1] rounded-xl p-5 shadow-inner space-y-3 border border-[#d7bd88]"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold text-[#10214b]">{poem.title}</h3>
                                            </div>

                                            <div className="text-right space-y-1">
                                                <p className="text-sm text-[#10214b]">
                                                    {new Date(poem.created_at).toLocaleDateString()}
                                                </p>
                                                <div className="flex items-center justify-end gap-1 text-[#10214b]">
                                                    <Heart className="w-12 h-7" fill="#10214b" />
                                                    <span>{poem.likes_count}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => togglePoem(poem.id)}
                                                className="text-sm text-[#10214b] underline"
                                            >
                                                {isOpen ? "Hide details ▲" : "View details ▼"}
                                            </button>
                                        </div>

                                        {isOpen && (
                                            <div className="space-y-3">
                                                {poem.description && (
                                                    <p className="text-sm italic text-[#10214b]">{poem.description}</p>
                                                )}

                                                <div className="space-y-1">
                                                    {poem.content.map((line, idx) => (
                                                        <p key={idx} className="text-[#10214b] text-base leading-relaxed">
                                                            {line}
                                                        </p>
                                                    ))}
                                                </div>

                                                <div className="flex justify-end mt-2">
                                                    <button
                                                        onClick={() => setConfirmDeleteId(poem.id)}
                                                        className="px-4 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                }
            </div>

            {/* Confirm Delete Modal */}
            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md space-y-4 max-w-sm w-full">
                        <h2 className="text-lg font-semibold text-[#10214b]">Confirm Delete</h2>
                        <p>Are you sure you want to delete this poem?</p>

                        {deletePoemError && <p className="text-red-500">{deletePoemError}</p>}
                        <div className="flex justify-end gap-3">
                            <button
                                disabled={deletePoemLoad}
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-3 py-1 rounded bg-gray-300 text-[#10214b]"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={deletePoemLoad}
                                onClick={() => {
                                    handleDeletePoem(confirmDeleteId);
                                    setConfirmDeleteId(null);
                                }}
                                className="px-3 py-1 rounded bg-red-600 text-white"
                            >
                                {deletePoemLoad ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}

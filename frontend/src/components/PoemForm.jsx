import { useState } from "react";
import { protectedApi } from "./Api";

export default function PoemForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [poem, setPoem] = useState("");
    const [postPoemLoad, setPostPoemLoad] = useState(false);
    const [postError, setPostError] = useState("");
    const [postSuccess, setPostSuccess] = useState("");

    const handlePostPoem = async (e) => {
        e.preventDefault();
        setPostError("");
        setPostSuccess("");
        try {
            setPostPoemLoad(true);
            const poemLines = poem.split('\n')
            if (poemLines.every(line => !line.trim())) {
                setPostError("Please add at least one line to your poem.");
                return;
            }
            await protectedApi.post("/api/poems", {
                title,
                description,
                content: poemLines
            });
            setPostSuccess("Poem posted successfully ✅!");
            setTitle("");
            setDescription("");
            setPoem("");
        } catch (err) {
            console.error("Failed to post poem:", err);
            setPostError("Failed to post poem. Please try again.");
        } finally {
            setPostPoemLoad(false);
        }
    };

    return (
        <div className="rounded-xl shadow-lg p-6 space-y-4" style={{ backgroundColor: "#d0c3ba" }}>
            <h2 className="text-2xl font-semibold text-[#10214b]">Write a Poem</h2>

            <form onSubmit={handlePostPoem} id="poemForm">
                <input
                    spellCheck="false"
                    required
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Poem Title"
                    className="w-full p-2 rounded bg-[#ebe7e1] text-[#10214b] placeholder:text-gray-600 outline-none"
                />
                <textarea
                    spellCheck="false"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional description..."
                    className="w-full p-2 mt-2 rounded bg-[#ebe7e1] text-[#10214b] placeholder:text-gray-600 outline-none"
                />

                <textarea
                    rows={10}
                    spellCheck="false"
                    required
                    value={poem}
                    onChange={(e) => setPoem(e.target.value)}
                    placeholder="Your poem"
                    className="w-full p-2 mb-2 rounded bg-[#ebe7e1] text-[#10214b] placeholder:text-gray-600 outline-none"
                />


                {postError && (
                    <p className="text-red-500 text-md my-2">{postError}</p>
                )}
                {postSuccess && (
                    <p className="text-[#10214b] text-md my-2">{postSuccess}</p>
                )}
                <div className="flex">
                    <button
                        disabled={postPoemLoad}
                        type="submit"
                        className="px-3 py-1 bg-[#10214b] text-[#d7bd88] font-medium rounded hover:bg-[#1b2d61]"
                    >
                        {postPoemLoad ? "Posting..." : "Post Poem"}
                    </button>
                </div>
            </form>
        </div>
    )
}

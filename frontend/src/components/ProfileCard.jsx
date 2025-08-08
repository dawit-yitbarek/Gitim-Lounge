import React, { useEffect, useState } from "react";
import { protectedApi } from "./Api";
import UploadImage from "./UploadImage";
import { ProfileCardSkeleton } from "./SkeletonPlaceholder"

export default function ProfileCard() {
    const [profile, setProfile] = useState({ name: "", profile_image: "" });
    const [loading, setLoading] = useState(true);
    const [updateProfileLoad, setUpdateProfileLoad] = useState(false);
    const [error, setError] = useState("");
    const [updateProfileError, setUpdateProfileError] = useState("");
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await protectedApi.get("/api/user");
                setProfile((prev) => ({
                    ...prev,
                    name: response.data.user.name,
                    profile_image: response.data.user.profile_image
                }));
            } catch (error) {
                setError("Failed to fetch profile");
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            setUpdateProfileError("");
            setUpdateProfileLoad(true);
            await protectedApi.put("/api/user/update-profile", { name: profile.name, imageUrl: profile.profile_image });
            window.location.reload();
        } catch (err) {
            setUpdateProfileError("Failed to update profile");
            console.error("Failed to update profile:", err);
        } finally {
            setUpdateProfileLoad(false);
        }
    };

    return (
        <>
            {loading ? <ProfileCardSkeleton /> : error ? <p className="text-red-500">{error}</p> :
                <div className="rounded-xl shadow-lg p-6 space-y-4" style={{ backgroundColor: "#d0c3ba" }}>
                    <div className="flex items-center gap-6">
                        <img
                            src={profile.profile_image}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-[#d7bd88]"
                        />
                        <div className="flex-1 space-y-2">
                            <UploadImage
                                setLoading={(loading) => setUploadingImage(loading)}
                                setImageUrl={(url) => setProfile((prev) => ({ ...prev, profile_image: url }))}
                                resetTrigger={profile.profile_image}
                                status={updateProfileLoad}
                                showPreview={false}
                            />
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder="Your Name"
                                className="w-full p-2 rounded bg-[#ebe7e1] text-[#10214b] placeholder:text-gray-600 outline-none"
                            />

                            {updateProfileError && <p className="text-red-500">{updateProfileError}</p>}
                            <div>
                                <button
                                    disabled={updateProfileLoad || uploadingImage}
                                    onClick={handleUpdateProfile}
                                    className="px-4 py-2 mt-2 rounded bg-[#d7bd88] text-[#10214b] font-semibold hover:opacity-90"
                                >
                                    {updateProfileLoad ? "Saving..." : "Save Profile"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
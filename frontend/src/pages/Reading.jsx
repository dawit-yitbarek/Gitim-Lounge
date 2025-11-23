import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { protectedApi, publicApi } from "../components/Api";
import { Menu, Heart, Share2 } from "lucide-react";
import { ReadingPageSkeleton } from "../components/SkeletonPlaceholder";

const PoemsPage = () => {
  const navigate = useNavigate();
  const { authorId } = useParams();
  const [searchParams] = useSearchParams();
  const poemIdFromQuery = Number(searchParams.get("poemId"));
  const [poems, setPoems] = useState([]);
  const [currentPoemId, setCurrentPoemId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [authorInfo, setAuthorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch poems on mount
  useEffect(() => {
    const fetchPoems = async () => {
      try {
        setLoading(true);
        const response = await publicApi.get(`/api/poems/reading/${authorId}`);
        const authorData = await publicApi.get(`/api/user/author/${authorId}`);
        const data = response.data;
        setAuthorInfo(authorData.data.user)
        setPoems(data);
        if (poemIdFromQuery) {
          setCurrentPoemId(poemIdFromQuery);
        } else if (data.length > 0) {
          setCurrentPoemId(data[0].id);
        }

      } catch (err) {
        console.error("Failed to fetch poems:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, [authorId]);

  // Check if current poem is liked
  useEffect(() => {
    if (!currentPoemId) return;
    const checkLiked = async () => {
      try {
        const response = await protectedApi.get(`/api/like/${currentPoemId}/status`);
        setAlreadyLiked(response.data.liked);
      } catch (error) {
        console.error("Failed to check like status:", error);
      }

    };
    checkLiked();
  }, [currentPoemId]);

  // Handle Like
  const handleLike = async (poemId) => {
    try {
      await protectedApi.post(`/api/like/${poemId}`);
      setPoems((prev) =>
        prev.map((poem) =>
          poem.id === poemId
            ? { ...poem, likes_count: poem.likes_count + 1 }
            : poem
        )
      );
      setAlreadyLiked(true);
    } catch (err) {
      console.error("Failed to like poem:", err);
    }
  };

  const currentPoem = poems.find((poem) => poem.id === currentPoemId);

  const handleShare = async () => {
    try {
      const shareUrl = window.location.href;
      const shareData = {
        title: currentPoem.title,
        text: `Check out this poem: "${currentPoem.title}" by ${authorInfo.name}`,
        url: shareUrl,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };


  return (
    <div className="flex min-h-screen bg-[#10214b] text-[#ebe7e1] relative">
      {/* Mobile Toggle Button */}
      {loading ? <ReadingPageSkeleton /> : (
        <>
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden absolute top-4 left-4 z-20 p-2 rounded bg-[#0d1836] text-[#d7bd88]"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Sidebar */}
          <aside
            className={`bg-[#0d1836] border-r border-[#1c2a4b] p-6 w-64 min-h-screen overflow-y-auto z-30
  fixed top-0 left-0 transition-transform duration-300
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  md:relative md:translate-x-0`}
          >
            {/* Author Info */}
            {authorInfo && poems.length > 0 && (
              <div className="flex flex-col items-center mb-8 mt-14 md:mt-0">
                <img
                  src={authorInfo.profile_image}
                  alt={authorInfo.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#d7bd88]"
                />
                <h2 className="mt-4 text-lg font-semibold text-[#d7bd88] text-center">
                  {authorInfo.name}
                </h2>
              </div>
            )}

            {/* Poem Titles */}
            <ul className="space-y-3">
              {poems.map((poem) => (
                <li
                  key={poem.id}
                  onClick={() => {
                    setCurrentPoemId(poem.id);
                    navigate(`/reading/${authorId}?poemId=${poem.id}`);
                    setSidebarOpen(false);
                  }}
                  className={`cursor-pointer px-3 py-2 rounded-md transition ${currentPoemId === poem.id
                    ? "bg-[#d7bd88] text-[#10214b] font-semibold"
                    : "hover:bg-[#1c2a4b]"
                    }`}
                >
                  {poem.title}
                </li>
              ))}
            </ul>
          </aside>


          {/* Overlay for mobile sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 px-6 py-12 overflow-y-auto z-0">
            <div className="flex flex-col items-center max-w-3xl w-full mx-auto space-y-8">
              {currentPoem && (
                <>
                  {/* Poem Header */}
                  <div className="text-center mt-4">
                    <h1 className="text-4xl font-serif text-[#d7bd88] mb-2">
                      {currentPoem.title}
                    </h1>
                  </div>


                  {/* Poem Body */}
                  <div className="space-y-2 font-serif text-lg leading-loose text-center">
                    {currentPoem.content?.map((line, i) => (
                      line ? <p key={i}>{line}</p> : <p key={i}>&nbsp;</p>
                    ))}
                  </div>

                  {/* Like and Share Buttons */}
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => handleLike(currentPoem.id)}
                      disabled={alreadyLiked}
                      className="flex items-center gap-2 bg-[#d7bd88] text-[#10214b] px-6 py-2 rounded-full hover:bg-[#e5ca95] transition"
                    >
                      <Heart
                        className={`w-12 h-7 ${alreadyLiked ? "text-[#e70303ff]" : "text-[#ffffff]"}`}
                        fill={alreadyLiked ? "#e70303ff" : "#ffffff"}
                      />
                      <span>{currentPoem.likes_count.toLocaleString()}</span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 bg-[#d7bd88] text-[#10214b] px-6 py-2 rounded-full hover:bg-[#e5ca95] transition"
                    >
                      <Share2 className="w-5 h-7" />
                      <span>Share</span>
                    </button>
                  </div>

                </>
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default PoemsPage;

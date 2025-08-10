import { useEffect, useState } from "react";
import { HeartIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { publicApi } from '../components/Api';
import { PoemCard } from '../components/SkeletonPlaceholder';

const AllPoems = () => {
  const [poems, setPoems] = useState([]);
  const [filteredPoems, setFilteredPoems] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await publicApi.get(`/api/poems`);
        setPoems(response.data.poems);
      } catch (error) {
        setError(true);
        console.error("Error fetching poems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);


  useEffect(() => {
    let updated = [...poems];

    // Filter
    if (search) {
      updated = updated.filter(poem =>
        poem.name.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    // Sort
    if (sortBy === 'latest') {
      updated.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === 'mostLiked') {
      updated.sort((a, b) => b.likes_count - a.likes_count);
    }

    setFilteredPoems(updated);
  }, [poems, search, sortBy]);

  return (
    <section className="bg-[#10214B] py-12 px-4 md:px-16 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Intro Text */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#D7BD88] mb-3">Welcome to ግጥም Lounge</h2>
          <p className="text-[#CFCAC5] max-w-xl mx-auto">
            Discover beautiful poetry from our talented community. Use the search and sort tools to find poems that move your soul.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by author name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-md bg-[#d0c3ba] text-[#1B263B] border border-[#D7BD88] focus:outline-none placeholder:text-[#1B263B] placeholder:opacity-70"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 rounded-md bg-[#d0c3ba] text-[#1B263B] border border-[#D7BD88] focus:outline-none"
          >
            <option value="latest">Sort by Latest</option>
            <option value="mostLiked">Sort by Most Liked</option>
          </select>
        </div>

        {/* Error / Loading */}
        {error && <p className="text-red-400 text-center">Failed to load poems. reload the page.</p>}

        {/* Poems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoems.length === 0 && !loading && !error && (
            <p className="text-center text-[#CFCAC5] col-span-full">No poems found.</p>
          )}

          {loading ? (
            Array.from({ length: 12 }).map((_, index) => <PoemCard key={index} />)
          ) : (
              filteredPoems.map((poem) => (
                <div
                  key={poem.poem_id}
                  className="bg-[#1B2B52] rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={poem.profile_image}
                      alt={poem.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#d7bd88]"
                    />
                    <div>
                      <p className="text-[#EBE7E1] font-semibold">{poem.name}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#D7BD88]">
                    {poem.title}
                  </h3>
                  <p className="text-[#CFCAC5] mt-2 mb-4">{poem?.description}</p>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/reading/${poem.author_id}?poemId=${poem.poem_id}`)}
                      className="bg-[#D7BD88] hover:bg-[#C7AF76] text-[#10214B] px-4 py-2 rounded-lg transition"
                    >
                      Read Poem
                    </button>
                    <div className="flex items-center gap-1 text-[#d7bd88]">
                      <HeartIcon className="text-lg" fill="#d7bd88" />
                      <span className="text-[#CFCAC5] font-medium">
                        {poem.likes_count.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )
          }
        </div>
      </div>
    </section>
  );
};

export default AllPoems;
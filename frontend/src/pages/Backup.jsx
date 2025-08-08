import { useEffect, useState } from "react";
import { HeartIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { publicApi } from '../components/Api'

const AllPoems = () => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPoems = async () => {
      try {
        setLoading(true)
        setError(false)
        const response = await publicApi.get(`/api/poems`);
        setPoems(response.data.poems);
      } catch (error) {
        setError(true)
        console.error("Error fetching poems:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchPoems();
  }, [])


  return (
    <section className="bg-[#ebe7e1] py-12 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-center md:text-4xl font-semibold text-[#10214b] mb-8">
          Explore All Poems
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {poems.map((poem) => (
            <div
              key={poem.poem_id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={poem.profile_image}
                  alt={poem.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#d7bd88]"
                />
                <div>
                  <p className="text-[#10214b] font-semibold">{poem.name}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#10214b]">
                {poem.title}
              </h3>
              <p className="text-gray-700 mt-2 mb-4">{poem.description}</p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate(`/reading/${poem.author_id}?poemId=${poem.poem_id}`)}
                  className="bg-[#10214b] text-white px-4 py-2 rounded-lg hover:bg-[#1c326f] transition">
                  Read Poem
                </button>
                <div className="flex items-center gap-1 text-[#d7bd88]">
                  <HeartIcon className="text-lg" fill="#d7bd88" />
                  <span className="text-[#10214b] font-medium">{poem.likes_count.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllPoems;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon } from "lucide-react";
import { publicApi } from './Api';
import { PoemCard } from './SkeletonPlaceholder'
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

// const featuredPoems = [
//     {
//         id: 1,
//         title: 'የአልፋ ጉርምት',
//         author: 'Mehru',
//         description: 'A deep reflection on love and loss expressed in rich Amharic rhythm.',
//         authorImage: "/images/profile.jpg",
//         likes: 24,
//     },
//     {
//         id: 2,
//         title: 'የትክክል እምነት',
//         author: 'Sami Wond',
//         description: 'A powerful piece on faith and purpose in a chaotic world.',
//         authorImage: "/images/profile.jpg",
//         likes: 42,
//     },
//     {
//         id: 3,
//         title: 'ሰውነትና ሐሳብ',
//         author: 'Lulit T',
//         description: 'Explores the tension between the physical and spiritual self with poetic grace.',
//         authorImage: "/images/profile.jpg",
//         likes: 19,
//     },
// ];

const FeaturedPoems = () => {
    const [featuredPoems, setFeaturedPoems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeaturedPoems = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await publicApi.get(`${BackEndUrl}/api/poems/featured`);
                setFeaturedPoems(response.data.featuredPoems);
            } catch (error) {
                setError(true);
                console.error("Error fetching featured poems:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedPoems();
    }, []);

    return (
        <section className="bg-[#10214B] text-[#EBE7E1] py-16 px-4">
            <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-semibold text-[#D7BD88] tracking-wide uppercase">
                    Featured Poems
                </h3>
                <p className="text-base md:text-lg mt-4 text-[#D0C3BA] max-w-2xl mx-auto leading-relaxed">
                    Curated highlights from our talented writers. Read and get inspired by the voices of the community.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {loading ?
                    Array.from({ length: 3 }).map((_, index) => <PoemCard key={index} />)
                    :
                    error ?
                        <div className="text-red-500 text-center col-span-3">Failed to load featured poems. Please reload the page.</div>
                        :
                        featuredPoems.map((poem) => (
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
                                        className="bg-[#D7BD88] hover:bg-[#C7AF76] text-[#10214B] px-4 py-2 rounded-lg transition">
                                        Read Poem
                                    </button>
                                    <div className="flex items-center gap-1 text-[#d7bd88]">
                                        <HeartIcon className="text-lg" fill="#d7bd88" />
                                        <span className="text-[#CFCAC5] font-medium">{poem.likes_count.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
            </div>
        </section>
    );
};

export default FeaturedPoems;
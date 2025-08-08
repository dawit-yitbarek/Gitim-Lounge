import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { publicApi } from "./Api";
import { TestimonialSkeleton } from "./SkeletonPlaceholder";

const Testimonials = () => {
    const [index, setIndex] = useState(0);
    const [hovering, setHovering] = useState(false);
    const [fetchedTestimonials, setFetchedTestimonials] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const next = () =>
        setIndex((prev) => (prev + 1) % fetchedTestimonials.length);

    const prev = () =>
        setIndex((prev) => (prev - 1 + fetchedTestimonials.length) % fetchedTestimonials.length);

    useEffect(() => {
        const getTestimonials = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await publicApi.get("/api/feedback");
                setFetchedTestimonials(response.data.testimonials);
            } catch (error) {
                console.error("Failed to fetch testimonials", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        getTestimonials();
    }, []);

    useEffect(() => {
        if (!hovering && fetchedTestimonials.length > 1) {
            const interval = setInterval(() => {
                next();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [hovering, fetchedTestimonials]);

    return (
        <section className="bg-[#0f1b3d] text-[#f2eee9] py-20 px-6">
            <div className="flex flex-col items-center max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-heading font-semibold text-[#d7bd88] mb-12">
                    What Our Writers Say
                </h2>

                {loading ? (
                    <TestimonialSkeleton />
                ) : fetchedTestimonials.length > 0 ? (
                    <div
                        className="relative group w-full md:w-[60%]"
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                    >
                        <div className="bg-[#1c2e5b] rounded-xl shadow-xl p-8 transition-transform transform hover:scale-[1.02] duration-300">
                            <img
                                src={fetchedTestimonials[index].image}
                                alt={fetchedTestimonials[index].name}
                                className="w-16 h-16 mx-auto rounded-full object-cover border-2 border-[#d7bd88] mb-4"
                            />
                            <p className="text-lg italic mb-4">
                                "{fetchedTestimonials[index].message}"
                            </p>
                            <h4 className="font-semibold text-[#d7bd88]">
                                {fetchedTestimonials[index].name}
                            </h4>
                        </div>

                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={prev}
                                className="p-2 border border-[#d7bd88]/30 rounded-full hover:bg-[#d7bd88]/10"
                            >
                                <ChevronLeft className="text-[#d7bd88]" />
                            </button>
                            <button
                                onClick={next}
                                className="p-2 border border-[#d7bd88]/30 rounded-full hover:bg-[#d7bd88]/10"
                            >
                                <ChevronRight className="text-[#d7bd88]" />
                            </button>
                        </div>
                    </div>
                ) : error ? (
                    <p className="text-red-500">Failed to load testimonials.</p>
                ) : (
                    <p className="text-[#d7bd88]">No testimonials available yet.</p>
                )}

                <div className="mt-12 text-sm text-gray-400">
                    <p>Join our community and share your poetry with the world!</p>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
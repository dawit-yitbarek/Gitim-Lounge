import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="bg-[#10214b] text-[#ebe7e1] min-h-screen px-6 sm:px-12 py-16">
            <div className="max-w-5xl mx-auto">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl font-bold text-[#d7bd88] mb-10 text-center">
                    About ግጥም Lounge
                </h1>

                {/* Mission */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-[#d0c3ba] mb-4">Our Mission</h2>
                    <p className="leading-relaxed text-[#ebe7e1]">
                        At ግጥም Lounge, our mission is to create a digital space where Ethiopian poets can
                        freely express themselves, connect with readers, and contribute to a thriving literary
                        community. We believe in the power of words to inspire, heal, and unite.
                    </p>
                </section>

                {/* What We Offer */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-[#d0c3ba] mb-4">What We Offer</h2>
                    <ul className="list-disc pl-6 space-y-3 text-[#ebe7e1]">
                        <li>A public platform to share your original poems with the world.</li>
                        <li>A rich collection of Ethiopian poetry for readers to explore and enjoy.</li>
                        <li>An easy-to-use interface for writing and managing your poems.</li>
                        <li>A community where writers and readers connect meaningfully.</li>
                    </ul>
                </section>

                {/* Vision */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-[#d0c3ba] mb-4">Our Vision</h2>
                    <p className="leading-relaxed text-[#ebe7e1]">
                        We envision a digital literary house — a "ግጥም Lounge" — where stories, thoughts,
                        and poetic voices echo freely. A space that champions creativity and gives voice to
                        both emerging and seasoned Ethiopian poets.
                    </p>
                </section>

                {/* Call to Action */}
                <section className="text-center mt-16">
                    <h3 className="text-xl font-medium text-[#d7bd88] mb-4">
                        Want to join the movement?
                    </h3>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link
                            to="/profile#poemForm"
                            className="bg-[#d7bd88] text-[#10214b] px-6 py-2 rounded-full font-medium hover:bg-[#c9af76] transition"
                        >
                            Publish Your Poem
                        </Link>
                        <Link
                            to="/collection"
                            className="border border-[#d7bd88] text-[#d7bd88] px-6 py-2 rounded-full font-medium hover:bg-[#d7bd88] hover:text-[#10214b] transition"
                        >
                            Browse Poems
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};
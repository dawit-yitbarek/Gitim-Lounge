import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-950 to-blue-800 text-white py-20 px-6 md:px-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Words Matter.</h2>
        <p className="text-lg md:text-xl mb-8">
          Join our growing community of poets and let your voice echo in the hearts of readers.
        </p>
        <a
          href="/profile#poemForm"
          className="inline-block bg-white text-blue-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Share Your Poem
        </a>
      </div>
    </section>
  );
};
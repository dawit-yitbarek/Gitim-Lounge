import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-t from-[#10214B] via-[#d0c3ba] to-[#EBE7E1] md:bg-gradient-to-br md:from-[#10214B] md:via-[#d0c3ba] md:to-[#EBE7E1] text-white py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16">

        {/* Text Content */}
        <div className="relative flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-[#ebe7e1] leading-tight drop-shadow-md">
            A Place for Every Poem and Every Voice
          </h1>
          <p className="text-base md:text-lg mb-8 text-[#f5f5f5] drop-shadow-md leading-relaxed">
            Share your own poems or discover heartfelt verses from people around the world. 
            A community where words connect us all.
          </p>

          <Link to="/collection">
            <button className="bg-[#d7bd88] text-[#10214b] px-6 py-3 rounded-md font-semibold hover:bg-[#c6aa6c] transition shadow-md">
              Start Reading
            </button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="flex-1">
          <div className="relative w-full max-w-md mx-auto">
            <img
              src="/images/hero.webp"
              alt="Public Poetry Platform"
              className="rounded-3xl shadow-2xl object-cover w-full h-auto"
            />
            <div className="absolute -inset-4 bg-[#D7BD88]/10 rounded-[36px] blur-3xl z-[-1]"></div>
          </div>
        </div>
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#D7BD88]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl"></div>
    </section>
  );
}
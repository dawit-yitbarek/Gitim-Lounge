import React from "react";
import { Pencil, Users, BookOpen, UploadCloud } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            icon: <Users className="w-8 h-8 text-[#d7bd88]" />,
            title: "1. Create Account",
            desc: "Sign up to join our growing community of poets and readers.",
        },
        {
            icon: <Pencil className="w-8 h-8 text-[#d7bd88]" />,
            title: "2. Write or Upload Poem",
            desc: "Craft your own poems or upload written ones — express freely.",
        },
        {
            icon: <UploadCloud className="w-8 h-8 text-[#d7bd88]" />,
            title: "3. Share With the World",
            desc: "Publish your poem to be discovered, appreciated, and shared.",
        },
        {
            icon: <BookOpen className="w-8 h-8 text-[#d7bd88]" />,
            title: "4. Read & Explore",
            desc: "Dive into poems shared by others — read anytime, anywhere.",
        },
    ];

    return (
        <section className="bg-[#10214b] text-[#ebe7e1] px-6 py-16">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-heading font-semibold text-[#d7bd88] mb-12">
                    How It Works
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-[#1a2d5a] p-6 rounded-xl shadow-lg border border-[#d0c3ba]/10 hover:scale-105 transition-transform"
                        >
                            <div className="mb-4">{step.icon}</div>
                            <h3 className="text-xl font-bold text-[#d7bd88] mb-2">
                                {step.title}
                            </h3>
                            <p className="text-[#d0c3ba]">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
export const PoemCard = () => {
    return (
        <div className="bg-[#1B2B52] rounded-xl shadow-md p-6 animate-pulse">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#2C3A5F]" />
                <div className="flex flex-col gap-2 w-full">
                    <div className="h-3 w-24 bg-[#2C3A5F] rounded" />
                </div>
            </div>

            <div className="h-4 bg-[#2C3A5F] rounded w-3/4 mb-3" />
            <div className="h-3 bg-[#2C3A5F] rounded w-full mb-2" />
            <div className="h-3 bg-[#2C3A5F] rounded w-5/6 mb-4" />

            <div className="flex justify-between items-center">
                <div className="w-24 h-8 bg-[#2C3A5F] rounded" />
                <div className="w-10 h-4 bg-[#2C3A5F] rounded" />
            </div>
        </div>
    );
};

export const TestimonialSkeleton = () => (
    <div className="relative group w-full md:w-[60%] animate-pulse">
        <div className="bg-[#1c2e5b] rounded-xl shadow-xl p-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#2c3e70] mb-4" />
            <div className="h-4 bg-[#2c3e70] rounded mb-3 w-4/5 mx-auto" />
            <div className="h-4 bg-[#2c3e70] rounded mb-3 w-3/4 mx-auto" />
            <div className="h-4 bg-[#2c3e70] rounded mb-6 w-2/3 mx-auto" />
            <div className="h-4 bg-[#2c3e70] rounded w-1/3 mx-auto" />
        </div>

        <div className="flex justify-center gap-4 mt-6">
            <div className="w-10 h-10 rounded-full border border-[#d7bd88]/30 bg-[#2c3e70]" />
            <div className="w-10 h-10 rounded-full border border-[#d7bd88]/30 bg-[#2c3e70]" />
        </div>
    </div>
);

export const ProfileCardSkeleton = () => {
    return (
        <div className="rounded-xl shadow-lg p-6 space-y-4" style={{ backgroundColor: "#d0c3ba" }}>
            <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-[#d7bd88] animate-shimmer bg-[linear-gradient(90deg,#d7bd88_25%,#ebe7e1_50%,#d7bd88_75%)] bg-[length:400%_100%]"></div>

                <div className="flex-1 space-y-3">
                    <div className="w-32 h-8 rounded bg-[#ebe7e1] animate-shimmer bg-[linear-gradient(90deg,#ebe7e1_25%,#d0c3ba_50%,#ebe7e1_75%)] bg-[length:400%_100%]"></div>
                    <div className="w-full h-10 rounded bg-[#ebe7e1] animate-shimmer bg-[linear-gradient(90deg,#ebe7e1_25%,#d0c3ba_50%,#ebe7e1_75%)] bg-[length:400%_100%]"></div>


                    <div className="w-24 h-10 mt-2 rounded bg-[#d7bd88] animate-shimmer bg-[linear-gradient(90deg,#d7bd88_25%,#ebe7e1_50%,#d7bd88_75%)] bg-[length:400%_100%]"></div>
                </div>
            </div>
        </div>
    );
};

export const MyPoemSkeleton = () => {
    return (
        <div className="bg-[#ebe7e1] rounded-xl p-5 shadow-inner space-y-3 border border-[#d7bd88] animate-pulse">
            <div className="flex justify-between items-start">
                <div className="w-1/3 h-6 bg-[#d0c3ba] rounded"></div>
                <div className="text-right space-y-2">
                    <div className="w-24 h-4 bg-[#d0c3ba] rounded"></div>
                    <div className="flex items-center justify-end gap-2">
                        <div className="w-6 h-6 bg-[#d0c3ba] rounded-full"></div>
                        <div className="w-6 h-4 bg-[#d0c3ba] rounded"></div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <div className="w-28 h-4 bg-[#d0c3ba] rounded"></div>
            </div>
        </div>
    );
};


export const ReadingPageSkeleton = () => {
    const Skeleton = ({ className }) => (
        <div
            className={`animate-pulse bg-[#2c3e50] rounded ${className}`}
        />
    );


    return (
        <div className="w-full flex min-h-screen bg-[#10214b] text-[#ebe7e1] relative">
            {/* Sidebar Skeleton */}
            <aside className="bg-[#0d1836] border-r border-[#1c2a4b] p-6 w-64 min-h-screen overflow-y-auto hidden md:block">
                <div className="flex flex-col items-center mb-8 mt-14">
                    <Skeleton className="w-20 h-20 rounded-full border-2 border-[#d7bd88]" />
                    <Skeleton className="mt-4 w-24 h-4" />
                </div>

                <ul className="space-y-3">
                    {Array(5).fill(0).map((_, idx) => (
                        <Skeleton key={idx} className="w-full h-8" />
                    ))}
                </ul>
            </aside>

            {/* Main Content Skeleton */}
            <main className="flex-1 items-center px-6 py-12 overflow-y-auto w-full ">
                <div className="flex flex-col justify-center items-center max-w-3xl w-full mx-auto space-y-8">
                    <Skeleton className="w-48 h-8" />
                    <div className="flex flex-col justify-center items-center space-y-4 w-full">
                        {Array(8).fill(0).map((_, idx) => (
                            <Skeleton key={idx} className="h-6 w-full md:w-1/2" />
                        ))}
                    </div>

                    {/* Like/Share Buttons Skeleton */}
                    <div className="flex gap-4 mt-6">
                        <Skeleton className="h-10 w-28 rounded-full" />
                        <Skeleton className="h-10 w-28 rounded-full" />
                    </div>
                </div>
            </main>
        </div>
    );
};


export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#10214b] text-[#ebe7e1] px-4">
            <h1 className="text-9xl font-bold text-[#d7bd88]">404</h1>
            <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
            <p className="mt-2 max-w-md text-center text-[#d0c3ba]">
                It seems this page wandered off the poetry book.
                Perhaps you’d like to return to safer verses?
            </p>
            <a
                href="/"
                className="mt-6 px-6 py-3 rounded-md bg-[#d7bd88] text-[#10214b] font-medium hover:bg-[#c5ab74] transition-colors"
            >
                Back to Home
            </a>
        </div>
    );
}
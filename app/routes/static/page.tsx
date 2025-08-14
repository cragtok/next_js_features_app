export default function Page() {
    return (
        <div className="flex flex-col pt-10 gap-8 items-center">
            <h1 className="text-brand-700 font-extrabold text-4xl text-center">
                Static Route
            </h1>

            <p className="text-brand-500 max-w-prose">
                This is a page routed using a simple static route{" "}
                <span className="text-accent-500 font-semibold whitespace-nowrap">
                    /routes/static
                </span>
                . It was made by creating an{" "}
                <span className="text-accent-500 font-semibold whitespace-nowrap">
                    /app/routes/static
                </span>{" "}
                folder containing a{" "}
                <span className="text-accent-500 font-semibold whitespace-nowrap">
                    page.tsx
                </span>{" "}
                file.
            </p>
        </div>
    );
}

import FolderStructureCards from "../FolderStructureCards";

export default function Page() {
    return (
        <div className="flex flex-col pt-10 gap-8 items-center max-sm:text-sm">
            <h1 className="text-brand-700 font-extrabold text-4xl text-center">
                Static Routing
            </h1>

            <section>
                <p className="text-brand-500 max-w-prose">
                    This page is routed using a simple static route{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        /routes/static
                    </span>
                    . In the Next.js App Router, static routes are defined by
                    creating a folder structure within the{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        app
                    </span>{" "}
                    directory, where each nested folder represents a segment of
                    the URL path, and a{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        page.tsx
                    </span>{" "}
                    file inside the innermost folder makes that route segment
                    publicly accessible.
                </p>
            </section>

            <section className="flex flex-col gap-6 pb-10">
                <h2 className="text-brand-700 font-extrabold text-2xl text-center">
                    Folder Structure For This Page
                </h2>

                <p className="text-brand-500 max-w-prose">
                    The page for this route was made by creating an{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        app/routes/static/page.tsx
                    </span>{" "}
                    file. You can see that the{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        /routes/static
                    </span>{" "}
                    part of the file path appears in the URL route.
                </p>

                <div className="text-sm">
                    <FolderStructureCards
                        folderPath={["app", "routes", "static", "page.tsx"]}
                    />
                </div>
            </section>
        </div>
    );
}

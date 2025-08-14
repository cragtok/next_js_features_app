export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <div className="flex flex-col pt-10 gap-8 items-center">
            <h1 className="text-brand-700 font-extrabold text-4xl text-center">
                Dynamic Route
            </h1>

            <span className="text-accent-500 font-semibold whitespace-nowrap">
                {slug}
            </span>
        </div>
    );
}

import SiteLinks from "./SiteLinks";

export default function Page() {
    return (
        <>
            <div className="flex flex-col pt-10 gap-8 items-center text-center">
                <h1 className="text-brand-700 font-extrabold text-4xl">
                    Next.js Features App
                </h1>
                <p className="text-brand-500 max-w-md">
                    This project demonstrates various features of Next.js. All
                    features are fully working. Just click on a link to see a
                    feature in action.
                </p>
            </div>

            <div className="max-w-screen-md md:mx-auto mt-15">
                <SiteLinks />
            </div>
        </>
    );
}

import Link from 'next/link';

export default function Page() {
    return (
        <div className="flex flex-col items-stretch gap-4 text-center">
            <div className="border-amber-300 border-4">
                <h3>Routing</h3>
                <div className="flex flex-col gap-2">
                    <Link href="/routes/basic" className="text-blue-600 hover:underline">Basic Routing</Link>
                    <Link href="/routes/dynamic/hello-world" className="text-blue-600 hover:underline">Dynamic Routing</Link>
                </div>
            </div>

            <div className="border-amber-300 border-4">
                <h3>Rendering and Data Fetching</h3>
                <div className="flex flex-col gap-2">
                    <Link href="/rendering/ssr" className="text-blue-600 hover:underline">Server Side Rendering (SSR)</Link>
                    <Link href="/rendering/ssg" className="text-blue-600 hover:underline">Static Site Generation (SSG)</Link>
                    <Link href="/rendering/isr" className="text-blue-600 hover:underline">Incremental Static Regeneration (ISR)</Link>
                    <Link href="/rendering/csr" className="text-blue-600 hover:underline">Client Side Rendering (CSR)</Link>
                </div>
            </div>

            <div className="border-amber-300 border-4">
                <h3>Streaming</h3>
                <div className="flex flex-col gap-2">
                    <Link href="/streaming" className="text-blue-600 hover:underline">Streaming</Link>
                </div>
            </div>

            <div className="border-amber-300 border-4">
                <h3>Server Actions</h3>
                <div className="flex flex-col gap-2">
                    <Link href="/server-action" className="text-blue-600 hover:underline">Server Action</Link>
                </div>
            </div>

            <div className="border-amber-300 border-4">
                <h3>Middleware</h3>
                <div className="flex flex-col gap-2">
                    <Link href="/middleware/ab-testing" className="text-blue-600 hover:underline">A/B Testing</Link>
                    <Link href="/middleware/log" className="text-blue-600 hover:underline">Request Info Logging</Link>
                </div>
            </div>

            <div className="border-amber-300 border-4">
                <h3>Route Handlers</h3>
                <div className="flex flex-col gap-2">
                    <Link href="/route-handlers/GET" className="text-blue-600 hover:underline">GET Request</Link>
                    <Link href="/route-handlers/POST" className="text-blue-600 hover:underline">POST Request</Link>
                </div>
            </div>
        </div>
    );
}

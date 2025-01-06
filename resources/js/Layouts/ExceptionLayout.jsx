import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import { themeChange } from "theme-change";

export default function Exception({ status, title, description }) {
    useEffect(() => {
        themeChange(false);
    }, []);
    return (
        <div className="hero bg-base-200 min-h-screen">
            <Head title={title} />
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold">{status} {title}</h1>
                    <p className="py-6">{description}</p>
                    <button
                        onClick={() => window.history.back()}
                        class="btn btn-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                        Back</button>
                </div>
            </div>
        </div>
    );
}

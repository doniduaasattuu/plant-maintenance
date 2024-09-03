import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import { themeChange } from "theme-change";

export default function Exception({ title, description }) {
    useEffect(() => {
        themeChange(false);
    }, []);
    return (
        <div className="hero bg-base-200 min-h-screen">
            <Head title="Error" />
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">{title}</h1>
                    <p className="py-6">{description}</p>
                    <button
                        onClick={() => {
                            router.get(route("dashboard"));
                        }}
                        className="btn btn-primary"
                    >
                        Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

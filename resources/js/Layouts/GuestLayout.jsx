import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";
import { themeChange } from "theme-change";

export default function Guest({ children }) {
    useEffect(() => {
        themeChange(false);
    }, []);
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 sm:px-6 lg:px-8">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg bg-base-200">
                {children}
            </div>
        </div>
    );
}

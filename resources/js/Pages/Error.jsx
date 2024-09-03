import Exception from "@/Layouts/ExceptionLayout";
import { Head, router } from "@inertiajs/react";
import { useMemo } from "react";

export default function Error({ status }) {
    const title = useMemo(() => {
        return (
            {
                404: "Page Not Found",
                403: "Forbidden",
                419: "Page Expired",
            }[status] || "An Error Occurred"
        );
    }, [status]);

    const description = useMemo(() => {
        return (
            {
                404: "The page you are looking for does not exist.",
                403: "You are not allowed to perform this action.",
                419: "Session has expired.",
            }[status] || "An Error Occurred"
        );
    }, [status]);
    return <Exception title={title} description={description} />;
}

// <GuestLayout>
//     <Head title={title} />
//     <div class="mb-4 font-medium text-sm text-red-600">
//         {description}
//     </div>
// </GuestLayout>

import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Toastify() {
    const page = usePage();

    useEffect(() => {
        if (page?.props?.message?.body) {
            toast(page?.props?.message?.body, {
                type: page.props.message.type,
                duration: 1500,
            });
        }
    }, [page?.props?.message?.body]);

    return (
        <>
            <Toaster />
        </>
    );
}

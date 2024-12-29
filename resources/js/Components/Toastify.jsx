import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Toastify() {
    const page = usePage();

    useEffect(() => {
        if (page?.props?.message?.body && page.props.message != null) {
            toast(page?.props?.message?.body, {
                type: page.props.message.type,
                position: "bottom-right",
            });
        }
    }, [page.props.message]);

    return (
        <>
            <Toaster />
        </>
    );
}

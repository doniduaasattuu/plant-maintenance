import { router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function Toastify({ toast }) {
    const page = usePage();

    useEffect(() => {
        if (page?.props?.message?.body) {
            toast(page.props.message.body, {
                type: page.props.message.type,
                duration: 1500,
            });
        }
    }, [page.props.message]);

    return (
        <>
            <Toaster />
        </>
    );
}

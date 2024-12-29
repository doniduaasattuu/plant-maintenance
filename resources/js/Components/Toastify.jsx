import { usePage } from "@inertiajs/react";
import { useRef } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Toastify({ message, isMobile }) {
    useEffect(() => {
        if (message.body && message.body != undefined && message.body != null) {
            toast(message.body, {
                type: message.type,
                position: isMobile() ? "top-center" : "bottom-right",
            });
        }

        message.body = null;
    });

    return <Toaster />;
}

import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { isMobile } from "@/Utils/Helper";

export default function Toastify({ message }) {
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

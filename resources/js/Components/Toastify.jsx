import { router, usePage } from "@inertiajs/react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Toastify() {
    const page = usePage();

    useEffect(() => {
        if (page?.props?.message?.body) {
            toast(page?.props?.message?.body, {
                type: page.props.message.type,
            });
        }
    }, [page?.props?.message]);

    return (
        <>
            <Toaster />
        </>
    );
}

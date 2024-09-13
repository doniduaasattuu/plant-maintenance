import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function QRScanner({ auth, can }) {
    function waitForElement(id) {
        return new Promise((resolve) => {
            const observer = new MutationObserver((mutations) => {
                if (document.getElementById(id)) {
                    resolve(document.getElementById(id));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    }

    useEffect(() => {
        waitForElement("qr-reader").then((element) => {
            const imageOnTopRight =
                element.firstElementChild.firstElementChild.nextSibling;
            imageOnTopRight.style.display = "none";
        });

        // Initialize the scanner
        const html5QrCodeScanner = new Html5QrcodeScanner(
            "qr-reader",
            {
                fps: 10, // Frames per second for the scanner
                qrbox: { width: 300, height: 250 }, // QR scanning box dimensions
            },
            false
        );

        function onScanSuccess(decodedText, decodedResult) {
            router.get(route("equipments.show", decodedText.substr(0, 9)));
            html5QrCodeScanner.clear();
        }

        html5QrCodeScanner.render(onScanSuccess);
    }, []);

    return (
        <div className="space-y-4 mx-3">
            <h1 className="font-semibold text-lg">Equipment QR Code Scanner</h1>
            <div
                className="mx-auto text-center shadow border border-neutral-600/40"
                id="qr-reader"
            />
        </div>
    );
}

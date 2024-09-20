import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";
import React from "react";
import { useState } from "react";

export default function Header({ can, equipment_id, exportLink, table }) {
    const [loading, setLoading] = useState(false);

    // EXPORT DATA USERS
    const exportFunction = () => {
        setLoading(true);

        axios({
            url: route(exportLink, equipment_id), // Laravel named route
            method: "GET",
            responseType: "blob", // Important for file download
        })
            .then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute(
                    "download",
                    `${table}-checks-${equipment_id}.xlsx`
                ); // Filename for download
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.error("Export failed:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="font-semibold text-xl leading-tight">
                        Equipment Trend
                    </h2>

                    <p className="mt-1 text-sm">
                        Records of equipment {equipment_id}
                    </p>
                </div>
                {can.export && exportLink && (
                    <div
                        className="tooltip tooltip-left"
                        data-tip="Export to excel"
                    >
                        <PrimaryButton
                            onClick={exportFunction}
                            disabled={loading}
                        >
                            Export
                        </PrimaryButton>
                    </div>
                )}
            </div>
        </>
    );
}

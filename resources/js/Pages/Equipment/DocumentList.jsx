import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { Link, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import AsyncSelect from "react-select/async";

export default function DocumentList({ can, equipment }) {

    // HANDLE PDF
    function handleViewPdf(id) {
        window.open(`/documents/${id}`);
        // window.open(`/storage/${path}`, "_blank");
        // router.get(route("documents.show", id));
    }

    return (
        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
            <section className="max-w-xl">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-medium">
                            Documents
                        </h2>

                        <p className="mt-1 text-sm">
                            A list of related documents that used in this equipment.
                        </p>
                    </div>

                </div>

                <ul className="menu bg-base-200 rounded-box p-0 mt-6 mx-0">
                    {equipment.data.documents.map((document) => {
                        return (
                            <li key={document.id}>
                                <div className="text-ellipsis overflow-hidden ">
                                    {can.document_show ? (
                                        <div
                                            onClick={() => {
                                                handleViewPdf(
                                                    document.id
                                                );
                                            }}
                                            className={
                                                `font-bold flex justify-between border ` +
                                                    can.document_show
                                                    ? "underline underline-offset-2 hover:text-blue-500 cursor-pointer"
                                                    : null
                                            }
                                        >
                                            {document.title}
                                        </div>
                                    ) : (
                                        <div>{document.title}</div>
                                    )}

                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div>
    );
}

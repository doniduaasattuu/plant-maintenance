import InputLabel from "@/Components/InputLabel";
import ModalConfirm from "@/Components/ModalConfirm";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function Index({ auth, can, documents }) {
    const initialRender = useRef(true);
    const urlParams = new URLSearchParams(window.location.search);
    const [selectedMeasurement, setSelectedMeasurement] = useState("");
    const [inputSearch, setInputSearch] = useState(
        urlParams.get("search") ?? ""
    );
    const [searchTerm, setSearchTerm] = useState(urlParams.get("search") ?? "");

    let documentUrl = useMemo(() => {
        const url = new URL(route("documents.index"));

        if (searchTerm) {
            url.searchParams.append("search", searchTerm);
        }

        if (selectedMeasurement) {
            url.searchParams.append("measurement", selectedMeasurement);
        }

        return url.href;
    }, [searchTerm, selectedMeasurement]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        router.visit(documentUrl, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }, [documentUrl]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchTerm(inputSearch);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [inputSearch]);

    // DELETE DOCUMENT
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);
    const [url, setUrl] = useState(null);
    const [method, setMethod] = useState(null);
    const [message, setMessage] = useState(null);
    const [actionMessage, setActionMessage] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openDeleteConfirm = (id) => {
        setSelectedDocumentId(id);
        setUrl("documents.destroy");
        setMethod("delete");
        setMessage(
            "Once this document is deleted, the document cannot seen anymore."
        );
        setActionMessage("delete");
        setIsOpen(true);
    };

    // HANDLE PDF
    function handleViewPdf(id) {
        window.open(`/documents/${id}`);
        // window.open(`/storage/${path}`, "_blank");
        // router.get(route("documents.show", id));
    }

    // EDIT DOCUMENT
    function editDocument(id) {
        router.get(route("documents.edit", id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-xl leading-tight">
                                Document List
                            </h2>

                            <p className="mt-1 text-sm">
                                A list of all the documents.
                            </p>
                        </div>
                        <div>
                            {can.document_create && (
                                <Link href={route("documents.create")}>
                                    <PrimaryButton>Create new</PrimaryButton>
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            }
        >
            <Head title="Documents" />

            <ModalConfirm
                isOpen={isOpen}
                closeModal={closeModal}
                id={selectedDocumentId}
                message={message}
                actionMessage={actionMessage}
                method={method}
                url={url}
            />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="grid sm:grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                        <div>
                            <InputLabel htmlFor="search" value="Search" />
                            <TextInput
                                id="search"
                                className="mt-1 block w-sm"
                                value={inputSearch}
                                onChange={(e) => setInputSearch(e.target.value)}
                                placeholder="Search document data..."
                            />
                        </div>
                        {/* <div>
                            <InputLabel
                                htmlFor="measurement"
                                value="Measurement"
                            />
                            <SelectInput
                                id="measurement"
                                className="mt-1 block w-sm"
                                withSelectName={true}
                                selectName={"All"}
                                value={selectedMeasurement}
                                onChange={(e) => {
                                    setSelectedMeasurement(e.target.value);
                                }}
                                options={unitOfMeasurements}
                            />
                        </div> */}
                    </div>
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="table min-w-max">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Uploaded by</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.data.map((document) => {
                                        return (
                                            <tr
                                                className="border-b-base-300"
                                                key={document.id}
                                            >
                                                <td>
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
                                                        <div>
                                                            {document.title}
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    {
                                                        document.uploaded_by
                                                            ?.full_name
                                                    }
                                                </td>
                                                {(can.document_edit ||
                                                    document.canUpdate) && (
                                                    <td
                                                        onClick={() => {
                                                            editDocument(
                                                                document.id
                                                            );
                                                        }}
                                                        className="w-12 text-center text-blue-500 cursor-pointer"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className="size-5"
                                                        >
                                                            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                                                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                                                        </svg>
                                                    </td>
                                                )}
                                                {(can.document_delete ||
                                                    document.canDelete) && (
                                                    <td
                                                        onClick={() =>
                                                            openDeleteConfirm(
                                                                document.id
                                                            )
                                                        }
                                                        className="w-12 text-center text-red-500 cursor-pointer"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className="size-5"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </td>
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {documents.meta.links.length > 3 && (
                        <Pagination meta={documents.meta} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

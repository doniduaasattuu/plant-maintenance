import InputLabel from "@/Components/InputLabel";
import ModalConfirm from "@/Components/ModalConfirm";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { rupiah } from "@/Utils/Helper";
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
            <Head title="documents" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
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
                                        const documentUrl = route(
                                            "documents.show",
                                            document.attachment
                                        );

                                        return (
                                            <tr
                                                className="border-b-base-300"
                                                key={document.id}
                                            >
                                                <td>
                                                    {can.document_show ? (
                                                        <Link
                                                            href={documentUrl}
                                                            className={
                                                                `font-bold flex justify-between border ` +
                                                                can.document_show
                                                                    ? "underline underline-offset-2 hover:text-blue-500"
                                                                    : null
                                                            }
                                                        >
                                                            {document.title}
                                                        </Link>
                                                    ) : (
                                                        <div>{document.title}</div>
                                                    )}
                                                </td>
                                                <td>{document.uploaded_by?.full_name}</td>
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

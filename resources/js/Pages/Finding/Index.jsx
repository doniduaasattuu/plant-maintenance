import InputLabel from "@/Components/InputLabel";
import ModalConfirm from "@/Components/ModalConfirm";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { isMobile } from "@/Utils/Helper";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Index({ auth, can, findings, findingStatuses }) {
    const initialRender = useRef(true);
    const urlParams = new URLSearchParams(window.location.search);
    const [selectedStatus, setSelectedStatus] = useState(
        urlParams.get("finding_status_id") ?? ""
    );
    const [inputSearch, setInputSearch] = useState(
        urlParams.get("search") ?? ""
    );
    const [searchTerm, setSearchTerm] = useState(urlParams.get("search") ?? "");

    let findingUrl = useMemo(() => {
        const url = new URL(route("findings.index"));

        if (searchTerm) {
            url.searchParams.append("search", searchTerm);
        }

        if (selectedStatus) {
            url.searchParams.append("finding_status_id", selectedStatus);
        }

        return url.href;
    }, [searchTerm, selectedStatus]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        router.visit(findingUrl, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }, [findingUrl]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchTerm(inputSearch);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [inputSearch]);

    findingStatuses = findingStatuses.data.map((status) => {
        return {
            value: status.id,
            label: status.keyword,
        };
    });

    // DELETE FINDING
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFindingId, setSelectedFindingId] = useState(null);
    const [url, setUrl] = useState(null);
    const [method, setMethod] = useState(null);
    const [message, setMessage] = useState(null);
    const [actionMessage, setActionMessage] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openDeleteConfirm = (id) => {
        setSelectedFindingId(id);
        setUrl("findings.destroy");
        setMethod("delete");
        setMessage(
            "Once this finding is deleted, the finding deleted permanently."
        );
        setActionMessage("delete");
        setIsOpen(true);
    };

    // EDIT FINDING
    function editFinding(id) {
        router.get(route("findings.edit", id));
    }

    // HANDLE ATTACHMENT
    function handleAttachment(path) {
        window.open("/storage/" + path);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-xl leading-tight">
                                Finding List
                            </h2>

                            <p className="mt-1 text-sm">
                                A list of all the findings.
                            </p>
                        </div>
                        <div>
                            {can.finding_create && (
                                <Link href={route("findings.create")}>
                                    <PrimaryButton>Create new</PrimaryButton>
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            }
        >
            <Head title="Findings" />

            <ModalConfirm
                isOpen={isOpen}
                closeModal={closeModal}
                id={selectedFindingId}
                message={message}
                actionMessage={actionMessage}
                method={method}
                url={url}
            />

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
                                placeholder="Search finding data..."
                                isFocused={!isMobile()}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="status" value="Status" />
                            <SelectInput
                                id="status"
                                className="mt-1 block w-sm"
                                withSelectName={true}
                                selectName={"All"}
                                value={selectedStatus}
                                onChange={(e) => {
                                    setSelectedStatus(e.target.value);
                                }}
                                options={findingStatuses}
                            />
                        </div>
                    </div>
                    <div className="p-4 sm:p-4 bg-base-200 shadow sm:rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
                            {findings.data.map((finding) => {
                                return (
                                    <div className="card bg-base-100 w-auto shadow-xl rounded-box space-y-2">
                                        {finding.attachments.length < 1 ? (
                                            <div className="carousel rounded-t-box p-3">
                                                <img
                                                    className="carousel-item w-full h-52 object-cover"
                                                    src={`/storage/assets/photos/users/person.png`}
                                                />
                                            </div>
                                        ) : (
                                            <div className="carousel rounded-t-box relative">
                                                {finding.attachments.map(
                                                    (attachment) => (
                                                        <img
                                                            className="carousel-item object-cover h-64 sm:h-52 w-full"
                                                            src={`/storage/${attachment.file_path}`}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                        <div className="card-body p-4 space-y-2">
                                            <h2 className="card-title">
                                                {finding.equipment_id}
                                                <div
                                                    className={`badge rounded-box ${
                                                        finding.finding_status
                                                            .keyword === "Open"
                                                            ? " badge-secondary"
                                                            : " badge-primary"
                                                    }`}
                                                >
                                                    {
                                                        finding.finding_status
                                                            .keyword
                                                    }
                                                </div>
                                            </h2>
                                            <p>{finding.description}</p>
                                            <div className="card-actions justify-end space-x-2">
                                                <div
                                                    onClick={() => {
                                                        editFinding(finding.id);
                                                    }}
                                                    className="text-center text-blue-500 cursor-pointer"
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
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        openDeleteConfirm(
                                                            finding.id
                                                        )
                                                    }
                                                    className="text-center text-red-500 cursor-pointer"
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {findings.meta.links.length > 3 && (
                        <Pagination meta={findings.meta} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

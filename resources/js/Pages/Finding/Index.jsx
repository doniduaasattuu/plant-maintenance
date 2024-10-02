import InputLabel from "@/Components/InputLabel";
import ModalConfirm from "@/Components/ModalConfirm";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function Index({ auth, can, findings, findingStatuses }) {
    const initialRender = useRef(true);
    const urlParams = new URLSearchParams(window.location.search);
    const [selectedStatus, setSelectedStatus] = useState("");
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
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="table min-w-max">
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Description</th>
                                        <th>Before</th>
                                        <th>After</th>
                                        <th>Reported by</th>
                                        <th>Date created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {findings.data.map((finding) => {
                                        if (
                                            finding.attachment_after ==
                                            finding.attachment_before
                                        ) {
                                            console.log(finding.description);
                                        }

                                        return (
                                            <tr
                                                className="border-b-base-300"
                                                key={finding.id}
                                            >
                                                {/* {finding.finding_status.id == 2 ? 'text-green-500' : 'text-red-500'} */}
                                                <td
                                                    className={`w-24 ${
                                                        finding.finding_status
                                                            .id == 2
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                    }`}
                                                >
                                                    {
                                                        finding.finding_status
                                                            ?.keyword
                                                    }
                                                </td>
                                                <td>{finding.description}</td>
                                                {/* <td>{finding.attachment_before}</td>
                                                <td>{finding.attachment_after}</td> */}
                                                <td
                                                    className={`${
                                                        finding.attachment_before
                                                            ? "cursor-pointer"
                                                            : undefined
                                                    }`}
                                                    onClick={(e) =>
                                                        finding.attachment_before
                                                            ? handleAttachment(
                                                                  finding.attachment_before
                                                              )
                                                            : undefined
                                                    }
                                                >
                                                    {finding.attachment_before && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className="size-5"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    )}
                                                </td>
                                                <td
                                                    className={`${
                                                        finding.attachment_after
                                                            ? "cursor-pointer"
                                                            : undefined
                                                    }`}
                                                    onClick={(e) =>
                                                        finding.attachment_after
                                                            ? handleAttachment(
                                                                  finding.attachment_after
                                                              )
                                                            : undefined
                                                    }
                                                >
                                                    {finding.attachment_after && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            className="size-5"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    )}
                                                </td>
                                                <td>
                                                    {
                                                        finding.reported_by
                                                            ?.full_name
                                                    }
                                                </td>
                                                <td>{finding.created_at}</td>
                                                {(can.finding_edit ||
                                                    finding.canUpdate) && (
                                                    <td
                                                        onClick={() => {
                                                            editFinding(
                                                                finding.id
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
                                                {(can.finding_delete ||
                                                    finding.canDelete) && (
                                                    <td
                                                        onClick={() =>
                                                            openDeleteConfirm(
                                                                finding.id
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

                                                {/* <td className="w-24">
                                                    {can.finding_show ? (
                                                        <Link
                                                            href={findingUrl}
                                                            className={
                                                                `font-bold flex justify-between border ` +
                                                                    can.finding_show
                                                                    ? "underline underline-offset-2 hover:text-blue-500"
                                                                    : null
                                                            }
                                                        >
                                                            {finding.id}
                                                        </Link>
                                                    ) : (
                                                        <div>{finding.id}</div>
                                                    )}
                                                </td>
                                                <td>{finding.title}</td>
                                                <td>
                                                    {
                                                        finding
                                                            .unit_of_status
                                                            ?.keyword
                                                    }
                                                </td>
                                                <td>
                                                    {rupiah(finding.price)}
                                                </td> */}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
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

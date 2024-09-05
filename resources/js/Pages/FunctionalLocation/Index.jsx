import InputLabel from "@/Components/InputLabel";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Index({ auth, can, functional_locations }) {
    const initialRender = useRef(true);
    const urlParams = new URLSearchParams(window.location.search);
    const [inputSearch, setInputSearch] = useState(
        urlParams.get("search") ?? ""
    );
    const [searchTerm, setSearchTerm] = useState(urlParams.get("search") ?? "");
    const [orderBy, setOrderBy] = useState(urlParams.get("order_by") ?? "");
    const [sortBy, setSortBy] = useState(urlParams.get("sort_by") ?? "");

    let functional_locationUrl = useMemo(() => {
        const url = new URL(route("functional-locations.index"));

        if (searchTerm) {
            url.searchParams.append("search", searchTerm);
        }

        if (orderBy) {
            url.searchParams.append("order_by", orderBy);
        }

        if (sortBy) {
            url.searchParams.append("sort_by", sortBy);
        }

        return url.href;
    }, [searchTerm, orderBy, sortBy]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        router.visit(functional_locationUrl, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }, [functional_locationUrl]);

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
                                Functional Location
                            </h2>
                            <p className="mt-2 text-sm">
                                A list of all the functional locations.
                            </p>
                        </div>
                        <div>
                            {can.functional_location_create && (
                                <Link
                                    href={route("functional-locations.create")}
                                >
                                    <PrimaryButton>Create new</PrimaryButton>
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            }
        >
            <Head title="Funcional locations" />

            {/* 
            <ModalConfirm
                isOpen={isOpen}
                closeModal={closeModal}
                id={selectedUserId}
                message={message}
                actionMessage={actionMessage}
                method={method}
                url={url}
            /> */}

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
                                placeholder="Search functional location data..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                            <div>
                                <InputLabel
                                    htmlFor="order_by"
                                    value="Order by"
                                />
                                <SelectInput
                                    id="order_by"
                                    className="mt-1 block w-sm"
                                    withSelectName={false}
                                    onChange={(e) => {
                                        setOrderBy(e.target.value);
                                    }}
                                    options={[
                                        {
                                            value: "id",
                                            label: "ID",
                                        },
                                        {
                                            value: "description",
                                            label: "Description",
                                        },
                                        {
                                            value: "updated_at",
                                            label: "Updated at",
                                        },
                                        {
                                            value: "updated_by",
                                            label: "Updated By",
                                        },
                                    ]}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="sort_by" value="Sort by" />
                                <SelectInput
                                    id="sort_by"
                                    className="mt-1 block w-sm"
                                    withSelectName={false}
                                    onChange={(e) => {
                                        setSortBy(e.target.value);
                                    }}
                                    options={[
                                        {
                                            value: "asc",
                                            label: "Ascending",
                                        },
                                        {
                                            value: "desc",
                                            label: "Descending",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="table min-w-max">
                                <thead>
                                    <tr>
                                        <th>Functional location ID</th>
                                        <th>Description</th>
                                        <th>Updated at</th>
                                        <th>Updated by</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {functional_locations.data.map(
                                        (functional_location) => {
                                            if (
                                                functional_location.id ==
                                                "FP-01-SP3-HOO-PJ99-797"
                                            ) {
                                                console.log(
                                                    functional_location
                                                );
                                            }
                                            return (
                                                <tr
                                                    className="border-b-base-300"
                                                    key={functional_location.id}
                                                >
                                                    <td
                                                        onClick={() => {
                                                            router.get(
                                                                route(
                                                                    "functional-locations.edit",
                                                                    functional_location.id
                                                                )
                                                            );
                                                        }}
                                                        className={
                                                            can.functional_location_edit
                                                                ? "font-bold underline underline-offset-2 hover:text-blue-500 cursor-pointer"
                                                                : "font-bold"
                                                        }
                                                    >
                                                        {functional_location.id}
                                                    </td>
                                                    <td>
                                                        {
                                                            functional_location.description
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            functional_location.updated_at
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            functional_location
                                                                .updated_by
                                                                ?.full_name
                                                        }
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* <div className="flex justify-center">
                        <Link
                            className="mx-auto"
                            onClick={() =>
                                router.reload(
                                    route("functional-locations.index", {
                                        preserveScroll: true,
                                        preserveState: true,
                                    })
                                )
                            }
                        >
                            Refresh
                        </Link>
                    </div> */}

                    {functional_locations.meta.links.length > 3 && (
                        <Pagination meta={functional_locations.meta} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

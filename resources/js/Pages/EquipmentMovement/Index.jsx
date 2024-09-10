import InputLabel from "@/Components/InputLabel";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Index({ auth, equipment_movements }) {
    const initialRender = useRef(true);
    const urlParams = new URLSearchParams(window.location.search);
    const [inputSearch, setInputSearch] = useState(
        urlParams.get("search") ?? ""
    );
    const [searchTerm, setSearchTerm] = useState(urlParams.get("search") ?? "");

    let userUrl = useMemo(() => {
        const url = new URL(route("equipment-movements.index"));

        if (searchTerm) {
            url.searchParams.append("search", searchTerm);
        }

        return url.href;
    }, [searchTerm]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        router.visit(userUrl, {
            preserveScroll: true,
            preserveState: true,
        });
    }, [userUrl]);

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
                                Equipment movements
                            </h2>

                            <p className="mt-1 text-sm">
                                A history of equipment movement.
                            </p>
                        </div>
                    </div>
                </>
            }
        >
            <Head title="Equipment movements" />

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
                                placeholder="Search movement data..."
                            />
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="table min-w-max">
                                <thead>
                                    <tr>
                                        <th>Equipment</th>
                                        <th>Status</th>
                                        <th>Functional location</th>
                                        <th>Action by</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {equipment_movements.data.map(
                                        (equipment_movement) => {
                                            return (
                                                <tr
                                                    className="border-b-base-300"
                                                    key={equipment_movement.id}
                                                >
                                                    {/* EQUIPMENT */}
                                                    <td>
                                                        <span
                                                            className="tooltip tooltip-right"
                                                            data-tip={
                                                                equipment_movement
                                                                    .equipment
                                                                    ?.classification
                                                                    ?.description
                                                            }
                                                        >
                                                            <span>
                                                                {
                                                                    equipment_movement
                                                                        .equipment
                                                                        ?.id
                                                                }
                                                            </span>
                                                        </span>
                                                        <br />
                                                        <span className="opacity-50">
                                                            {
                                                                equipment_movement.equipment_sort_field
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* MOVEMENT STATUS */}
                                                    <td>
                                                        <span
                                                            className={
                                                                equipment_movement
                                                                    .movement_status
                                                                    .id == 1
                                                                    ? "text-green-500"
                                                                    : "text-red-500"
                                                            }
                                                        >
                                                            {
                                                                equipment_movement
                                                                    .movement_status
                                                                    ?.keyword
                                                            }
                                                        </span>
                                                        <br />
                                                        <span className="opacity-50">
                                                            {
                                                                equipment_movement.created_at
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* FUNCTIONAL LOCATION */}
                                                    <td>
                                                        <span>
                                                            {
                                                                equipment_movement
                                                                    .functional_location
                                                                    ?.id
                                                            }
                                                        </span>
                                                        <br />
                                                        <span className="opacity-50">
                                                            {
                                                                equipment_movement.functional_location_description
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* REPLACED BY */}
                                                    <td>
                                                        <span>
                                                            {
                                                                equipment_movement
                                                                    .replaced_by
                                                                    ?.full_name
                                                            }
                                                        </span>
                                                        <br />
                                                        <span className="opacity-50">
                                                            {
                                                                equipment_movement
                                                                    .replaced_by
                                                                    ?.department
                                                                    ?.title
                                                            }
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {equipment_movements.meta.links.length > 3 && (
                        <Pagination meta={equipment_movements.meta} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

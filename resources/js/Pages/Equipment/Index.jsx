import InputLabel from "@/Components/InputLabel";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Index({
    auth,
    can,
    equipments,
    classifications,
    equipment_status,
}) {
    const initialRender = useRef(true);
    const urlParams = new URLSearchParams(window.location.search);
    const [inputSearch, setInputSearch] = useState(
        urlParams.get("search") ?? ""
    );
    const [searchTerm, setSearchTerm] = useState(urlParams.get("search") ?? "");
    const [selectedClassification, setSelectedClassification] = useState(
        urlParams.get("classification") ?? ""
    );
    const [selectedStatus, setSelectedStatus] = useState(
        urlParams.get("status") ?? ""
    );

    classifications = classifications.data.map((classification) => {
        return {
            value: classification.id,
            label: classification.description,
        };
    });

    equipment_status = equipment_status.data.map((status) => {
        return {
            value: status.id,
            label: status.keyword,
        };
    });

    let equipmentUrl = useMemo(() => {
        const url = new URL(route("equipments.index"));

        if (selectedStatus) {
            url.searchParams.append("status", selectedStatus);
        }

        if (searchTerm) {
            url.searchParams.append("search", searchTerm);
        }

        if (selectedClassification) {
            url.searchParams.append("classification", selectedClassification);
        }

        return url.href;
    }, [searchTerm, selectedClassification, selectedStatus]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        router.visit(equipmentUrl, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }, [equipmentUrl]);

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
                                Equipment
                            </h2>
                            <p className="mt-1 text-sm">
                                A list of all the equipments.
                            </p>
                        </div>
                        <div>
                            {can.equipment_create && (
                                <Link href={route("equipments.create")}>
                                    <PrimaryButton>Create new</PrimaryButton>
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            }
        >
            <Head title="Equipments" />

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
                                placeholder="Search equipment data..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                            <div>
                                <InputLabel
                                    htmlFor="classification"
                                    value="Classification"
                                />
                                <SelectInput
                                    id="classification"
                                    className="mt-1 block w-sm"
                                    withSelectName={true}
                                    selectName={"All"}
                                    value={selectedClassification}
                                    onChange={(e) => {
                                        setSelectedClassification(
                                            e.target.value
                                        );
                                    }}
                                    options={classifications}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="status" value="Status" />
                                <SelectInput
                                    id="status"
                                    className="mt-1 block w-sm"
                                    withSelectName={true}
                                    selectName={"All"}
                                    options={equipment_status}
                                    value={selectedStatus}
                                    onChange={(e) => {
                                        setSelectedStatus(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="table min-w-max">
                                <thead>
                                    <tr>
                                        <th>Equipment ID</th>
                                        <th>Details</th>
                                        <th>Functional location</th>
                                        <th>Updated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {equipments.data.map((equipment) => {
                                        return (
                                            <tr
                                                className="border-b-base-300"
                                                key={equipment.id}
                                            >
                                                {/* EQUIPMENT ID */}
                                                <td
                                                    className="cursor-pointer max-w-32 truncate"
                                                    preserveScroll
                                                    onClick={() => {
                                                        router.get(
                                                            route(
                                                                "equipments.show",
                                                                equipment.id,
                                                                {
                                                                    preserveScroll: true,
                                                                    preserveState: true,
                                                                }
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <span
                                                        className={
                                                            `font-bold flex justify-between border ` +
                                                            can.equipment_edit
                                                                ? "underline underline-offset-2 hover:text-blue-500"
                                                                : null
                                                        }
                                                    >
                                                        {equipment.id}
                                                    </span>
                                                    <br />
                                                    <span className="text-xs opacity-50">
                                                        {
                                                            equipment
                                                                .classification
                                                                .description
                                                        }
                                                    </span>
                                                </td>
                                                {/* DETAILS */}
                                                <td className="max-w-56 truncate">
                                                    <span>
                                                        {equipment.sort_field}
                                                    </span>
                                                    <br />
                                                    <span className="text-sm opacity-50">
                                                        {equipment.description}
                                                    </span>
                                                </td>
                                                {/* FUNCTIONAL LOCATION */}
                                                <td>
                                                    <Link
                                                        className={
                                                            `font-bold flex justify-between border ` +
                                                                can.functional_location_show &&
                                                            equipment
                                                                ?.functional_location
                                                                ?.id
                                                                ? "underline underline-offset-2 hover:text-blue-500 cursor-pointer"
                                                                : ""
                                                        }
                                                        href={
                                                            can.functional_location_show &&
                                                            equipment
                                                                ?.functional_location
                                                                ?.id &&
                                                            route(
                                                                "functional-locations.show",
                                                                equipment
                                                                    ?.functional_location
                                                                    ?.id
                                                            )
                                                        }
                                                    >
                                                        {
                                                            equipment
                                                                ?.functional_location
                                                                ?.id
                                                        }
                                                    </Link>
                                                </td>
                                                {/* UPDATED */}
                                                <td>
                                                    {equipment?.updated_at}
                                                    {equipment?.updated_by
                                                        ?.full_name && (
                                                        <div className="opacity-50">
                                                            <span>
                                                                {
                                                                    equipment
                                                                        ?.updated_by
                                                                        ?.full_name
                                                                }
                                                            </span>
                                                            <br />
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {equipments.meta.links.length > 3 && (
                        <Pagination meta={equipments.meta} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

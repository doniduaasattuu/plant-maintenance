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

    const checkFormLink = {
        ZCLASS_E009: "motor-check-records.create",
    };

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
                                        <th>Updated at</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {equipments.data.map((equipment) => {
                                        return (
                                            <tr
                                                className="border-b-base-300"
                                                key={equipment.id}
                                            >
                                                <td
                                                    className="cursor-pointer max-w-32 truncate"
                                                    onClick={() => {
                                                        router.get(
                                                            route(
                                                                "equipments.edit",
                                                                equipment.id
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
                                                <td className="max-w-56 truncate">
                                                    <span>
                                                        {equipment.sort_field}
                                                    </span>
                                                    <br />
                                                    <span className="text-sm opacity-50">
                                                        {equipment.description}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link
                                                        className={
                                                            `font-bold flex justify-between border ` +
                                                                can.functional_location_edit &&
                                                            equipment
                                                                ?.functional_location
                                                                ?.id
                                                                ? "underline underline-offset-2 hover:text-blue-500 cursor-pointer"
                                                                : null
                                                        }
                                                        href={
                                                            can.functional_location_edit &&
                                                            equipment
                                                                ?.functional_location
                                                                ?.id
                                                                ? route(
                                                                      "functional-locations.edit",
                                                                      equipment
                                                                          ?.functional_location
                                                                          ?.id
                                                                  )
                                                                : undefined
                                                        }
                                                    >
                                                        {
                                                            equipment
                                                                ?.functional_location
                                                                ?.id
                                                        }
                                                    </Link>
                                                </td>
                                                <td>{equipment?.updated_at}</td>
                                                {checkFormLink[
                                                    equipment.classification.id
                                                ] &&
                                                    can.motor_check_record_create &&
                                                    equipment.status.id ==
                                                        2 && (
                                                        <td className="text-center">
                                                            <span className="mx-auto">
                                                                <Link
                                                                    href={route(
                                                                        checkFormLink[
                                                                            equipment
                                                                                .classification
                                                                                .id
                                                                        ],
                                                                        {
                                                                            preserveScroll: true,
                                                                        }
                                                                    )}
                                                                    data={{
                                                                        equipment_id:
                                                                            equipment.id,
                                                                    }}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                            1.5
                                                                        }
                                                                        stroke="currentColor"
                                                                        className="size-6"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </span>
                                                        </td>
                                                    )}
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

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

export default function Index({ auth, can, materials, unitOfMeasurements }) {
    const initialRender = useRef(true);
    const urlParams = new URLSearchParams(window.location.search);
    const [selectedMeasurement, setSelectedMeasurement] = useState("");
    const [inputSearch, setInputSearch] = useState(
        urlParams.get("search") ?? ""
    );
    const [searchTerm, setSearchTerm] = useState(urlParams.get("search") ?? "");

    let materialUrl = useMemo(() => {
        const url = new URL(route("materials.index"));

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

        router.visit(materialUrl, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }, [materialUrl]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchTerm(inputSearch);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [inputSearch]);

    unitOfMeasurements = unitOfMeasurements.data.map((measurement) => {
        return {
            value: measurement.id,
            label: measurement.keyword,
        };
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-xl leading-tight">
                                Material List
                            </h2>

                            <p className="mt-1 text-sm">
                                A list of all the materials.
                            </p>
                        </div>
                        <div>
                            {can.material_create && (
                                <Link href={route("materials.create")}>
                                    <PrimaryButton>Create new</PrimaryButton>
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            }
        >
            <Head title="Materials" />

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
                                placeholder="Search material data..."
                            />
                        </div>
                        <div>
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
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="table min-w-max">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Title</th>
                                        <th>UoM</th>
                                        <th>Price(IDR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materials.data.map((material) => {
                                        const materialUrl = route(
                                            "materials.show",
                                            material.id
                                        );

                                        return (
                                            <tr
                                                className="border-b-base-300"
                                                key={material.id}
                                            >
                                                <td className="w-24">
                                                    {can.material_show ? (
                                                        <Link
                                                            href={materialUrl}
                                                            className={
                                                                `font-bold flex justify-between border ` +
                                                                can.material_show
                                                                    ? "underline underline-offset-2 hover:text-blue-500"
                                                                    : null
                                                            }
                                                        >
                                                            {material.id}
                                                        </Link>
                                                    ) : (
                                                        <div>{material.id}</div>
                                                    )}
                                                </td>
                                                <td>{material.title}</td>
                                                <td>
                                                    {
                                                        material
                                                            .unit_of_measurement
                                                            ?.keyword
                                                    }
                                                </td>
                                                <td>
                                                    {rupiah(material.price)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {materials.meta.links.length > 3 && (
                        <Pagination meta={materials.meta} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

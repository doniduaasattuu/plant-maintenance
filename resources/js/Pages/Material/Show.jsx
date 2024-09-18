import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import ModalConfirm from "@/Components/ModalConfirm";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import EquipmentList from "./EquipmentList";
import { rupiah } from "@/Utils/Helper";

export default function Show({ auth, can, material }) {
    const materialId = material.data.id;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Material
                </h2>
            }
        >
            <Head title="Material" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium">
                                        {material.data.id}
                                    </h2>

                                    <p className="mt-1 text-sm">
                                        Displayed material data and information.
                                    </p>
                                </div>
                                <div>
                                    {!route().current().includes("edit") &&
                                        can.material_edit && (
                                            <div
                                                onClick={() =>
                                                    router.get(
                                                        route(
                                                            "materials.edit",
                                                            material.data.id
                                                        )
                                                    )
                                                }
                                                tabIndex={0}
                                                role="button"
                                                className="btn btn-ghost btn-circle"
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
                                        )}
                                </div>
                            </div>
                            <div
                                id={`ShowMaterial:${material.data.id}`}
                                className="mt-6 space-y-6"
                            >
                                {/* ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="id"
                                        value="Material ID*"
                                    />

                                    <TextInput
                                        readOnly
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={material.data.id}
                                    />
                                </div>

                                {/* TITLE */}
                                <div>
                                    <InputLabel
                                        htmlFor="title"
                                        value="Title*"
                                    />

                                    <TextInput
                                        readOnly
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={material.data.title}
                                    />
                                </div>

                                {/* UNIT OF MEASUREMENT */}
                                <div>
                                    <InputLabel
                                        htmlFor="unit_of_measurement_id"
                                        value="UoM"
                                    />

                                    <TextInput
                                        readOnly
                                        id="unit_of_measurement_id"
                                        className="mt-1 block w-full"
                                        value={
                                            material.data.unit_of_measurement
                                                .id +
                                            " - " +
                                            material.data.unit_of_measurement
                                                .keyword
                                        }
                                    />
                                </div>

                                {/* PRICE */}
                                <div>
                                    <InputLabel
                                        htmlFor="price"
                                        value="Price (IDR)"
                                    />

                                    <TextInput
                                        readOnly
                                        id="price"
                                        className="mt-1 block w-full"
                                        value={rupiah(material.data.price)}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <SecondaryButton
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.history.back();
                                        }}
                                    >
                                        Back
                                    </SecondaryButton>
                                </div>
                            </div>
                        </section>
                    </div>

                    {material.data?.equipments?.length > 0 && (
                        <EquipmentList material={material} can={can} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

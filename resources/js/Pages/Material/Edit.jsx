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

export default function Edit({ auth, can, material, unitOfMeasurements }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm(`EditMaterial:${material.data.id}`, {
            id: material.data.id ?? "",
            title: material.data.title ?? "",
            unit_of_measurement_id: material.data.unit_of_measurement?.id ?? "",
            price: material.data.price ?? "",
        });

    function submit(e) {
        e.preventDefault();
        patch(route("materials.update", material.data.id), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }

    unitOfMeasurements = unitOfMeasurements.data.map((measurement) => {
        return {
            value: measurement.id,
            label: measurement.keyword,
        };
    });

    // DELETE MATERIAL
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openDeleteConfirm = (id) => {
        setSelectedMaterial(id);
        setIsOpen(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Material
                </h2>
            }
        >
            <Head title="Edit material" />

            <ModalConfirm
                isOpen={isOpen}
                closeModal={closeModal}
                id={selectedMaterial}
                message={
                    "Once this material is deleted, all of its resources and data will be permanently deleted."
                }
                method={"delete"}
                url={"materials.destroy"}
            />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium">
                                        Edit material
                                    </h2>

                                    <p className="mt-1 text-sm">
                                        Edit material data and information.
                                    </p>
                                </div>

                                {/* <div></div> */}
                            </div>
                            <form
                                id={`EditMaterial:${material.data.id}`}
                                onSubmit={submit}
                                className="mt-6 space-y-6"
                            >
                                {/* ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="id"
                                        value="Material ID*"
                                    />

                                    <TextInput
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={data.id}
                                        onChange={(e) =>
                                            setData("id", e.target.value)
                                        }
                                        required
                                        inputMode="numeric"
                                        maxLength="8"
                                        autoComplete="id"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.id}
                                    />
                                </div>

                                {/* TITLE */}
                                <div>
                                    <InputLabel
                                        htmlFor="title"
                                        value="Title*"
                                    />

                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        required
                                        autoComplete="title"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.title}
                                    />
                                </div>

                                {/* UNIT OF MEASUREMENT */}
                                <div>
                                    <InputLabel
                                        htmlFor="unit_of_measurement_id"
                                        value="UoM"
                                    />
                                    <SelectInput
                                        id="unit_of_measurement_id"
                                        className="mt-1 block w-sm"
                                        value={data.unit_of_measurement_id}
                                        onChange={(e) => {
                                            setData(
                                                "unit_of_measurement_id",
                                                e.target.value
                                            );
                                        }}
                                        options={unitOfMeasurements}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.unit_of_measurement_id}
                                    />
                                </div>

                                {/* PRICE */}
                                <div>
                                    <InputLabel
                                        htmlFor="price"
                                        value="Price (IDR)"
                                    />

                                    <TextInput
                                        id="price"
                                        className="mt-1 block w-full"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        inputMode="numeric"
                                        autoComplete="price"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.price}
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

                                    <PrimaryButton disabled={processing}>
                                        Update
                                    </PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm">Updated.</p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>

                    {material.data.equipments.length > 0 && (
                        <EquipmentList material={material} can={can} />
                    )}

                    {can.material_delete && (
                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                <header>
                                    <h2 className="text-lg font-medium">
                                        Delete Material
                                    </h2>

                                    <p className="mt-1 text-sm">
                                        Once this material is deleted, all of
                                        its resources and data will be
                                        permanently deleted. Before deleting
                                        this material, please download any data
                                        or information that you wish to retain.
                                    </p>
                                </header>

                                <DangerButton
                                    onClick={() =>
                                        openDeleteConfirm(material.data.id)
                                    }
                                >
                                    Delete Material
                                </DangerButton>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

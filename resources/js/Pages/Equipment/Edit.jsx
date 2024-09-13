import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { useState, useEffect } from "react";
import ModalConfirm from "@/Components/ModalConfirm";
import Actions from "./Actions";

export default function Edit({
    auth,
    can,
    equipment,
    classifications,
    equipment_status,
}) {
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

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm(`EditEquipment:${equipment.data.id}`, {
            id: equipment.data.id ?? "",
            classification_id: equipment.data.classification.id ?? "",
            equipment_status_id: equipment.data.status.id ?? "",
            functional_location_id:
                equipment.data.functional_location?.id ?? "",
            sort_field: equipment.data.sort_field ?? "",
            description: equipment.data.description ?? "",
        });

    function submit(e) {
        e.preventDefault();
        patch(route("equipments.update", equipment.data.id), {
            preserveScroll: true,
            preserveState: true,
        });
    }

    useEffect(() => {
        if (data.functional_location_id == "") {
            setData("sort_field", "");
        }
    }, [data.functional_location_id]);

    // DELETE FUNCTIONAL LOCATION
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openDeleteConfirm = (id) => {
        setSelectedEquipment(id);
        setIsOpen(true);
    };

    const links = {
        ZCLASS_E009: {
            records: "motor-check-records.create",
            trends: "motor-check-trends.index",
        },
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Edit Equipment
                </h2>
            }
        >
            <Head title="Edit equipment" />

            <ModalConfirm
                isOpen={isOpen}
                closeModal={closeModal}
                id={selectedEquipment}
                message={
                    "Once this equipment is deleted, all of its resources and data will be permanently deleted."
                }
                method={"delete"}
                url={"equipments.destroy"}
            />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium">
                                        Edit equipment
                                    </h2>

                                    <p className="mt-1 text-sm">
                                        Edit equipment data and information.
                                    </p>
                                </div>

                                <Actions
                                    equipment={equipment}
                                    can={can}
                                    links={links}
                                />
                            </div>
                            <form
                                id={`EditEquipment:${equipment.data.id}`}
                                onSubmit={submit}
                                className="mt-6 space-y-6"
                            >
                                {/* ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="id"
                                        value="Equipment ID*"
                                    />

                                    <TextInput
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={data.id}
                                        onChange={(e) =>
                                            setData("id", e.target.value)
                                        }
                                        required
                                        maxLength="9"
                                        autoComplete="id"
                                        readOnly={data.equipment_status_id == 2}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.id}
                                    />
                                </div>

                                {/* CLASSIFICATION */}
                                <div>
                                    <InputLabel
                                        htmlFor="classification_id"
                                        value="Classification*"
                                    />
                                    <SelectInput
                                        id="classification_id"
                                        className="mt-1 block w-sm"
                                        value={data.classification_id}
                                        onChange={(e) => {
                                            setData(
                                                "classification_id",
                                                e.target.value
                                            );
                                        }}
                                        required
                                        options={classifications}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.classification_id}
                                    />
                                </div>

                                {/* EQUIPMENT STATUS */}
                                <div>
                                    <InputLabel
                                        htmlFor="equipment_status_id"
                                        value="Status*"
                                    />
                                    <SelectInput
                                        id="equipment_status_id"
                                        className="mt-1 block w-sm"
                                        value={data.equipment_status_id}
                                        withSelectName={false}
                                        onChange={(e) => {
                                            setData(
                                                "equipment_status_id",
                                                e.target.value
                                            );
                                        }}
                                        required
                                        options={equipment_status}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.equipment_status_id}
                                    />
                                </div>

                                {/* FUNCTIONAL LOCATION ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="functional_location_id"
                                        value={
                                            data.equipment_status_id == 2
                                                ? "Functional location*"
                                                : "Functional location"
                                        }
                                    />

                                    <TextInput
                                        id="functional_location_id"
                                        className="mt-1 block w-sm"
                                        value={data.functional_location_id}
                                        onChange={(e) => {
                                            setData(
                                                "functional_location_id",
                                                e.target.value
                                            );
                                        }}
                                        required={data.equipment_status_id == 2}
                                        maxLength="25"
                                        autoComplete="functional_location_id"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.functional_location_id}
                                    />
                                </div>

                                {/* SORT FIELD */}
                                <div>
                                    <InputLabel
                                        htmlFor="sort_field"
                                        value="Sort field"
                                    />

                                    <TextInput
                                        id="sort_field"
                                        className="mt-1 block w-full"
                                        value={data.sort_field}
                                        onChange={(e) =>
                                            setData(
                                                "sort_field",
                                                e.target.value
                                            )
                                        }
                                        required={
                                            data.functional_location_id != ""
                                                ? true
                                                : undefined
                                        }
                                        maxLength="50"
                                        autoComplete="sort_field"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.sort_field}
                                    />
                                </div>

                                {/* DESCRIPTION */}
                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />

                                    <TextInput
                                        id="description"
                                        className="mt-1 block w-full"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        required={
                                            data.functional_location_id != ""
                                                ? true
                                                : undefined
                                        }
                                        maxLength="100"
                                        autoComplete="description"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
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

                    {can.equipment_delete && equipment.data.status.id != 2 && (
                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                <header>
                                    <h2 className="text-lg font-medium">
                                        Delete Equipment
                                    </h2>

                                    <p className="mt-1 text-sm">
                                        Once this equipment is deleted, all of
                                        its resources and data will be
                                        permanently deleted. Before deleting
                                        this equipment, please download any data
                                        or information that you wish to retain.
                                    </p>
                                </header>

                                <DangerButton
                                    onClick={() =>
                                        openDeleteConfirm(equipment.data.id)
                                    }
                                >
                                    Delete Equipment
                                </DangerButton>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

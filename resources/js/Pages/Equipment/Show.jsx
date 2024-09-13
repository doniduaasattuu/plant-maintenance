import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useState, useEffect } from "react";
import ModalConfirm from "@/Components/ModalConfirm";
import Actions from "./Actions";

export default function Show({ auth, can, equipment }) {
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
                    Equipment
                </h2>
            }
        >
            <Head title="Edit equipment" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium">
                                        {equipment.data.id}
                                    </h2>

                                    <p className="mt-1 text-sm">
                                        Displayed equipment data and
                                        information.
                                    </p>
                                </div>

                                <Actions
                                    equipment={equipment}
                                    can={can}
                                    links={links}
                                />
                            </div>

                            <div className="mt-6 space-y-6">
                                {/* ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="id"
                                        value="Equipment ID*"
                                    />

                                    <TextInput
                                        readOnly={true}
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={equipment.data.id ?? ""}
                                    />
                                </div>

                                {/* CLASSIFICATION */}
                                <div>
                                    <InputLabel
                                        htmlFor="classification_id"
                                        value="Classification*"
                                    />
                                    <TextInput
                                        readOnly={true}
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={
                                            equipment.data.classification
                                                .description ?? ""
                                        }
                                    />
                                </div>

                                {/* EQUIPMENT STATUS */}
                                <div>
                                    <InputLabel
                                        htmlFor="equipment_status_id"
                                        value="Status*"
                                    />
                                    <TextInput
                                        readOnly={true}
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={
                                            equipment.data.status.keyword ?? ""
                                        }
                                    />
                                </div>

                                {/* FUNCTIONAL LOCATION ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="functional_location_id"
                                        value="Functional location"
                                    />

                                    <TextInput
                                        readOnly={true}
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={
                                            equipment.data?.functional_location
                                                ?.id ?? ""
                                        }
                                    />
                                </div>

                                {/* SORT FIELD */}
                                <div>
                                    <InputLabel
                                        htmlFor="sort_field"
                                        value="Sort field"
                                    />

                                    <TextInput
                                        readOnly={true}
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={equipment.data.sort_field ?? ""}
                                    />
                                </div>

                                {/* DESCRIPTION */}
                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />

                                    <TextInput
                                        readOnly={true}
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={equipment.data.description ?? ""}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

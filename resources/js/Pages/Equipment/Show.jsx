import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Actions from "./Actions";
import SecondaryButton from "@/Components/SecondaryButton";
import MaterialList from "./MaterialList";

export default function Show({ auth, can, equipment, links }) {
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
                                        id="classification_id"
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
                                        id="equipment_status_id"
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
                                        id="functional_location_id"
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
                                        id="sort_field"
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
                                        id="description"
                                        className="mt-1 block w-full"
                                        value={equipment.data.description ?? ""}
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

                    {equipment.data.materials.length > 0 && (
                        <MaterialList equipment={equipment} can={can} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

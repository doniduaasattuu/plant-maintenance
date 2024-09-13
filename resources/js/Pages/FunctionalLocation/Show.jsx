import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Actions from "./Actions";
import EquipmentList from "./EquipmentList";

export default function Show({ auth, can, functional_location }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="font-semibold text-xl leading-tight">
                        Functional Location
                    </h2>
                </>
            }
        >
            <Head title="Functional Location" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium">
                                        {functional_location.data.id}
                                    </h2>

                                    <p className="mt-1 text-sm">
                                        Displayed data and information.
                                    </p>
                                </div>

                                <Actions
                                    auth={auth}
                                    can={can}
                                    functional_location={functional_location}
                                />
                            </div>

                            <div className="mt-6 space-y-6">
                                {/* ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="id"
                                        value="Functional location ID*"
                                    />

                                    <TextInput
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={functional_location.data.id}
                                        readOnly
                                    />
                                </div>

                                {/* DESCRIPTION */}
                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description*"
                                    />

                                    <TextInput
                                        id="description"
                                        className="mt-1 block w-full"
                                        value={
                                            functional_location.data.description
                                        }
                                        readOnly
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {functional_location.data.equipments.length > 0 && (
                        <EquipmentList
                            functional_location={functional_location}
                            can={can}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

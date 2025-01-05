import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";

export default function Show({ auth, acCheck }) {
    const { data } = useForm(`acCheckShow:${acCheck.data.id}`, {
        equipment_id: acCheck.data.equipment_id ?? "",
        is_operational: acCheck.data.is_operational ?? "",
        is_drain_leaking: acCheck.data.is_drain_leaking ?? "",
        current_load: acCheck.data.current_load ?? "",
        blowing_temperature: acCheck.data.blowing_temperature ?? "",
        ambient_temperature: acCheck.data.ambient_temperature ?? "",
        is_filter_clean: acCheck.data.is_filter_clean ?? "",
        is_evaporator_clean: acCheck.data.is_evaporator_clean ?? "",
        is_condensor_clean: acCheck.data.is_condensor_clean ?? "",
        cleaning_filter: acCheck.data.cleaning_filter ?? "",
        cleaning_evaporator: acCheck.data.cleaning_evaporator ?? "",
        cleaning_condensor: acCheck.data.cleaning_condensor ?? "",
        created_at: acCheck.data.created_at ?? "",
        checked_by: acCheck.data.checked_by.full_name ?? "",
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-xl leading-tight">
                                Show AC Check
                            </h2>
                            <p className="mt-1 text-sm">
                                Displayed single check of equipment.
                            </p>
                        </div>
                    </div>
                </>
            }
        >
            <Head title="AC Check" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div
                        id={`acCheckShow:${acCheck.data.id}`}
                        className="space-y-6"
                    >
                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                {/* EQUIPMENT ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="equipment_id"
                                        value="Equipment"
                                    />

                                    <TextInput
                                        id="equipment_id"
                                        className="mt-1 block w-full"
                                        value={data.equipment_id}
                                        readOnly
                                    />
                                </div>

                                {/* CHECKED DATA */}
                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    <div>
                                        <InputLabel
                                            htmlFor="checked_by"
                                            value="Checked by"
                                        />

                                        <TextInput
                                            id="checked_by"
                                            className="mt-1 block w-full"
                                            value={data.checked_by}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="created_at"
                                            value="Checked at"
                                        />

                                        <TextInput
                                            id="created_at"
                                            className="mt-1 block w-full"
                                            value={data.created_at}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-xl">
                                    {/* OPERATIONAL STATUS */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_operational"
                                            value="Operational"
                                        />

                                        <TextInput
                                            id="is_operational"
                                            className="mt-1 block w-full"
                                            value={
                                                data.is_operational
                                                    ? "Running"
                                                    : "Stopped"
                                            }
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* IS DRAIN LEAKING */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_drain_leaking"
                                            value="Drain Leaking"
                                        />

                                        <TextInput
                                            id="is_drain_leaking"
                                            className="mt-1 block w-full"
                                            value={
                                                data.is_drain_leaking
                                                    ? "Yes"
                                                    : "No"
                                            }
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* CURRENT LOAD */}
                                    <div>
                                        <InputLabel
                                            htmlFor="current_load"
                                            value="Current load"
                                        />

                                        <TextInput
                                            id="current_load"
                                            className="mt-1 block w-full"
                                            value={data.current_load}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* BLOWING TEMPERATURE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="blowing_temperature"
                                            value="Blower Temperature"
                                        />

                                        <TextInput
                                            id="blowing_temperature"
                                            className="mt-1 block w-full"
                                            value={data.blowing_temperature}
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* AMBIENT TEMPERATURE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="ambient_temperature"
                                            value="Ambient Temperature"
                                        />

                                        <TextInput
                                            id="ambient_temperature"
                                            className="mt-1 block w-full"
                                            value={data.ambient_temperature}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                <h2 className="font-semibold text-lg leading-tight">
                                    Cleanliness
                                </h2>

                                <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-xl">
                                    {/* IS FILTER CLEAN */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_filter_clean"
                                            value="Filter"
                                        />

                                        <TextInput
                                            id="is_filter_clean"
                                            className="mt-1 block w-full"
                                            value={
                                                data.is_filter_clean
                                                    ? "Clean"
                                                    : "Dirty"
                                            }
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* IS EVAPORATOR CLEAN */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_evaporator_clean"
                                            value="Evaporator"
                                        />

                                        <TextInput
                                            id="is_evaporator_clean"
                                            className="mt-1 block w-full"
                                            value={
                                                data.is_evaporator_clean
                                                    ? "Clean"
                                                    : "Dirty"
                                            }
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* IS CONDENSOR CLEAN */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_condensor_clean"
                                            value="Condensor"
                                        />

                                        <TextInput
                                            id="is_condensor_clean"
                                            className="mt-1 block w-full"
                                            value={
                                                data.is_condensor_clean
                                                    ? "Clean"
                                                    : "Dirty"
                                            }
                                            readOnly={true}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                <h2 className="font-semibold text-lg leading-tight">
                                    Cleaning
                                </h2>

                                <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-xl">
                                    {/* CLEANING FILTER */}
                                    <div>
                                        <InputLabel
                                            htmlFor="cleaning_filter"
                                            value="Filter"
                                        />

                                        <TextInput
                                            id="cleaning_filter"
                                            className="mt-1 block w-full"
                                            value={
                                                data.cleaning_filter
                                                    ? "Yes"
                                                    : "No"
                                            }
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* CLEANING EVAPORATOR */}
                                    <div>
                                        <InputLabel
                                            htmlFor="cleaning_evaporator"
                                            value="Evaporator"
                                        />

                                        <TextInput
                                            id="cleaning_evaporator"
                                            className="mt-1 block w-full"
                                            value={
                                                data.cleaning_evaporator
                                                    ? "Yes"
                                                    : "No"
                                            }
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* CLEANING CONDENSOR */}
                                    <div>
                                        <InputLabel
                                            htmlFor="cleaning_condensor"
                                            value="Condensor"
                                        />

                                        <TextInput
                                            id="cleaning_condensor"
                                            className="mt-1 block w-full"
                                            value={
                                                data.cleaning_condensor
                                                    ? "Yes"
                                                    : "No"
                                            }
                                            readOnly={true}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

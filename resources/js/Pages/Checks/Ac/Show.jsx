import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Show({ auth, acCheck }) {
    const { data } = useForm(`acCheckShow:${acCheck.data.id}`, {
        equipment_id: acCheck.data.equipment_id ?? "",
        operational_status_id: acCheck.data.operational_status.keyword ?? "",
        leakage: acCheck.data.leakage.keyword ?? "",
        evaporator: acCheck.data.evaporator.keyword ?? "",
        condensor: acCheck.data.condensor.keyword ?? "",
        current_before_cleaning: acCheck.data.current_before_cleaning ?? "",
        current_after_cleaning: acCheck.data.current_after_cleaning ?? "",
        temperature: acCheck.data.temperature ?? "",
        remote: acCheck.data.remote.keyword ?? "",
        compressor_pressure: acCheck.data.compressor_pressure ?? "",
        cleaning_filter_indoor:
            acCheck.data.cleaning_filter_indoor.keyword ?? "",
        cleaning_indoor: acCheck.data.cleaning_indoor.keyword ?? "",
        cleaning_outdoor: acCheck.data.cleaning_outdoor.keyword ?? "",
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
                                Displayed single check of air conditioner
                                equipment.
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

                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* OPERATIONAL STATUS */}
                                    <div>
                                        <InputLabel
                                            htmlFor="operational_status_id"
                                            value="Status"
                                        />

                                        <TextInput
                                            id="operational_status_id"
                                            className="mt-1 block w-full"
                                            value={data.operational_status_id}
                                            readOnly
                                        />
                                    </div>

                                    {/* LEAKAGE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="leakage"
                                            value="Leakage"
                                        />

                                        <TextInput
                                            id="leakage"
                                            className="mt-1 block w-full"
                                            value={data.leakage}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* EVAPORATOR */}
                                    <div>
                                        <InputLabel
                                            htmlFor="evaporator"
                                            value="Evaporator"
                                        />

                                        <TextInput
                                            id="evaporator"
                                            className="mt-1 block w-full"
                                            value={data.evaporator}
                                            readOnly
                                        />
                                    </div>

                                    {/* CONDENSOR */}
                                    <div>
                                        <InputLabel
                                            htmlFor="condensor"
                                            value="Condensor"
                                        />

                                        <TextInput
                                            id="condensor"
                                            className="mt-1 block w-full"
                                            value={data.condensor}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                <h2 className="font-semibold text-lg leading-tight">
                                    Technical
                                </h2>
                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* CURRENT BEFORE CLEANING */}
                                    <div>
                                        <InputLabel
                                            htmlFor="current_before_cleaning"
                                            value="Current before cleaning"
                                        />

                                        <TextInput
                                            id="current_before_cleaning"
                                            className="mt-1 block w-full"
                                            value={data.current_before_cleaning}
                                            readOnly
                                        />
                                    </div>

                                    {/* CURRENT AFTER CLEANING */}
                                    <div>
                                        <InputLabel
                                            htmlFor="current_after_cleaning"
                                            value="Current after cleaning"
                                        />

                                        <TextInput
                                            id="current_after_cleaning"
                                            className="mt-1 block w-full"
                                            value={data.current_after_cleaning}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-xl">
                                    {/* TEMPERATURE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="temperature"
                                            value="Temperature"
                                        />

                                        <TextInput
                                            id="temperature"
                                            className="mt-1 block w-full"
                                            value={data.temperature}
                                            readOnly
                                        />
                                    </div>

                                    {/* REMOTE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="remote"
                                            value="Remote"
                                        />

                                        <TextInput
                                            id="remote"
                                            className="mt-1 block w-full"
                                            value={data.remote}
                                            readOnly
                                        />
                                    </div>

                                    {/* PRESSURE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="compressor_pressure"
                                            value="Pressure"
                                        />

                                        <TextInput
                                            id="compressor_pressure"
                                            className="mt-1 block w-full"
                                            value={data.compressor_pressure}
                                            readOnly
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
                                    {/* CLEANING FILTER INDOOR */}
                                    <div>
                                        <InputLabel
                                            htmlFor="cleaning_filter_indoor"
                                            value="Filter Indoor"
                                        />

                                        <TextInput
                                            id="cleaning_filter_indoor"
                                            className="mt-1 block w-full"
                                            value={data.cleaning_filter_indoor}
                                            readOnly
                                        />
                                    </div>

                                    {/* CLEANING INDOOR */}
                                    <div>
                                        <InputLabel
                                            htmlFor="cleaning_indoor"
                                            value="Indoor"
                                        />

                                        <TextInput
                                            id="cleaning_indoor"
                                            className="mt-1 block w-full"
                                            value={data.cleaning_indoor}
                                            readOnly
                                        />
                                    </div>

                                    {/* CLEANING OUTDOOR */}
                                    <div>
                                        <InputLabel
                                            htmlFor="cleaning_outdoor"
                                            value="Outdoor"
                                        />

                                        <TextInput
                                            id="cleaning_outdoor"
                                            className="mt-1 block w-full"
                                            value={data.cleaning_outdoor}
                                            readOnly
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

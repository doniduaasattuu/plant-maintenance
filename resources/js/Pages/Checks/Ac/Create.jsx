import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { useState } from "react";

export default function Create({
    auth,
    can,
    equipment_id,
    operationalStatuses,
    cleanliness,
    confirmations,
    goodness,
}) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm(`AcCheck:${equipment_id}`, {
            equipment_id: equipment_id ?? "",
            operational_status_id: 1,
            leakage: 2,
            evaporator: 1,
            condensor: 1,
            current_before_cleaning: "",
            current_after_cleaning: "",
            temperature: "",
            remote: 1,
            compressor_pressure: "",
            cleaning_filter_indoor: 1,
            cleaning_indoor: 1,
            cleaning_outdoor: 1,
        });

    const [inputErrors, setInputErrors] = useState(errors);

    operationalStatuses = operationalStatuses.data.map((item) => {
        return {
            value: item.id,
            label: item.keyword,
        };
    });

    cleanliness = cleanliness.data.map((item) => {
        return {
            value: item.id,
            label: item.keyword,
        };
    });

    confirmations = confirmations.data.map((item) => {
        return {
            value: item.id,
            label: item.keyword,
        };
    });

    goodness = goodness.data.map((item) => {
        return {
            value: item.id,
            label: item.keyword,
        };
    });

    useEffect(() => {
        setInputErrors(errors);
    }, [errors]);

    const handleFocus = (field) => {
        setInputErrors({ ...inputErrors, [field]: null });
    };

    function submit(e) {
        e.preventDefault();
        post(route("ac-check.store"), {
            preserveState: true,
            replace: true,
        });
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-xl leading-tight">
                                AC check {equipment_id}
                            </h2>
                            <p className="mt-1 text-sm">
                                Form daily check of air conditioner equipment.
                            </p>
                        </div>
                    </div>
                </>
            }
        >
            <Head title="AC Check" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <form
                        id={`AcCheck:${equipment_id}`}
                        onSubmit={submit}
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
                                        onChange={(e) =>
                                            setData(
                                                "equipment_id",
                                                e.target.value
                                            )
                                        }
                                        required
                                        readOnly={true}
                                        onFocus={(e) =>
                                            handleFocus(e.target.id)
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={inputErrors.equipment_id}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* OPERATIONAL STATUS */}
                                    <div>
                                        <InputLabel
                                            htmlFor="operational_status_id"
                                            value="Status"
                                        />

                                        <SelectInput
                                            id="operational_status_id"
                                            className="mt-1 block w-full"
                                            value={data.operational_status_id}
                                            onChange={(e) =>
                                                setData(
                                                    "operational_status_id",
                                                    e.target.value
                                                )
                                            }
                                            withSelectName={false}
                                            options={operationalStatuses}
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.operational_status_id
                                            }
                                        />
                                    </div>

                                    {/* LEAKAGE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="leakage"
                                            value="Leakage"
                                        />

                                        <SelectInput
                                            id="leakage"
                                            className="mt-1 block w-full"
                                            value={data.leakage}
                                            onChange={(e) =>
                                                setData(
                                                    "leakage",
                                                    e.target.value
                                                )
                                            }
                                            withSelectName={false}
                                            options={confirmations}
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.leakage}
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

                                        <SelectInput
                                            id="evaporator"
                                            className="mt-1 block w-full"
                                            value={data.evaporator}
                                            onChange={(e) =>
                                                setData(
                                                    "evaporator",
                                                    e.target.value
                                                )
                                            }
                                            withSelectName={false}
                                            options={cleanliness}
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.evaporator}
                                        />
                                    </div>

                                    {/* CONDENSOR */}
                                    <div>
                                        <InputLabel
                                            htmlFor="condensor"
                                            value="Condensor"
                                        />

                                        <SelectInput
                                            id="condensor"
                                            className="mt-1 block w-full"
                                            value={data.condensor}
                                            onChange={(e) =>
                                                setData(
                                                    "condensor",
                                                    e.target.value
                                                )
                                            }
                                            withSelectName={false}
                                            options={cleanliness}
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.condensor}
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
                                            onChange={(e) =>
                                                setData(
                                                    "current_before_cleaning",
                                                    e.target.value
                                                )
                                            }
                                            inputMode="numeric"
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
                                            placeholder="A"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.current_before_cleaning
                                            }
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
                                            onChange={(e) =>
                                                setData(
                                                    "current_after_cleaning",
                                                    e.target.value
                                                )
                                            }
                                            inputMode="numeric"
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
                                            placeholder="A"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.current_after_cleaning
                                            }
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
                                            onChange={(e) =>
                                                setData(
                                                    "temperature",
                                                    e.target.value
                                                )
                                            }
                                            inputMode="numeric"
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
                                            placeholder="°C"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.temperature}
                                        />
                                    </div>

                                    {/* REMOTE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="remote"
                                            value="Remote"
                                        />

                                        <SelectInput
                                            id="remote"
                                            className="mt-1 block w-full"
                                            value={data.remote}
                                            onChange={(e) =>
                                                setData(
                                                    "remote",
                                                    e.target.value
                                                )
                                            }
                                            withSelectName={false}
                                            options={goodness}
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.remote}
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
                                            onChange={(e) =>
                                                setData(
                                                    "compressor_pressure",
                                                    e.target.value
                                                )
                                            }
                                            inputMode="numeric"
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
                                            placeholder="Bar"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.compressor_pressure
                                            }
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

                                        <SelectInput
                                            id="cleaning_filter_indoor"
                                            className="mt-1 block w-full"
                                            value={data.cleaning_filter_indoor}
                                            onChange={(e) =>
                                                setData(
                                                    "cleaning_filter_indoor",
                                                    e.target.value
                                                )
                                            }
                                            withSelectName={false}
                                            options={confirmations}
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.cleaning_filter_indoor
                                            }
                                        />
                                    </div>

                                    {/* CLEANING INDOOR */}
                                    <div>
                                        <InputLabel
                                            htmlFor="cleaning_indoor"
                                            value="Indoor"
                                        />

                                        <SelectInput
                                            id="cleaning_indoor"
                                            className="mt-1 block w-full"
                                            value={data.cleaning_indoor}
                                            onChange={(e) =>
                                                setData(
                                                    "cleaning_indoor",
                                                    e.target.value
                                                )
                                            }
                                            withSelectName={false}
                                            options={confirmations}
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.cleaning_indoor
                                            }
                                        />
                                    </div>

                                    {/* CLEANING OUTDOOR */}
                                    <div>
                                        <InputLabel
                                            htmlFor="cleaning_outdoor"
                                            value="Outdoor"
                                        />

                                        <SelectInput
                                            id="cleaning_outdoor"
                                            className="mt-1 block w-full"
                                            value={data.cleaning_outdoor}
                                            onChange={(e) =>
                                                setData(
                                                    "cleaning_outdoor",
                                                    e.target.value
                                                )
                                            }
                                            withSelectName={false}
                                            options={confirmations}
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.cleaning_outdoor
                                            }
                                        />
                                    </div>
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
                                        Save
                                    </PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm">Saved.</p>
                                    </Transition>
                                </div>
                            </section>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

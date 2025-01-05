import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { selectOptions } from "@/Utils/Helper";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Create({ auth, equipment_id }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm(`AcCheck:${equipment_id}`, {
            equipment_id: equipment_id ?? "",
            is_operational: 1 ?? "",
            is_drain_leaking: 0 ?? "",
            current_load: "",
            blowing_temperature: "",
            ambient_temperature: "",
            is_filter_clean: 1 ?? "",
            is_evaporator_clean: 1 ?? "",
            is_condensor_clean: 1 ?? "",
            cleaning_filter: 0 ?? "",
            cleaning_evaporator: 0 ?? "",
            cleaning_condensor: 0 ?? "",
        });

    const [inputErrors, setInputErrors] = useState(errors);

    useEffect(() => {
        setInputErrors(errors);
    }, [errors]);

    const handleFocus = (e) => {
        setInputErrors({ ...inputErrors, [e.target.name]: null });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
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
                                        name="equipment_id"
                                        className="mt-1 block w-full"
                                        value={data.equipment_id}
                                        required
                                        readOnly={true}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={inputErrors.equipment_id}
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-xl">
                                    {/* OPERATIONAL STATUS */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_operational"
                                            value="Operational"
                                        />

                                        <SelectInput
                                            id="is_operational"
                                            name="is_operational"
                                            className="mt-1 block w-full"
                                            value={data.is_operational}
                                            onChange={handleChange}
                                            withSelectName={false}
                                            options={selectOptions(
                                                "operational"
                                            )}
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.is_operational}
                                        />
                                    </div>

                                    {/* IS DRAIN LEAKING */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_drain_leaking"
                                            value="Drain Leaking"
                                        />

                                        <SelectInput
                                            id="is_drain_leaking"
                                            name="is_drain_leaking"
                                            className="mt-1 block w-full"
                                            value={data.is_drain_leaking}
                                            onChange={handleChange}
                                            withSelectName={false}
                                            options={selectOptions()}
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.is_drain_leaking
                                            }
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
                                            name="current_load"
                                            className="mt-1 block w-full"
                                            value={data.current_load}
                                            onChange={handleChange}
                                            inputMode="numeric"
                                            onFocus={handleFocus}
                                            placeholder="A"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.current_load}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* BLOWING TEMPERATURE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="blowing_temperature"
                                            value="Blowing Temperature"
                                        />

                                        <TextInput
                                            id="blowing_temperature"
                                            name="blowing_temperature"
                                            className="mt-1 block w-full"
                                            value={data.blowing_temperature}
                                            onChange={handleChange}
                                            inputMode="numeric"
                                            onFocus={handleFocus}
                                            placeholder="°C"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.blowing_temperature
                                            }
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
                                            name="ambient_temperature"
                                            className="mt-1 block w-full"
                                            value={data.ambient_temperature}
                                            onChange={handleChange}
                                            inputMode="numeric"
                                            onFocus={handleFocus}
                                            placeholder="°C"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.ambient_temperature
                                            }
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

                                        <SelectInput
                                            id="is_filter_clean"
                                            name="is_filter_clean"
                                            className="mt-1 block w-full"
                                            value={data.is_filter_clean}
                                            onChange={handleChange}
                                            withSelectName={false}
                                            options={selectOptions(
                                                "cleanliness"
                                            )}
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.is_filter_clean
                                            }
                                        />
                                    </div>

                                    {/* IS EVAPORATOR CLEAN */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_evaporator_clean"
                                            value="Evaporator"
                                        />

                                        <SelectInput
                                            id="is_evaporator_clean"
                                            name="is_evaporator_clean"
                                            className="mt-1 block w-full"
                                            value={data.is_evaporator_clean}
                                            onChange={handleChange}
                                            withSelectName={false}
                                            options={selectOptions(
                                                "cleanliness"
                                            )}
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.is_evaporator_clean
                                            }
                                        />
                                    </div>

                                    {/* IS CONDENSOR CLEAN */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_condensor_clean"
                                            value="Condensor"
                                        />

                                        <SelectInput
                                            id="is_condensor_clean"
                                            name="is_condensor_clean"
                                            className="mt-1 block w-full"
                                            value={data.is_condensor_clean}
                                            onChange={handleChange}
                                            withSelectName={false}
                                            options={selectOptions(
                                                "cleanliness"
                                            )}
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.is_condensor_clean
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
                                    {/* CLEANING FILTER */}
                                    <div>
                                        <InputLabel
                                            htmlFor="cleaning_filter"
                                            value="Filter"
                                        />

                                        <SelectInput
                                            id="cleaning_filter"
                                            name="cleaning_filter"
                                            className="mt-1 block w-full"
                                            value={data.cleaning_filter}
                                            onChange={handleChange}
                                            withSelectName={false}
                                            options={selectOptions()}
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.cleaning_filter
                                            }
                                        />
                                    </div>

                                    {/* CLEANING EVAPORATOR */}
                                    <div>
                                        <InputLabel
                                            htmlFor="cleaning_evaporator"
                                            value="Evaporator"
                                        />

                                        <SelectInput
                                            id="cleaning_evaporator"
                                            name="cleaning_evaporator"
                                            className="mt-1 block w-full"
                                            value={data.cleaning_evaporator}
                                            onChange={handleChange}
                                            withSelectName={false}
                                            options={selectOptions()}
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.cleaning_evaporator
                                            }
                                        />
                                    </div>

                                    {/* CLEANING CONDENSOR */}
                                    <div>
                                        <InputLabel
                                            htmlFor="cleaning_condensor"
                                            value="Condensor"
                                        />

                                        <SelectInput
                                            id="cleaning_condensor"
                                            name="cleaning_condensor"
                                            className="mt-1 block w-full"
                                            value={data.cleaning_condensor}
                                            onChange={handleChange}
                                            withSelectName={false}
                                            options={selectOptions()}
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={
                                                inputErrors.cleaning_condensor
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

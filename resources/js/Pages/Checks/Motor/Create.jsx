import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Temperatures from "./Partials/Temperatures";
import { selectOptions } from "@/Utils/Helper";

export default function Create({ auth, equipment_id }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm(`MotorCheck:${equipment_id}`, {
            equipment_id: equipment_id ?? "",
            is_operational: 1,
            is_clean: 1,
            number_of_greasing: "",
            temperature_de: "",
            temperature_body: "",
            temperature_nde: "",
            vibration_dev: "",
            vibration_deh: "",
            vibration_dea: "",
            vibration_def: "",
            is_noisy_de: 0,
            vibration_ndev: "",
            vibration_ndeh: "",
            vibration_ndef: "",
            is_noisy_nde: 0,
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
        post(route("motor-check.store"), {
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
                                Motor check {equipment_id}
                            </h2>
                            <p className="mt-1 text-sm">
                                Form daily check of motor equipment.
                            </p>
                        </div>
                    </div>
                </>
            }
        >
            <Head title="Motor Check" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <form
                        id={`MotorCheck:${equipment_id}`}
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

                                {/* OPERATIONAL AND CLEANLINESS */}
                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
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
                                            options={selectOptions(
                                                "operational"
                                            )}
                                            withSelectName={false}
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.is_operational}
                                        />
                                    </div>

                                    {/* CLEANLINESS */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_clean"
                                            value="Cleanliness"
                                        />

                                        <SelectInput
                                            id="is_clean"
                                            name="is_clean"
                                            className="mt-1 block w-full"
                                            value={data.is_clean}
                                            onChange={handleChange}
                                            withSelectName={false}
                                            options={selectOptions(
                                                "cleanliness"
                                            )}
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.is_clean}
                                        />
                                    </div>
                                </div>

                                {/* NUMBER OF GREASING */}
                                <div>
                                    <InputLabel
                                        htmlFor="number_of_greasing"
                                        value="Number of greasing"
                                    />

                                    <TextInput
                                        id="number_of_greasing"
                                        name="number_of_greasing"
                                        className="mt-1 block w-full"
                                        value={data.number_of_greasing}
                                        onChange={handleChange}
                                        inputMode="numeric"
                                        onFocus={(e) =>
                                            handleFocus(e.target.id)
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={inputErrors.number_of_greasing}
                                    />
                                </div>
                            </section>
                        </div>

                        {/* TEMPERATURES */}
                        <Temperatures
                            data={data}
                            setData={setData}
                            inputErrors={inputErrors}
                            handleChange={handleChange}
                            handleFocus={handleFocus}
                        />

                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                <h2 className="font-semibold text-lg leading-tight">
                                    Drive End Vibration
                                </h2>
                                {/* VIBRATION DE VERTICAL & HORIZONTAL */}
                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* DE VERTICAL */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_dev"
                                            value="DE Vertical"
                                        />

                                        <TextInput
                                            id="vibration_dev"
                                            name="vibration_dev"
                                            className="mt-1 block w-full"
                                            value={data.vibration_dev}
                                            onChange={handleChange}
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.vibration_dev}
                                        />
                                    </div>

                                    {/* DE HORIZONTAL */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_deh"
                                            value="DE Horizontal"
                                        />

                                        <TextInput
                                            id="vibration_deh"
                                            name="vibration_deh"
                                            className="mt-1 block w-full"
                                            value={data.vibration_deh}
                                            onChange={handleChange}
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.vibration_deh}
                                        />
                                    </div>
                                </div>

                                {/* VIBRATION AXIAL & FRAME */}
                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* DE AXIAL */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_dea"
                                            value="DE Axial"
                                        />

                                        <TextInput
                                            id="vibration_dea"
                                            name="vibration_dea"
                                            className="mt-1 block w-full"
                                            value={data.vibration_dea}
                                            onChange={handleChange}
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.vibration_dea}
                                        />
                                    </div>

                                    {/* DE FRAME */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_def"
                                            value="DE Frame"
                                        />

                                        <TextInput
                                            id="vibration_def"
                                            name="vibration_def"
                                            className="mt-1 block w-full"
                                            value={data.vibration_def}
                                            onChange={handleChange}
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.vibration_def}
                                        />
                                    </div>
                                </div>

                                {/* NOISE DE */}
                                <div>
                                    <InputLabel
                                        htmlFor="is_noisy_de"
                                        value="Noise DE"
                                    />

                                    <SelectInput
                                        id="is_noisy_de"
                                        name="is_noisy_de"
                                        className="mt-1 block w-full"
                                        value={data.is_noisy_de}
                                        onChange={handleChange}
                                        withSelectName={false}
                                        onFocus={handleFocus}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={inputErrors.is_noisy_de}
                                    />
                                </div>
                            </section>
                        </div>

                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                <h2 className="font-semibold text-lg leading-tight">
                                    Non Drive End Vibration
                                </h2>

                                {/* VIBRATION NDE VERTICAL, HORIZONTAL & FRAME */}
                                <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-xl">
                                    {/* NDE VERTICAL */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_ndev"
                                            value="NDE Vertical"
                                        />

                                        <TextInput
                                            id="vibration_ndev"
                                            name="vibration_ndev"
                                            className="mt-1 block w-full"
                                            value={data.vibration_ndev}
                                            onChange={handleChange}
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.vibration_ndev}
                                        />
                                    </div>

                                    {/* NDE HORIZONTAL */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_ndeh"
                                            value="NDE Horizontal"
                                        />

                                        <TextInput
                                            id="vibration_ndeh"
                                            name="vibration_ndeh"
                                            className="mt-1 block w-full"
                                            value={data.vibration_ndeh}
                                            onChange={handleChange}
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.vibration_ndeh}
                                        />
                                    </div>

                                    {/* NDE FRAME */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_ndef"
                                            value="NDE Frame"
                                        />

                                        <TextInput
                                            id="vibration_ndef"
                                            name="vibration_ndef"
                                            className="mt-1 block w-full"
                                            value={data.vibration_ndef}
                                            onChange={handleChange}
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={handleFocus}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={inputErrors.vibration_ndef}
                                        />
                                    </div>
                                </div>

                                {/* NOISE NDE */}
                                <div>
                                    <InputLabel
                                        htmlFor="is_noisy_nde"
                                        value="Noise NDE"
                                    />

                                    <SelectInput
                                        id="is_noisy_nde"
                                        name="is_noisy_nde"
                                        className="mt-1 block w-full"
                                        value={data.is_noisy_nde}
                                        onChange={handleChange}
                                        withSelectName={false}
                                        onFocus={handleFocus}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={inputErrors.is_noisy_nde}
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

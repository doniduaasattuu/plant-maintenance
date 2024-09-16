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
import Temperatures from "./Partials/Temperatures";

export default function Create({
    auth,
    can,
    operationalStatuses,
    cleanliness,
    normality,
    motorCheck,
}) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm(`MotorCheckEdit:${motorCheck.data.id}`, {
            equipment_id: motorCheck.data.equipment_id ?? "",
            operational_status_id: motorCheck.data.operational_status_id ?? "",
            cleanliness_id: motorCheck.data.cleanliness_id ?? "",
            number_of_greasing: motorCheck.data.number_of_greasing ?? "",
            temperature_de: motorCheck.data.temperature_de ?? "",
            temperature_body: motorCheck.data.temperature_body ?? "",
            temperature_nde: motorCheck.data.temperature_nde ?? "",
            vibration_dev: motorCheck.data.vibration_dev ?? "",
            vibration_deh: motorCheck.data.vibration_deh ?? "",
            vibration_dea: motorCheck.data.vibration_dea ?? "",
            vibration_def: motorCheck.data.vibration_def ?? "",
            noise_de: motorCheck.data.noise_de ?? "",
            vibration_ndev: motorCheck.data.vibration_ndev ?? "",
            vibration_ndeh: motorCheck.data.vibration_ndeh ?? "",
            vibration_ndef: motorCheck.data.vibration_ndef ?? "",
            noise_nde: motorCheck.data.noise_nde ?? "",
        });

    const [inputErrors, setInputErrors] = useState(errors);

    let statusLabel = {
        Active: "Running",
        Inactive: "Stop",
    };

    operationalStatuses = operationalStatuses.data.map((operational_status) => {
        const original = operational_status.keyword;

        return {
            value: operational_status.id,
            label: statusLabel[original],
        };
    });

    cleanliness = cleanliness.data.map((item) => {
        return {
            value: item.id,
            label: item.keyword,
        };
    });

    normality = normality.data.map((item) => {
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
        patch(route("motor-check.update", motorCheck.data.id), {
            preserveScroll: true,
            preserveState: true,
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
                                Edit Form
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
                        id={`MotorCheckEdit:${motorCheck.data.id}`}
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

                                {/* OPERATIONAL AND CLEANLINESS */}
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

                                    {/* CLEANLINESS */}
                                    <div>
                                        <InputLabel
                                            htmlFor="cleanliness_id"
                                            value="Cleanliness"
                                        />

                                        <SelectInput
                                            id="cleanliness_id"
                                            className="mt-1 block w-full"
                                            value={data.cleanliness_id}
                                            onChange={(e) =>
                                                setData(
                                                    "cleanliness_id",
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
                                            message={inputErrors.cleanliness_id}
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
                                        className="mt-1 block w-full"
                                        value={data.number_of_greasing}
                                        onChange={(e) =>
                                            setData(
                                                "number_of_greasing",
                                                e.target.value
                                            )
                                        }
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
                                            className="mt-1 block w-full"
                                            value={data.vibration_dev}
                                            onChange={(e) =>
                                                setData(
                                                    "vibration_dev",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
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
                                            className="mt-1 block w-full"
                                            value={data.vibration_deh}
                                            onChange={(e) =>
                                                setData(
                                                    "vibration_deh",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
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
                                            className="mt-1 block w-full"
                                            value={data.vibration_dea}
                                            onChange={(e) =>
                                                setData(
                                                    "vibration_dea",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
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
                                            className="mt-1 block w-full"
                                            value={data.vibration_def}
                                            onChange={(e) =>
                                                setData(
                                                    "vibration_def",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
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
                                        htmlFor="noise_de"
                                        value="Noise DE"
                                    />

                                    <SelectInput
                                        id="noise_de"
                                        className="mt-1 block w-full"
                                        value={data.noise_de}
                                        onChange={(e) =>
                                            setData("noise_de", e.target.value)
                                        }
                                        withSelectName={false}
                                        options={normality}
                                        onFocus={(e) =>
                                            handleFocus(e.target.id)
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={inputErrors.noise_de}
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
                                            className="mt-1 block w-full"
                                            value={data.vibration_ndev}
                                            onChange={(e) =>
                                                setData(
                                                    "vibration_ndev",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
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
                                            className="mt-1 block w-full"
                                            value={data.vibration_ndeh}
                                            onChange={(e) =>
                                                setData(
                                                    "vibration_ndeh",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
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
                                            className="mt-1 block w-full"
                                            value={data.vibration_ndef}
                                            onChange={(e) =>
                                                setData(
                                                    "vibration_ndef",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="mm/s"
                                            inputMode="numeric"
                                            onFocus={(e) =>
                                                handleFocus(e.target.id)
                                            }
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
                                        htmlFor="noise_nde"
                                        value="Noise NDE"
                                    />

                                    <SelectInput
                                        id="noise_nde"
                                        className="mt-1 block w-full"
                                        value={data.noise_nde}
                                        onChange={(e) =>
                                            setData("noise_nde", e.target.value)
                                        }
                                        withSelectName={false}
                                        options={normality}
                                        onFocus={(e) =>
                                            handleFocus(e.target.id)
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={inputErrors.noise_nde}
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
                            </section>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

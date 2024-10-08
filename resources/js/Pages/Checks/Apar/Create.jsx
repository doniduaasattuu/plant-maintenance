import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import Textarea from "@/Components/Textarea";
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
    goodness,
    rustiness,
}) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm(`AparCheck:${equipment_id}`, {
            equipment_id: equipment_id ?? "",
            seal: 1,
            weight: 1,
            pressure: 1,
            body: 1,
            remark: "",
        });

    function mapping(object) {
        const result = object.data.map((item) => {
            return {
                value: item.id,
                label: item.keyword,
            };
        });

        return result;
    }

    goodness = mapping(goodness);
    rustiness = mapping(rustiness);

    function submit(e) {
        e.preventDefault();
        post(route("apar-check.store"), {
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
                                Apar check {equipment_id}
                            </h2>
                            <p className="mt-1 text-sm">
                                Form daily check of fire extinguisher.
                            </p>
                        </div>
                    </div>
                </>
            }
        >
            <Head title="Apar Check" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <form
                        id={`AparCheck:${equipment_id}`}
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
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.equipment_id}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* SEAL */}
                                    <div>
                                        <InputLabel
                                            htmlFor="seal"
                                            value="Seal"
                                        />

                                        <SelectInput
                                            id="seal"
                                            className="mt-1 block w-full"
                                            value={data.seal}
                                            onChange={(e) =>
                                                setData("seal", e.target.value)
                                            }
                                            withSelectName={false}
                                            options={goodness}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.seal}
                                        />
                                    </div>

                                    {/* WEIGHT */}
                                    <div>
                                        <InputLabel
                                            htmlFor="weight"
                                            value="Weight"
                                        />

                                        <SelectInput
                                            id="weight"
                                            className="mt-1 block w-full"
                                            value={data.weight}
                                            onChange={(e) =>
                                                setData(
                                                    "weight",
                                                    e.target.value
                                                )
                                            }
                                            withSelectName={false}
                                            options={goodness}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.weight}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* PRESSURE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="pressure"
                                            value="Pressure"
                                        />

                                        <SelectInput
                                            id="pressure"
                                            className="mt-1 block w-full"
                                            value={data.pressure}
                                            onChange={(e) =>
                                                setData(
                                                    "pressure",
                                                    e.target.value
                                                )
                                            }
                                            withSelectName={false}
                                            options={goodness}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.pressure}
                                        />
                                    </div>

                                    {/* BODY */}
                                    <div>
                                        <InputLabel
                                            htmlFor="body"
                                            value="Body"
                                        />

                                        <SelectInput
                                            id="body"
                                            className="mt-1 block w-full"
                                            value={data.body}
                                            onChange={(e) =>
                                                setData("body", e.target.value)
                                            }
                                            withSelectName={false}
                                            options={rustiness}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.body}
                                        />
                                    </div>
                                </div>

                                {/* REMARK */}
                                <div>
                                    <InputLabel
                                        htmlFor="remark"
                                        value="Remark"
                                    />

                                    <Textarea
                                        id="remark"
                                        className="mt-1 block w-full textarea textarea-bordered h-24"
                                        value={data.remark}
                                        onChange={(e) =>
                                            setData("remark", e.target.value)
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.remark}
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

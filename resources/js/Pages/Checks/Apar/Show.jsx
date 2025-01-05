import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import Textarea from "@/Components/Textarea";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { selectOptions } from "@/Utils/Helper";
import { Head, useForm } from "@inertiajs/react";

export default function Show({ auth, aparCheck }) {
    const equipment_id = aparCheck.data.equipment_id;
    const { data } = useForm(`AparCheck:${aparCheck.data.equipment_id}`, {
        equipment_id: aparCheck.data.equipment_id ?? "",
        is_seal_ok: aparCheck.data.is_seal_ok ?? "",
        is_weight_ok: aparCheck.data.is_weight_ok ?? "",
        is_pressure_ok: aparCheck.data.is_pressure_ok ?? "",
        is_body_ok: aparCheck.data.is_body_ok ?? "",
        remark: aparCheck.data.remark ?? "",
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-xl leading-tight">
                                Show Apar Check
                            </h2>
                            <p className="mt-1 text-sm">
                                Displayed single check of equipment.
                            </p>
                        </div>
                    </div>
                </>
            }
        >
            <Head title="Apar Check" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <section
                        id={`AparCheck:${equipment_id}`}
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
                                </div>

                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* SEAL */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_seal_ok"
                                            value="Seal"
                                        />

                                        <TextInput
                                            id="is_seal_ok"
                                            name="is_seal_ok"
                                            className="mt-1 block w-full"
                                            value={
                                                data.is_seal_ok
                                                    ? "Good"
                                                    : "Not Good"
                                            }
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* WEIGHT */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_weight_ok"
                                            value="Weight"
                                        />

                                        <TextInput
                                            id="is_weight_ok"
                                            name="is_weight_ok"
                                            className="mt-1 block w-full"
                                            value={
                                                data.is_weight_ok
                                                    ? "Good"
                                                    : "Not Good"
                                            }
                                            readOnly={true}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* PRESSURE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_pressure_ok"
                                            value="Pressure"
                                        />

                                        <TextInput
                                            id="is_pressure_ok"
                                            name="is_pressure_ok"
                                            className="mt-1 block w-full"
                                            value={
                                                data.is_pressure_ok
                                                    ? "Good"
                                                    : "Not Good"
                                            }
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* BODY */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_body_ok"
                                            value="Body"
                                        />

                                        <TextInput
                                            id="is_body_ok"
                                            name="is_body_ok"
                                            className="mt-1 block w-full"
                                            value={
                                                data.is_body_ok
                                                    ? "Good"
                                                    : "Not Good"
                                            }
                                            readOnly={true}
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
                                        name="remark"
                                        className="mt-1 block w-full textarea textarea-bordered h-24"
                                        value={data.remark}
                                    />
                                </div>
                            </section>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

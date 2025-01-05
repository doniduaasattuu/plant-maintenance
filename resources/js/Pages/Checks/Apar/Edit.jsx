import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import Textarea from "@/Components/Textarea";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { selectOptions } from "@/Utils/Helper";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ auth, can, aparCheck }) {
    const equipment_id = aparCheck.data.equipment_id;
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm(`AparCheck:${aparCheck.data.equipment_id}`, {
            equipment_id: aparCheck.data.equipment_id ?? "",
            is_seal_ok: aparCheck.data.is_seal_ok ?? "",
            is_weight_ok: aparCheck.data.is_weight_ok ?? "",
            is_pressure_ok: aparCheck.data.is_pressure_ok ?? "",
            is_body_ok: aparCheck.data.is_body_ok ?? "",
            remark: aparCheck.data.remark ?? "",
        });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    function submit(e) {
        e.preventDefault();
        patch(route("apar-check.update", aparCheck.data.id), {
            preserveState: true,
            preserveScroll: true,
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
                                Edit Form
                            </h2>
                            <p className="mt-1 text-sm">
                                Edit data check of fire extinguisher.
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
                                        name="equipment_id"
                                        className="mt-1 block w-full"
                                        value={data.equipment_id}
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
                                            htmlFor="is_seal_ok"
                                            value="Seal"
                                        />

                                        <SelectInput
                                            id="is_seal_ok"
                                            name="is_seal_ok"
                                            className="mt-1 block w-full"
                                            value={data.is_seal_ok}
                                            onChange={handleChange}
                                            withSelectName={false}
                                            options={selectOptions("goodness")}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.is_seal_ok}
                                        />
                                    </div>

                                    {/* WEIGHT */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_weight_ok"
                                            value="Weight"
                                        />

                                        <SelectInput
                                            id="is_weight_ok"
                                            name="is_weight_ok"
                                            className="mt-1 block w-full"
                                            value={data.is_weight_ok}
                                            onChange={handleChange}
                                            withSelectName={false}
                                            options={selectOptions("goodness")}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.is_weight_ok}
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

                                        <SelectInput
                                            id="is_pressure_ok"
                                            name="is_pressure_ok"
                                            className="mt-1 block w-full"
                                            value={data.is_pressure_ok}
                                            onChange={handleChange}
                                            withSelectName={false}
                                            options={selectOptions("goodness")}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.is_pressure_ok}
                                        />
                                    </div>

                                    {/* BODY */}
                                    <div>
                                        <InputLabel
                                            htmlFor="is_body_ok"
                                            value="Body"
                                        />

                                        <SelectInput
                                            id="is_body_ok"
                                            name="is_body_ok"
                                            className="mt-1 block w-full"
                                            value={data.is_body_ok}
                                            onChange={handleChange}
                                            withSelectName={false}
                                            options={selectOptions("goodness")}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.is_body_ok}
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
                                        onChange={handleChange}
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

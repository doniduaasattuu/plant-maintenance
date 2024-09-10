import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Create({ auth, classifications, equipment_status }) {
    classifications = classifications.data.map((classification) => {
        return {
            value: classification.id,
            label: classification.description,
        };
    });

    equipment_status = equipment_status.data.map((status) => {
        return {
            value: status.id,
            label: status.keyword,
        };
    });

    const {
        data,
        setData,
        post,
        errors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm("CreateEquipment", {
        id: "",
        classification_id: "",
        functional_location_id: "",
        sort_field: "",
        description: "",
        equipment_status_id: 1,
    });

    function submit(e) {
        e.preventDefault();
        post(route("equipments.store"), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Create Equipment
                </h2>
            }
        >
            <Head title="Create equipment" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <h2 className="text-lg font-medium">
                                New equipment
                            </h2>

                            <p className="mt-1 text-sm">
                                Register new equipment and information.
                            </p>

                            <form
                                id="CreateEquipment"
                                onSubmit={submit}
                                className="mt-6 space-y-6"
                            >
                                {/* ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="id"
                                        value="Equipment ID*"
                                    />

                                    <TextInput
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={data.id}
                                        onChange={(e) =>
                                            setData("id", e.target.value)
                                        }
                                        required
                                        maxLength="9"
                                        autoComplete="id"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.id}
                                    />
                                </div>

                                {/* CLASSIFICATION */}
                                <div>
                                    <InputLabel
                                        htmlFor="classification_id"
                                        value="Classification*"
                                    />
                                    <SelectInput
                                        id="classification_id"
                                        className="mt-1 block w-sm"
                                        value={data.classification_id}
                                        onChange={(e) => {
                                            setData(
                                                "classification_id",
                                                e.target.value
                                            );
                                        }}
                                        required
                                        options={classifications}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.classification_id}
                                    />
                                </div>

                                {/* EQUIPMENT STATUS */}
                                <div>
                                    <InputLabel
                                        htmlFor="equipment_status_id"
                                        value="Status*"
                                    />
                                    <SelectInput
                                        id="equipment_status_id"
                                        className="mt-1 block w-sm"
                                        value={data.equipment_status_id}
                                        withSelectName={false}
                                        onChange={(e) => {
                                            setData(
                                                "equipment_status_id",
                                                e.target.value
                                            );
                                        }}
                                        required
                                        options={equipment_status}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.equipment_status_id}
                                    />
                                </div>

                                {/* FUNCTIONAL LOCATION ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="functional_location_id"
                                        value={
                                            data.equipment_status_id == 2
                                                ? "Functional location*"
                                                : "Functional location"
                                        }
                                    />

                                    <TextInput
                                        id="functional_location_id"
                                        className="mt-1 block w-sm"
                                        value={data.functional_location_id}
                                        onChange={(e) => {
                                            setData(
                                                "functional_location_id",
                                                e.target.value
                                            );
                                        }}
                                        required={data.equipment_status_id == 2}
                                        maxLength="25"
                                        autoComplete="functional_location_id"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.functional_location_id}
                                    />
                                </div>

                                {/* SORT FIELD */}
                                <div>
                                    <InputLabel
                                        htmlFor="sort_field"
                                        value="Sort field"
                                    />

                                    <TextInput
                                        id="sort_field"
                                        className="mt-1 block w-full"
                                        value={data.sort_field}
                                        onChange={(e) =>
                                            setData(
                                                "sort_field",
                                                e.target.value
                                            )
                                        }
                                        required={
                                            data.functional_location_id != ""
                                                ? true
                                                : undefined
                                        }
                                        maxLength="50"
                                        autoComplete="sort_field"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.sort_field}
                                    />
                                </div>

                                {/* DESCRIPTION */}
                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />

                                    <TextInput
                                        id="description"
                                        className="mt-1 block w-full"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        required={
                                            data.functional_location_id != ""
                                                ? true
                                                : undefined
                                        }
                                        maxLength="100"
                                        autoComplete="description"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
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
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

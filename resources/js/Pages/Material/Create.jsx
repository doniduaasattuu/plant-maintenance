import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

export default function Create({ auth, can, unitOfMeasurements }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm("CreateMaterial", {
            id: "",
            title: "",
            price: "",
            unit_of_measurement_id: "",
        });

    function submit(e) {
        e.preventDefault();
        post(route("materials.store"), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }

    unitOfMeasurements = unitOfMeasurements.data.map((measurement) => {
        return {
            value: measurement.id,
            label: measurement.keyword,
        };
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Create Material
                </h2>
            }
        >
            <Head title="Create material" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium">
                                        New Material
                                    </h2>

                                    <p className="mt-1 text-sm">
                                        Create new material data and
                                        information.
                                    </p>
                                </div>

                                {/* <Actions
                                    material={material}
                                    can={can}
                                    links={links}
                                /> */}
                            </div>
                            <form
                                id="CreateMaterial"
                                onSubmit={submit}
                                className="mt-6 space-y-6"
                            >
                                {/* ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="id"
                                        value="Material ID*"
                                    />

                                    <TextInput
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={data.id}
                                        onChange={(e) =>
                                            setData("id", e.target.value)
                                        }
                                        required
                                        inputMode="numeric"
                                        maxLength="8"
                                        autoComplete="id"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.id}
                                    />
                                </div>

                                {/* TITLE */}
                                <div>
                                    <InputLabel
                                        htmlFor="title"
                                        value="Title*"
                                    />

                                    <TextInput
                                        title="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        required
                                        autoComplete="title"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.title}
                                    />
                                </div>

                                {/* UNIT OF MEASUREMENT */}
                                <div>
                                    <InputLabel
                                        htmlFor="unit_of_measurement_id"
                                        value="UoM"
                                    />
                                    <SelectInput
                                        id="unit_of_measurement_id"
                                        className="mt-1 block w-sm"
                                        value={data.unit_of_measurement_id}
                                        onChange={(e) => {
                                            setData(
                                                "unit_of_measurement_id",
                                                e.target.value
                                            );
                                        }}
                                        options={unitOfMeasurements}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.unit_of_measurement_id}
                                    />
                                </div>

                                {/* PRICE */}
                                <div>
                                    <InputLabel
                                        htmlFor="price"
                                        value="Price (IDR)"
                                    />

                                    <TextInput
                                        price="price"
                                        className="mt-1 block w-full"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        inputMode="numeric"
                                        autoComplete="price"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.price}
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

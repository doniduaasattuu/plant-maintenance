import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import SecondaryButton from "@/Components/SecondaryButton";
import MultiSelect from "@/Components/MultiSelect";
import DangerButton from "@/Components/DangerButton";
import { useState } from "react";
import ModalConfirm from "@/Components/ModalConfirm";

export default function Edit({ auth, can, functional_location }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm(`EditFunctionalLocation:${functional_location.id}`, {
            id: functional_location.data.id ?? "",
            description: functional_location.data.description ?? "",
        });

    function submit(e) {
        e.preventDefault();
        patch(
            route("functional-locations.update", functional_location.data.id),
            {
                preserveScroll: true,
            }
        );
    }

    // DELETE FUNCTIONAL LOCATION
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFuncloc, setSelectedFuncloc] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openDeleteConfirm = (id) => {
        setSelectedFuncloc(id);
        setIsOpen(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Edit Functional Location
                </h2>
            }
        >
            <Head title="Edit Functional Location" />

            <ModalConfirm
                isOpen={isOpen}
                closeModal={closeModal}
                id={selectedFuncloc}
                message={
                    "Once this functional location is deleted, all of its resources and data will be permanently deleted."
                }
                method={"delete"}
                url={"functional-locations.destroy"}
            />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <h2 className="text-lg font-medium">
                                Edit Functional Location
                            </h2>

                            <p className="mt-1 text-sm">
                                Edit functional location, information and
                                related equipment.
                            </p>

                            <form
                                id={`EditFunctionalLocation:${functional_location.id}`}
                                onSubmit={submit}
                                className="mt-6 space-y-6"
                            >
                                {/* ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="id"
                                        value="Functional location ID*"
                                    />

                                    <TextInput
                                        id="id"
                                        className="mt-1 block w-full"
                                        value={data.id}
                                        onChange={(e) =>
                                            setData("id", e.target.value)
                                        }
                                        required
                                        maxLength="25"
                                        autoComplete="id"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.id}
                                    />
                                </div>

                                {/* DESCRIPTION */}
                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description*"
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
                                        required
                                        maxLength="100"
                                        autoComplete="description"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Link
                                        onClick={() => {
                                            history.back();
                                        }}
                                    >
                                        <SecondaryButton>Back</SecondaryButton>
                                    </Link>

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
                            </form>
                        </section>
                    </div>

                    {functional_location.data.equipments.length > 0 && (
                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-lg font-medium">
                                            Equipments
                                        </h2>

                                        <p className="mt-1 text-sm">
                                            A list of all installed equipment.
                                        </p>
                                    </div>
                                    <div>
                                        <Link
                                            preserveScroll
                                            href={route(
                                                "functional-locations.edit",
                                                functional_location?.data?.id
                                            )}
                                            className="py-2"
                                        >
                                            <span className="text-sm mx-4 text-blue-500 underline underline-offset-2">
                                                Refresh
                                            </span>
                                            {/* <PrimaryButton>
                                                Refresh
                                            </PrimaryButton> */}
                                        </Link>
                                    </div>
                                </div>

                                <ul className="menu bg-base-200 rounded-box p-0 mt-6 mx-0">
                                    {functional_location.data.equipments.map(
                                        (equipment) => {
                                            return (
                                                <li key={equipment.id}>
                                                    <div className="flex justify-between">
                                                        <Link
                                                            className="hover:link hover:text-blue-500 hover:underline-offset-2"
                                                            href={route(
                                                                "equipments.edit",
                                                                equipment.id
                                                            )}
                                                        >
                                                            {equipment.id}
                                                        </Link>
                                                        <div>
                                                            {
                                                                equipment.sort_field
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }
                                    )}

                                    {/* <li>
                                        <details>
                                            <summary>EMO000123</summary>
                                            <ul>
                                                <li>
                                                    <a className="flex justify-between bg-base-300">
                                                        <div>EMO000123</div>
                                                        <div>
                                                            Equipment sort field
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </details>
                                    </li> */}
                                </ul>
                            </section>
                        </div>
                    )}

                    {can.functional_location_delete && (
                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                <header>
                                    <h2 className="text-lg font-medium">
                                        Delete Functional Location
                                    </h2>

                                    <p className="mt-1 text-sm">
                                        Once this functional location is
                                        deleted, all related equipment will be
                                        set to null, and data will be
                                        permanently deleted. Before deleting
                                        this functional location, please
                                        download any data or information that
                                        you wish to retain.
                                    </p>
                                </header>

                                <DangerButton
                                    onClick={() =>
                                        openDeleteConfirm(
                                            functional_location.data.id
                                        )
                                    }
                                >
                                    Delete Functional Location
                                </DangerButton>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

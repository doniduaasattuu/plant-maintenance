import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { useState } from "react";
import ModalConfirm from "@/Components/ModalConfirm";
import EquipmentList from "./EquipmentList";

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
                preserveState: true,
                replace: true,
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
                <>
                    <h2 className="font-semibold text-xl leading-tight">
                        Edit Functional Location
                    </h2>
                </>
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
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium">
                                        Functional Location
                                    </h2>

                                    <p className="mt-1 text-sm">
                                        Update data and information.
                                    </p>
                                </div>

                                {can.functional_location_edit &&
                                    !route().current().includes("edit") && (
                                        <div
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.get(
                                                    route(
                                                        "functional_locations.edit",
                                                        {
                                                            search: functional_location
                                                                .data.id,
                                                        }
                                                    )
                                                );
                                            }}
                                            className="py-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="size-4"
                                            >
                                                <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                                                <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                                            </svg>
                                            Edit
                                        </div>
                                    )}
                            </div>
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

                                {can.functional_location_update && (
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
                                )}
                            </form>
                        </section>
                    </div>

                    {functional_location.data.equipments.length > 0 && (
                        <EquipmentList
                            functional_location={functional_location}
                            can={can}
                        />
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

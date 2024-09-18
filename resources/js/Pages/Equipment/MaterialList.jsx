import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { Link, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import AsyncSelect from "react-select/async";

export default function MaterialList({ can, equipment }) {
    function EquipmentList() {
        return (
            <ul className="menu bg-base-200 rounded-box p-0 mt-6 mx-0">
                {equipment.data.materials.map((material) => {
                    return (
                        <li key={material.id}>
                            <div className="flex justify-between">
                                {can.material_show ? (
                                    <Link
                                        preserveScroll
                                        className="link text-blue-500 underline-offset-2"
                                        href={route(
                                            "materials.show",
                                            material.id
                                        )}
                                    >
                                        {material.id}
                                    </Link>
                                ) : (
                                    <div>{material.id}</div>
                                )}
                                <p className="w-48 sm:w-max truncate overflow-hidden opacity-50">
                                    {material.title}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }

    const selectedMaterials = equipment.data.materials.map((material) => {
        return {
            value: material.id,
            label: material.id,
        };
    });

    const [editing, setEditing] = useState(false);
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm(`MaterialEdit:${equipment.data.id}`, {
            id: equipment.data.id ?? "",
            selectedMaterials: selectedMaterials,
        });

    function submit(e) {
        e.preventDefault();
        patch(route("material-equipment.update", equipment.data.id), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            onSuccess: () => {
                router.visit(window.location.href, {
                    preserveScroll: true,
                });
            },
        });
    }

    // ASYNC
    const loadOptions = (inputValue, callback) => {
        if (!inputValue) {
            callback([]);
            return;
        }

        axios
            .get(`/materials?search=${inputValue}`)
            .then((response) => {
                const options = response.data.map((item) => ({
                    value: item.id, // the value selected
                    label: item.id, // what is displayed in the dropdown
                }));
                callback(options);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                callback([]);
            });
    };

    function MaterialEditForm() {
        return (
            <form
                id={`MaterialEdit:${equipment.data.id}`}
                onSubmit={submit}
                className="mt-6 space-y-6"
            >
                <div>
                    <InputLabel htmlFor="selectedMaterials" value="Materials" />

                    <AsyncSelect
                        id="selectedMaterials"
                        className="mt-1 block w-full"
                        isMulti={true}
                        loadOptions={loadOptions}
                        defaultValue={data.selectedMaterials}
                        onChange={(selectedMaterials) => {
                            setData("selectedMaterials", selectedMaterials);
                        }}
                    />

                    <InputError className="mt-2" message={errors.materials} />
                </div>

                <div className="flex items-center gap-4">
                    {/* <SecondaryButton
                        onClick={() => {
                            setEditing(false);
                        }}
                    >
                        Close
                    </SecondaryButton> */}

                    <PrimaryButton disabled={processing}>Update</PrimaryButton>

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
        );
    }

    return (
        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
            <section className="max-w-xl">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-medium">
                            {editing ? "Update Materials" : "Materials"}
                        </h2>

                        <p className="mt-1 text-sm">
                            A list of materials that used in this equipment.
                        </p>
                    </div>
                    <div>
                        {route().current().includes("edit") &&
                            can.material_edit && (
                                <div
                                    onClick={() => {
                                        setEditing(!editing);
                                    }}
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle"
                                >
                                    {editing ? (
                                        // BACK BUTTON
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="size-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : equipment.data.materials.length < 1 ? (
                                        // ADD BUTTON
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        // EDIT BUTTON
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="size-5"
                                        >
                                            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                                        </svg>
                                    )}
                                </div>
                            )}
                    </div>
                </div>

                {editing ? <MaterialEditForm /> : <EquipmentList />}
            </section>
        </div>
    );
}

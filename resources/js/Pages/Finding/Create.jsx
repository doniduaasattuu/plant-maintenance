import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import SecondaryButton from "@/Components/SecondaryButton";
import Textarea from "@/Components/Textarea";
import FileInput from "@/Components/FileInput";
import InputHelper from "@/Components/InputHelper";
import { useState } from "react";
import DateInput from "@/Components/DateInput";
import { date } from "@/Utils/Helper";
import { useEffect } from "react";

export default function Create({
    auth,
    can,
    findingStatuses,
    equipment_id,
    functional_location_id,
}) {
    const uploadMaxFilesize = usePage().props.upload_max_filesize * 1024;

    findingStatuses = findingStatuses.data.map((status) => {
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
    } = useForm("CreateFinding", {
        finding_status_id: 1,
        equipment_id: equipment_id ?? "",
        functional_location_id: functional_location_id ?? "",
        description: "",
        notification: "",
        attachment_before: [],
        attachment_after: [],
        created_at: date(),
        updated_at: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("findings.store"), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }

    const [inputErrors, setInputErrors] = useState(errors);

    useEffect(() => {
        setInputErrors(errors);
    }, [errors]);

    const handleFocus = (e) => {
        setInputErrors({ ...inputErrors, [e.target.name]: null });
    };

    // function validateFileSize(e, field) {
    //     errors[field] = "";

    //     const files = e.target.files;

    //     for (let i = 0; i < files.length; i++) {
    //         if (files[i].size > uploadMaxFilesize) {
    //             errors.field = `The attachment field must not be greater than ${uploadMaxFilesize / 1024
    //                 } kilobytes.`;
    //         }
    //     }
    //     setData(field, files);
    //     console.info(files);
    // }

    function resetUpdatedAtField() {
        setData("updated_at", "");
        document.getElementById("updated_at").value = "";
    }

    function resetFieldsValue() {
        resetUpdatedAtField();
    }

    useEffect(() => {
        if (data.finding_status_id != 2) {
            resetFieldsValue();
        }
    }, [data.finding_status_id]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Create Finding
                </h2>
            }
        >
            <Head title="Create finding" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <h2 className="text-lg font-medium">New Finding</h2>

                            <p className="mt-1 text-sm">Create new finding.</p>

                            <form
                                id="CreateFinding"
                                name="CreateFinding"
                                onSubmit={submit}
                                className="mt-6 space-y-6"
                            >
                                {/* FINDING STATUS */}
                                <div>
                                    <InputLabel
                                        htmlFor="finding_status_id"
                                        value="Status*"
                                    />
                                    <SelectInput
                                        id="finding_status_id"
                                        name="finding_status_id"
                                        className="mt-1 block w-sm"
                                        value={data.finding_status_id}
                                        withSelectName={false}
                                        onChange={(e) => {
                                            setData(
                                                "finding_status_id",
                                                e.target.value
                                            );
                                        }}
                                        required
                                        options={findingStatuses}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.finding_status_id}
                                    />
                                </div>

                                {/* EQUIPMENT ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="equipment_id"
                                        value="Equipment ID"
                                    />

                                    <TextInput
                                        id="equipment_id"
                                        name="equipment_id"
                                        className="mt-1 block w-full"
                                        value={data.equipment_id}
                                        onChange={(e) =>
                                            setData(
                                                "equipment_id",
                                                e.target.value
                                            )
                                        }
                                        maxLength="9"
                                        autoComplete="equipment_id"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.equipment_id}
                                    />
                                </div>

                                {/* FUNCTIONAL LOCATION ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="functional_location_id"
                                        value="Functional location ID"
                                    />

                                    <TextInput
                                        id="functional_location_id"
                                        name="functional_location_id"
                                        className="mt-1 block w-full"
                                        value={data.functional_location_id}
                                        onChange={(e) =>
                                            setData(
                                                "functional_location_id",
                                                e.target.value
                                            )
                                        }
                                        maxLength="50"
                                        autoComplete="functional_location_id"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.functional_location_id}
                                    />
                                </div>

                                {/* NOTIFICATION */}
                                <div>
                                    <InputLabel
                                        htmlFor="notification"
                                        value="Notification"
                                    />

                                    <TextInput
                                        id="notification"
                                        name="notification"
                                        className="mt-1 block w-full"
                                        value={data.notification}
                                        onChange={(e) =>
                                            setData(
                                                "notification",
                                                e.target.value
                                            )
                                        }
                                        inputMode="numeric"
                                        maxLength="8"
                                        autoComplete="notification"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.notification}
                                    />
                                </div>

                                {/* DESCRIPTION */}
                                <div>
                                    <label className="form-control w-full">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Description*"
                                        />

                                        <Textarea
                                            id="description"
                                            name="description"
                                            className="mt-1 block w-full textarea textarea-bordered h-24"
                                            placeholder="Finding description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.description}
                                        />
                                    </label>
                                </div>

                                {/* ATTACHMENT BEFORE */}
                                <div>
                                    <label className="form-control w-full">
                                        <InputLabel
                                            htmlFor="attachment_before"
                                            value="Attachment before*"
                                        />

                                        <FileInput
                                            accept="image/png, image/jpeg, image/jpg"
                                            id="attachment_before"
                                            name="attachment_before"
                                            className="mt-1 block w-full"
                                            required
                                            multiple
                                            onChange={(e) => {
                                                const files = Array.from(
                                                    e.target.files
                                                );
                                                setData(
                                                    "attachment_before",
                                                    files
                                                );
                                            }}
                                            onFocus={handleFocus}
                                        />

                                        {errors &&
                                            Object.keys(errors)
                                                .filter((key) =>
                                                    key.startsWith(
                                                        "attachment_before"
                                                    )
                                                ) // Only show errors for attachment_before
                                                .map((key, index) => (
                                                    <InputError
                                                        key={index}
                                                        className="mt-2"
                                                        message={errors[key]} // Display the error message for the specific file
                                                    />
                                                ))}
                                    </label>
                                </div>

                                {/* ATTACHMENT AFTER */}
                                <label className="form-control w-full">
                                    <InputLabel
                                        htmlFor="attachment_after"
                                        value={
                                            data.finding_status_id == 2
                                                ? "Attachment after*"
                                                : "Attachment after"
                                        }
                                    />

                                    <FileInput
                                        accept="image/png, image/jpeg, image/jpg"
                                        id="attachment_after"
                                        name="attachment_after"
                                        className="mt-1 block w-full"
                                        onChange={(e) => {
                                            const files = Array.from(
                                                e.target.files
                                            );
                                            setData("attachment_after", files);
                                        }}
                                        disabled={data.finding_status_id != 2}
                                        required={data.finding_status_id == 2}
                                        multiple
                                    />

                                    {errors &&
                                        Object.keys(errors)
                                            .filter((key) =>
                                                key.startsWith(
                                                    "attachment_after"
                                                )
                                            ) // Only show errors for attachment_after
                                            .map((key, index) => (
                                                <InputError
                                                    key={index}
                                                    className="mt-2"
                                                    message={errors[key]} // Display the error message for the specific file
                                                />
                                            ))}
                                </label>

                                {/* CREATED AT */}
                                <div>
                                    <InputLabel
                                        htmlFor="created_at"
                                        value="Date created*"
                                    />

                                    <DateInput
                                        id="created_at"
                                        name="created_at"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.created_at}
                                        onChange={(e) =>
                                            setData(
                                                "created_at",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.created_at}
                                    />
                                </div>

                                {/* UPDATED AT */}
                                <div>
                                    <InputLabel
                                        htmlFor="updated_at"
                                        value={
                                            data.finding_status_id == 2
                                                ? "Date completed*"
                                                : "Date completed"
                                        }
                                    />

                                    <DateInput
                                        id="updated_at"
                                        name="updated_at"
                                        type="date"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "updated_at",
                                                e.target.value
                                            )
                                        }
                                        disabled={data.finding_status_id != 2}
                                        required={data.finding_status_id == 2}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.updated_at}
                                    />
                                </div>

                                {can.finding_create && (
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
                                )}
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

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

export default function Create({ auth, can, findingStatuses, equipment_id, functional_location_id }) {
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
        attachment_before: "",
        attachment_after: "",
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

    // VALIDATE FILE SIZE
    let [fileSize0, setFileSize0] = useState("");
    let [fileSize1, setFileSize1] = useState("");

    function validateFileSize(e, setter, field) {
        errors[field] = "";
        setter("");

        if (e.target.files[0].size > uploadMaxFilesize) {
            errors.attachment = `The attachment field must not be greater than ${uploadMaxFilesize / 1024
                } kilobytes.`;
        } else {
            setter(
                `File size: ${Math.round(
                    e.target.files[0].size / 1024
                )} kilobytes.`
            );
        }
        setData(field, e.target.files[0]);
    }

    function resetAttachmentAfterField() {
        setData("attachment_after", "");
        document.getElementById("attachment_after").value = "";
        setFileSize1("");
    }

    function resetUpdatedAtField() {
        setData("updated_at", "");
        document.getElementById("updated_at").value = "";
    }

    function resetFieldsValue() {
        resetUpdatedAtField();
        resetAttachmentAfterField();
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
                                        className="mt-1 block w-sm"
                                        value={data.finding_status_id}
                                        withSelectName={false}
                                        onChange={(e) => {
                                            // if (e.target.value == 1) {
                                            //     resetAttachmentAfter();
                                            // }

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
                                        className="mt-1 block w-full"
                                        value={data.functional_location_id}
                                        onChange={(e) =>
                                            setData(
                                                "functional_location_id",
                                                e.target.value
                                            )
                                        }
                                        maxLength="25"
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
                                            className="mt-1 block w-full"
                                            required
                                            onChange={(e) =>
                                                validateFileSize(
                                                    e,
                                                    setFileSize0,
                                                    "attachment_before"
                                                )
                                            }
                                        />

                                        {!errors.attachment_before ? (
                                            <InputHelper
                                                className="mt-2"
                                                message={fileSize0}
                                            />
                                        ) : (
                                            <InputError
                                                className="mt-2"
                                                message={
                                                    errors.attachment_before
                                                }
                                            />
                                        )}
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
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            validateFileSize(
                                                e,
                                                setFileSize1,
                                                "attachment_after"
                                            )
                                        }
                                        disabled={data.finding_status_id != 2}
                                        required={data.finding_status_id == 2}
                                    />

                                    {!errors.attachment_after ? (
                                        <InputHelper
                                            className="mt-2"
                                            message={fileSize1}
                                        />
                                    ) : (
                                        <InputError
                                            className="mt-2"
                                            message={errors.attachment_after}
                                        />
                                    )}
                                </label>

                                {/* CREATED AT */}
                                <div>
                                    <InputLabel
                                        htmlFor="created_at"
                                        value="Date created*"
                                    />

                                    <DateInput
                                        id="created_at"
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

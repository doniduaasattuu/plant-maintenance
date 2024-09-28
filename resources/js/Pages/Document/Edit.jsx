import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import FileInput from "@/Components/FileInput";
import { useState } from "react";
import InputHelper from "@/Components/InputHelper";

export default function Edit({ auth, can, document }) {
    const uploadMaxFilesize = usePage().props.upload_max_filesize * 1024;
    const { data, setData } = useForm("EditDocument", {
        id: document.data.id,
        title: document.data.title,
        attachment: "",
    });
    let [fileSize, setFileSize] = useState("");

    const { errors } = usePage().props;
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);
    const [processing, setProcessing] = useState(false);

    function submit(e) {
        setProcessing(true);
        e.preventDefault();
        router.post(
            route("documents.update", document.data.id),
            {
                _method: "patch",
                ...data,
            },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onSuccess: () => {
                    setRecentlySuccessful(true);
                    setTimeout(() => {
                        setRecentlySuccessful(false);
                    }, 2000);
                },
                onFinish: () => {
                    setProcessing(false);
                },
            }
        );
    }

    // VALIDATE FILE SIZE
    function validateFileSize(e) {
        setProcessing(false);
        errors.attachment = "";
        setFileSize("");

        if (e.target.files[0].size > uploadMaxFilesize) {
            setProcessing(true);
            errors.attachment = `The attachment field must not be greater than ${
                uploadMaxFilesize / 1024
            } kilobytes.`;
        } else {
            setFileSize(
                `File size: ${Math.round(
                    e.target.files[0].size / 1024
                )} kilobytes.`
            );
        }
        setData("attachment", e.target.files[0]);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">
                    Edit Document
                </h2>
            }
        >
            <Head title="Edit document" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium">
                                        Edit Document
                                    </h2>

                                    <p className="mt-1 text-sm">
                                        Update document attachment and title.
                                    </p>
                                </div>

                                {/* <Actions
                                    document={document}
                                    can={can}
                                    links={links}
                                /> */}
                            </div>
                            <form
                                id="EditDocument"
                                onSubmit={submit}
                                className="mt-6 space-y-6"
                            >
                                {/* TITLE */}
                                <div>
                                    <InputLabel
                                        htmlFor="title"
                                        value="Title*"
                                    />

                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        maxLength="100"
                                        required
                                        autoComplete="title"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.title}
                                    />
                                </div>

                                {/* ATTACHMENT */}
                                <div>
                                    <label className="form-control w-full">
                                        <InputLabel
                                            htmlFor="attachment"
                                            value="Attachment"
                                        />

                                        <FileInput
                                            accept="application/pdf"
                                            id="attachment"
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                validateFileSize(e)
                                            }
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.attachment}
                                        />

                                        <InputHelper
                                            className="mt-2"
                                            message={fileSize}
                                        />
                                    </label>
                                </div>

                                {can.document_update && (
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import FileInput from "@/Components/FileInput";

export default function Create({ auth, can }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm("CreateDocument", {
            title: "",
            attachment: "",
        });

    function submit(e) {
        e.preventDefault();
        post(route("documents.store"), {
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
                    Create Document
                </h2>
            }
        >
            <Head title="Create document" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium">
                                        New Document
                                    </h2>

                                    <p className="mt-1 text-sm">
                                        Create new document data and
                                        information.
                                    </p>
                                </div>

                                {/* <Actions
                                    document={document}
                                    can={can}
                                    links={links}
                                /> */}
                            </div>
                            <form
                                id="CreateDocument"
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
                                            required
                                            onChange={(e) =>
                                                setData(
                                                    "attachment",
                                                    e.target.files[0]
                                                )
                                            }
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.attachment}
                                        />
                                    </label>
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

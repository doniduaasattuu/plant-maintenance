import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import MultiSelect from "@/Components/MultiSelect";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, can, permissions }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            title: "",
            selectedPermissions: [],
        });

    permissions = permissions.data.map((permission) => {
        return {
            value: permission.id,
            label: permission.title,
        };
    });

    function submit(e) {
        e.preventDefault();
        post(route("roles.store"), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="font-semibold text-xl leading-tight">
                        Create Role
                    </h2>
                </>
            }
        >
            <Head title="Edit" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium">
                                    New role
                                </h2>

                                <p className="mt-1 text-sm">
                                    Create new role and assign permissions.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Title" />

                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.title}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="permissions"
                                        value="Permissions"
                                    />

                                    <MultiSelect
                                        id="permissions"
                                        className="mt-1 block w-full"
                                        isMulti={true}
                                        onChange={(selectedPermissions) => {
                                            setData(
                                                "selectedPermissions",
                                                selectedPermissions
                                            );
                                        }}
                                        options={permissions}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.permissions}
                                    />
                                </div>

                                {can.role_update && (
                                    <div className="flex items-center gap-4">
                                        <Link href={route("roles.index")}>
                                            <SecondaryButton>
                                                Back
                                            </SecondaryButton>
                                        </Link>

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

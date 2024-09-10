import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import MultiSelect from "@/Components/MultiSelect";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, can, role, permissions }) {
    const selectedPermissions = role.data.permissions.map(
        (selectedPermissionsItem) => {
            return {
                value: selectedPermissionsItem.id,
                label: selectedPermissionsItem.title,
            };
        }
    );

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm(`EditRole:${role.id}`, {
            title: role.data.title,
            selectedPermissions: selectedPermissions,
        });

    permissions = permissions.data.map((permission) => {
        return {
            value: permission.id,
            label: permission.title,
        };
    });

    function submit(e) {
        e.preventDefault();
        patch(route("roles.update", role.data.id), {
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="font-semibold text-xl leading-tight">
                        Edit Role
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
                                    {role.data.title} Role
                                </h2>

                                <p className="mt-1 text-sm">
                                    Update{" "}
                                    <span className="lowercase">
                                        {role.data.title}
                                    </span>{" "}
                                    role title and permissions.
                                </p>
                            </header>

                            <form
                                id={`EditRole:${role.id}`}
                                onSubmit={submit}
                                className="mt-6 space-y-6"
                            >
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
                                        autoComplete="title"
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
                                        defaultValue={selectedPermissions}
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

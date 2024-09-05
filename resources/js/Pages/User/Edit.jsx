import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import UpdateProfileInformationForm from "../Profile/Partials/UpdateProfileInformationForm";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import SecondaryButton from "@/Components/SecondaryButton";
import MultiSelect from "@/Components/MultiSelect";
import { useEffect } from "react";
import DangerButton from "@/Components/DangerButton";
import { useState } from "react";
import ModalConfirm from "@/Components/ModalConfirm";

export default function Edit({
    auth,
    user,
    can,
    departments,
    roles,
    positions,
    work_centers,
}) {
    departments = departments.data.map((department) => {
        return {
            value: department.id,
            label: department.title,
        };
    });

    positions = positions.data.map((position) => {
        return {
            value: position.id,
            label: position.title,
        };
    });

    work_centers = work_centers.data.map((work_center) => {
        return {
            value: work_center.id,
            label: work_center.title,
        };
    });

    const selectedRoles = user.roles.map((role) => {
        return {
            value: role.id,
            label: role.title,
        };
    });

    roles = roles.data.map((role) => {
        return {
            value: role.id,
            label: role.title,
        };
    });

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm(`EditUser:${user.id}`, {
            first_name: user.first_name ?? "",
            last_name: user.last_name ?? "",
            email: user.email ?? "",
            phone_number: user.phone_number ?? "",
            department_id: user.department_id ?? "",
            position_id: user.position_id ?? "",
            work_center_id: user.work_center_id ?? "",
            roles: selectedRoles ?? [],
        });

    function submit(e) {
        e.preventDefault();
        patch(route("users.update", user.id), {
            preserveScroll: true,
        });
    }

    // DELETE USER
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [url, setUrl] = useState(null);
    const [method, setMethod] = useState(null);
    const [message, setMessage] = useState(null);
    const [actionMessage, setActionMessage] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openDeleteConfirm = (id) => {
        setSelectedUserId(id);
        setUrl("users.destroy");
        setMethod("delete");
        setMessage(
            "Once this user is deleted, all of its resources and data will be permanently deleted."
        );
        setActionMessage("delete");
        setIsOpen(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">Update</h2>
            }
        >
            <Head title="Update User" />

            <ModalConfirm
                isOpen={isOpen}
                closeModal={closeModal}
                id={selectedUserId}
                message={message}
                actionMessage={actionMessage}
                method={method}
                url={url}
            />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <h2 className="text-lg font-medium">Update User</h2>

                            <p className="mt-1 text-sm">
                                Update user account's profile information and
                                roles.
                            </p>

                            <form
                                id={`EditUser:${user.id}`}
                                onSubmit={submit}
                                className="mt-6 space-y-6"
                            >
                                {/* FIRST NAME */}
                                <div>
                                    <InputLabel
                                        htmlFor="first_name"
                                        value="First Name"
                                    />

                                    <TextInput
                                        id="first_name"
                                        className="mt-1 block w-full"
                                        value={data.first_name}
                                        onChange={(e) =>
                                            setData(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                        required
                                        autoComplete="first_name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.first_name}
                                    />
                                </div>

                                {/* LAST NAME */}
                                <div>
                                    <InputLabel
                                        htmlFor="last_name"
                                        value="Last Name"
                                    />

                                    <TextInput
                                        id="last_name"
                                        className="mt-1 block w-full"
                                        value={data.last_name}
                                        onChange={(e) =>
                                            setData("last_name", e.target.value)
                                        }
                                        required
                                        autoComplete="last_name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.last_name}
                                    />
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                        autoComplete="email"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                {/* PHONE NUMBER */}
                                <div>
                                    <InputLabel
                                        htmlFor="phone_number"
                                        value="Phone number"
                                    />

                                    <TextInput
                                        id="phone_number"
                                        type="phone_number"
                                        className="mt-1 block w-full"
                                        inputMode="numeric"
                                        value={data.phone_number}
                                        onChange={(e) =>
                                            setData(
                                                "phone_number",
                                                e.target.value
                                            )
                                        }
                                        maxLength="15"
                                        autoComplete="phone_number"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.phone_number}
                                    />
                                </div>

                                {/* DEPARTMENT */}
                                <div>
                                    <InputLabel
                                        htmlFor="department_id"
                                        value="Department"
                                    />

                                    <SelectInput
                                        id="department_id"
                                        className="mt-1 block w-full"
                                        value={data.department_id}
                                        onChange={(e) =>
                                            setData(
                                                "department_id",
                                                e.target.value
                                            )
                                        }
                                        options={departments}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.department_id}
                                    />
                                </div>

                                {/* POSITION */}
                                <div>
                                    <InputLabel
                                        htmlFor="position_id"
                                        value="Position"
                                    />

                                    <SelectInput
                                        id="position_id"
                                        className="mt-1 block w-full"
                                        value={data.position_id}
                                        onChange={(e) =>
                                            setData(
                                                "position_id",
                                                e.target.value
                                            )
                                        }
                                        options={positions}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.position_id}
                                    />
                                </div>

                                {/* WORK CENTER */}
                                <div>
                                    <InputLabel
                                        htmlFor="work_center_id"
                                        value="Work center"
                                    />

                                    <SelectInput
                                        id="work_center_id"
                                        className="mt-1 block w-full"
                                        value={data.work_center_id}
                                        onChange={(e) =>
                                            setData(
                                                "work_center_id",
                                                e.target.value
                                            )
                                        }
                                        options={work_centers}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.work_center_id}
                                    />
                                </div>

                                {/* ROLES */}
                                <div>
                                    <InputLabel htmlFor="roles" value="Roles" />

                                    <MultiSelect
                                        id="roles"
                                        className="mt-1 block w-full"
                                        isMulti={true}
                                        defaultValue={selectedRoles}
                                        onChange={(selectedRoles) =>
                                            setData("roles", selectedRoles)
                                        }
                                        options={roles}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.roles}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Link href={route("users.index")}>
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

                    {can.user_delete && (
                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                <header>
                                    <h2 className="text-lg font-medium">
                                        Delete User
                                    </h2>

                                    <p className="mt-1 text-sm">
                                        Once this user is deleted, all of its
                                        resources and data will be permanently
                                        deleted. Before deleting this user,
                                        please download any data or information
                                        that you wish to retain.
                                    </p>
                                </header>

                                <DangerButton
                                    onClick={() => openDeleteConfirm(user.id)}
                                >
                                    Delete User
                                </DangerButton>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

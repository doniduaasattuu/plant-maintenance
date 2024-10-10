import InputLabel from "@/Components/InputLabel";
import ModalConfirm from "@/Components/ModalConfirm";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Index({ auth, can, users, departments }) {
    departments = departments.data.map((department) => {
        return {
            value: department.id,
            label: department.title,
        };
    });

    const initialRender = useRef(true);
    const urlParams = new URLSearchParams(window.location.search);
    const [inputSearch, setInputSearch] = useState(
        urlParams.get("search") ?? ""
    );
    const [searchTerm, setSearchTerm] = useState(urlParams.get("search") ?? "");
    const [selectedDepartment, setSelectedDepartment] = useState(
        urlParams.get("department") ?? ""
    );

    let userUrl = useMemo(() => {
        const url = new URL(route("users.index"));

        if (searchTerm) {
            url.searchParams.append("search", searchTerm);
        }

        if (selectedDepartment) {
            url.searchParams.append("department", selectedDepartment);
        }

        return url.href;
    }, [searchTerm, selectedDepartment]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        router.visit(userUrl, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }, [userUrl]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchTerm(inputSearch);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [inputSearch]);

    // UPDATE PASSWORD
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [url, setUrl] = useState(null);
    const [method, setMethod] = useState(null);
    const [message, setMessage] = useState(null);
    const [actionMessage, setActionMessage] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openResetConfirm = (id) => {
        setSelectedUserId(id);
        setUrl("users.reset");
        setMethod("patch");
        setMessage(
            "Once this user's password is reset, the user cannot log in using the previous password."
        );
        setActionMessage("reset");
        setIsOpen(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-xl leading-tight">
                                Users
                            </h2>
                            <p className="mt-1 text-sm">
                                A list of all the users.
                            </p>
                        </div>
                    </div>
                </>
            }
        >
            <Head title="Users" />

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
                    <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                        <div>
                            <InputLabel htmlFor="search" value="Search" />
                            <TextInput
                                id="search"
                                className="mt-1 block w-sm"
                                value={inputSearch}
                                onChange={(e) => setInputSearch(e.target.value)}
                                placeholder="Search user data..."
                                isFocused
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="department"
                                value="Department"
                            />
                            <SelectInput
                                id="department"
                                className="mt-1 block w-sm"
                                value={selectedDepartment}
                                onChange={(e) =>
                                    setSelectedDepartment(e.target.value)
                                }
                                options={departments}
                                selectName="All"
                            />
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="table min-w-max">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Department</th>
                                        <th>Contact</th>
                                        {/* <th>Roles</th> */}
                                        {can.user_reset && (
                                            <th className="text-center">
                                                Reset
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => {
                                        return (
                                            <tr
                                                className="border-b-base-300"
                                                key={user.id}
                                            >
                                                <td
                                                    className={
                                                        can.user_edit
                                                            ? "cursor-pointer"
                                                            : undefined
                                                    }
                                                    onClick={
                                                        can.user_edit
                                                            ? () => {
                                                                router.get(
                                                                    route(
                                                                        "users.edit",
                                                                        user.id
                                                                    )
                                                                );
                                                            }
                                                            : undefined
                                                    }
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`avatar ${user.isOnline
                                                                ? "online"
                                                                : "offline"
                                                                }`}
                                                        >
                                                            <div className="mask mask-squircle h-12 w-12">
                                                                <img
                                                                    src={
                                                                        user.profile_photo
                                                                            ? `storage/${user.profile_photo}`
                                                                            : "storage/assets/photos/users/person.png"
                                                                    }
                                                                    alt="Avatar Tailwind CSS Component"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div
                                                                className={
                                                                    can.user_edit
                                                                        ? "font-bold underline underline-offset-2 hover:text-blue-500"
                                                                        : "font-bold"
                                                                }
                                                            >
                                                                {user.full_name}
                                                            </div>
                                                            <div className="text-sm opacity-50">
                                                                <span>
                                                                    {user.id}
                                                                </span>
                                                                {user?.id &&
                                                                    user
                                                                        ?.position
                                                                        ?.id && (
                                                                        <span className="mx-1">
                                                                            |
                                                                        </span>
                                                                    )}
                                                                <span>
                                                                    {
                                                                        user
                                                                            .position
                                                                            ?.title
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {user.department?.title}

                                                    <br />
                                                    <span className="text-sm opacity-50">
                                                        {user.department?.id}
                                                        {user.department?.id &&
                                                            user.department
                                                                ?.division
                                                                ?.title &&
                                                            " | "}
                                                        {
                                                            user.department
                                                                ?.division
                                                                ?.title
                                                        }
                                                    </span>
                                                </td>
                                                <td>
                                                    {user.email}
                                                    <br />
                                                    {user.phone_number}
                                                </td>
                                                {/* <td>
                                                    {user?.roles?.map(
                                                        (role) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        role.id
                                                                    }
                                                                    className="badge"
                                                                >
                                                                    {role.title}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </td> */}
                                                {can.user_reset && (
                                                    <td className="text-center text-blue-500">
                                                        <button
                                                            onClick={() =>
                                                                openResetConfirm(
                                                                    user.id
                                                                )
                                                            }
                                                            className="btn btn-ghost"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="size-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {users.meta.links.length > 3 && (
                        <Pagination meta={users.meta} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

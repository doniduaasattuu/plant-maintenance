import InputLabel from "@/Components/InputLabel";
import ModalConfirm from "@/Components/ModalConfirm";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Index({ auth, can, users, departments }) {
    departments = departments.data.map((department) => {
        return {
            key: department.id,
            value: department.title,
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
        // if (inputSearch.length == 0) {
        //     return;
        // }

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

    // const openDeleteConfirm = (id) => {
    //     setSelectedUserId(id);
    //     setUrl("users.destroy");
    //     setMethod("delete");
    //     setMessage(
    //         "Once this user is deleted, all of its resources and data will be permanently deleted."
    //     );
    //     setActionMessage("delete");
    //     setIsOpen(true);
    // };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="font-semibold text-xl leading-tight">
                        Users
                    </h2>
                    <p className="mt-2 text-sm">A list of all the users.</p>
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
                                        <th>Roles</th>
                                        {can.user_reset && (
                                            <th className="text-center">
                                                Reset
                                            </th>
                                        )}
                                        {/* {can.user_delete && (
                                            <th className="text-center">
                                                Delete
                                            </th>
                                        )} */}
                                        {/* <th></th> */}
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
                                                            className={`avatar ${
                                                                user.isOnline
                                                                    ? "online"
                                                                    : "offline"
                                                            }`}
                                                        >
                                                            <div className="mask mask-squircle h-12 w-12">
                                                                <img
                                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
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
                                                <td>
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
                                                </td>
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
                                                {/* {can.user_delete && (
                                                    <td className="text-center text-red-500">
                                                        <button
                                                            onClick={() =>
                                                                openDeleteConfirm(
                                                                    user.id
                                                                )
                                                            }
                                                            className="btn btn-ghost"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                className="size-5"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                )} */}
                                                {/* <td>
                                                    <Link
                                                        className="font-semibold text-xs"
                                                        href={route(
                                                            "users.edit",
                                                            user.id
                                                        )}
                                                    >
                                                        Details
                                                    </Link>
                                                </td> */}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* <div className="flex justify-center">
                        <Link
                            className="mx-auto"
                            onClick={() =>
                                router.reload(
                                    route("users.index", {
                                        preserveScroll: true,
                                        preserveState: true,
                                    })
                                )
                            }
                        >
                            Refresh
                        </Link>
                    </div> */}

                    {users.meta.links.length > 3 && (
                        <Pagination meta={users.meta} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import ModalConfirm from "@/Components/ModalConfirm";
import Toastify from "@/Components/Toastify";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import toast from "react-hot-toast";
import NavbarLinks from "@/Components/NavbarLinks";

export default function Authenticated({ user, header, children }) {
    const page = usePage();
    const can = page?.props?.can;

    useEffect(() => {
        themeChange(false);
    }, []);

    router.on("navigate", (event) => {
        toast.remove();
    });

    function setTheme(button) {
        controllers = document.getElementsByClassName("theme-controller");

        for (let btn of controllers) {
            btn.firstChild.classList.add("hidden");
        }

        button.firstChild.classList.remove("hidden");
        button.firstChild.classList.add("block");
    }

    const currentTheme = localStorage.getItem("theme");

    // LOGOUT
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    function logout() {
        setIsOpen(true);
    }

    return (
        <>
            <Toastify />
            <div className="w-full shadow-md bg-base-100 fixed z-50">
                <nav className="navbar max-w-7xl mx-auto lg:px-8">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost lg:hidden btn-circle"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </div>
                            <ul
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 min-w-max p-2 shadow border border-neutral-600/40"
                                tabIndex={0}
                            >
                                <NavbarLinks
                                    can={can}
                                    orientation={"vertical"}
                                />

                                {/* <li>
                                    <Link
                                        href={route("scanner.index")}
                                        className={`${
                                            route().current("scanner.index") ||
                                            route()
                                                .current()
                                                .includes("scanner")
                                                ? "bg-base-200"
                                                : ""
                                        }`}
                                    >
                                        Scanner
                                    </Link>
                                </li>
                                <li>
                                    <a>Tables</a>
                                    <ul className="p-2">
                                        {page?.props?.can
                                            ?.functional_location_access && (
                                            <li>
                                                <Link
                                                    href={route(
                                                        "functional-locations.index"
                                                    )}
                                                    className={`${
                                                        route().current(
                                                            "functional-locations.index"
                                                        ) ||
                                                        route()
                                                            .current()
                                                            .includes(
                                                                "functional-locations"
                                                            )
                                                            ? "bg-base-200"
                                                            : ""
                                                    }`}
                                                >
                                                    Functional Location
                                                </Link>
                                            </li>
                                        )}
                                        {page?.props?.can?.equipment_access && (
                                            <li>
                                                <Link
                                                    className={`${
                                                        route().current(
                                                            "equipments.index"
                                                        ) ||
                                                        route()
                                                            .current()
                                                            .includes(
                                                                "equipments"
                                                            )
                                                            ? "bg-base-200"
                                                            : ""
                                                    }`}
                                                    href={route(
                                                        "equipments.index"
                                                    )}
                                                >
                                                    Equipment
                                                </Link>
                                            </li>
                                        )}
                                        {page?.props?.can
                                            ?.equipment_movement_access && (
                                            <li>
                                                <Link
                                                    href={route(
                                                        "equipment-movements.index"
                                                    )}
                                                    className={`${
                                                        route()
                                                            .current()
                                                            .includes(
                                                                "equipment-movements"
                                                            )
                                                            ? "bg-base-200"
                                                            : ""
                                                    }`}
                                                >
                                                    History
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                                {page?.props?.can?.user_access && (
                                    <li>
                                        <Link
                                            href={route("users.index")}
                                            className={`${
                                                route().current(
                                                    "users.index"
                                                ) ||
                                                route()
                                                    .current()
                                                    .includes("users")
                                                    ? "bg-base-200"
                                                    : ""
                                            }`}
                                        >
                                            Users
                                        </Link>
                                    </li>
                                )}
                                {page?.props?.can?.role_access && (
                                    <li>
                                        <Link
                                            href={route("roles.index")}
                                            className={`${
                                                route()
                                                    .current()
                                                    .includes("roles")
                                                    ? "bg-base-200"
                                                    : ""
                                            }`}
                                        >
                                            Roles
                                        </Link>
                                    </li>
                                )} */}
                            </ul>
                        </div>
                        <Link
                            className="font-bold min-w-max ms-1 text-xl sm:ms-4 lg:ms-0"
                            href={route("dashboard")}
                        >
                            {page.props.appName}
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <NavbarLinks can={can} orientation={"horizontal"} />

                            {/* <li>
                                <Link
                                    href={route("scanner.index")}
                                    className={`${
                                        route().current("scanner.index") ||
                                        route().current().includes("scanner")
                                            ? "bg-base-200"
                                            : ""
                                    }`}
                                >
                                    Scanner
                                </Link>
                            </li>
                            <li>
                                <details>
                                    <summary>Tables</summary>
                                    <ul className="p-2 min-w-max shadow border border-neutral-600/40">
                                        {page.props.can
                                            .functional_location_access && (
                                            <li>
                                                <Link
                                                    href={route(
                                                        "functional-locations.index"
                                                    )}
                                                    className={`${
                                                        route().current(
                                                            "functional-locations.index"
                                                        ) ||
                                                        route()
                                                            .current()
                                                            .includes(
                                                                "functional-locations"
                                                            )
                                                            ? "bg-base-200"
                                                            : ""
                                                    }`}
                                                >
                                                    Functional Location
                                                </Link>
                                            </li>
                                        )}
                                        {page.props.can.equipment_access && (
                                            <li>
                                                <Link
                                                    href={route(
                                                        "equipments.index"
                                                    )}
                                                    className={`${
                                                        route().current(
                                                            "equipments.index"
                                                        ) ||
                                                        route()
                                                            .current()
                                                            .includes(
                                                                "equipments"
                                                            )
                                                            ? "bg-base-200"
                                                            : ""
                                                    }`}
                                                >
                                                    Equipment
                                                </Link>
                                            </li>
                                        )}
                                        {page.props.can
                                            .equipment_movement_access && (
                                            <li>
                                                <Link
                                                    href={route(
                                                        "equipment-movements.index"
                                                    )}
                                                    className={`${
                                                        route()
                                                            .current()
                                                            .includes(
                                                                "equipment-movements"
                                                            )
                                                            ? "bg-base-200"
                                                            : ""
                                                    }`}
                                                >
                                                    History
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </details>
                            </li>
                            {page.props.can.user_access && (
                                <li>
                                    <Link
                                        href={route("users.index")}
                                        className={`${
                                            route().current().includes("users")
                                                ? "bg-base-200"
                                                : ""
                                        }`}
                                    >
                                        Users
                                    </Link>
                                </li>
                            )}
                            {page.props.can.role_access && (
                                <li>
                                    <Link
                                        href={route("roles.index")}
                                        className={`${
                                            route().current().includes("roles")
                                                ? "bg-base-200"
                                                : ""
                                        }`}
                                    >
                                        Roles
                                    </Link>
                                </li>
                            )} */}
                        </ul>
                    </div>
                    <div className="navbar-end me-4 lg:me-0">
                        <div className="dropdown dropdown-end">
                            <div className="flex justify-center align-middle space-x-4">
                                <div className="hidden md:inline-block my-auto text-sm">
                                    {`${user.first_name} ${
                                        user.last_name ?? ""
                                    }`}
                                </div>
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar bg-base-200"
                                >
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt={user.id}
                                            src={`${
                                                user.profile_photo
                                                    ? "/storage/" +
                                                      user.profile_photo
                                                    : "/storage/assets/photos/users/person.png"
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow border border-neutral-600/40"
                            >
                                {page.props.can.profile_edit && (
                                    <li>
                                        <Link
                                            href={route("profile.edit")}
                                            className={`${
                                                route().current("profile.edit")
                                                    ? "bg-base-200"
                                                    : ""
                                            }`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="size-4"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Profile
                                            <span className="md:hidden badge text-xs">
                                                {user.first_name}
                                            </span>
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <details>
                                        <summary className="align-middle">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="size-4"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2 3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v8.5a2.5 2.5 0 0 1-5 0V3Zm3.25 8.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                                    clipRule="evenodd"
                                                />
                                                <path d="m8.5 11.035 3.778-3.778a1 1 0 0 0 0-1.414l-2.122-2.121a1 1 0 0 0-1.414 0l-.242.242v7.07ZM7.656 14H13a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-.344l-5 5Z" />
                                            </svg>
                                            Theme
                                        </summary>
                                        <ul className="max-h-32 overflow-scroll min-w-max">
                                            {page.props.themes.map((theme) => {
                                                return (
                                                    <li key={theme}>
                                                        <button
                                                            onClick={(e) => {
                                                                setTheme(
                                                                    e.currentTarget
                                                                );
                                                            }}
                                                            data-act-class="ACTIVECLASS"
                                                            data-set-theme={
                                                                theme
                                                            }
                                                            className="theme-controller btn btn-sm btn-ghost justify-between"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 16 16"
                                                                fill="currentColor"
                                                                className={`size-4 ${
                                                                    currentTheme ==
                                                                    theme
                                                                        ? "block"
                                                                        : "hidden"
                                                                }`}
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            <span className="text-sm font-normal text-left capitalize">
                                                                {theme}
                                                            </span>
                                                            <span
                                                                data-theme={
                                                                    theme
                                                                }
                                                                className="bg-transparent flex h-full shrink-0 flex-wrap gap-1 py-1"
                                                            >
                                                                <span className="bg-primary rounded-badge w-2"></span>
                                                                <span className="bg-secondary rounded-badge w-2"></span>
                                                                <span className="bg-accent rounded-badge w-2"></span>
                                                                <span className="bg-neutral rounded-badge w-2"></span>
                                                            </span>
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                            <div className="divider m-0 p-0"></div>
                                        </ul>
                                    </details>
                                </li>
                                <li
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    <a className="hover:bg-red-500 hover:text-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="size-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M2 4.75A2.75 2.75 0 0 1 4.75 2h3a2.75 2.75 0 0 1 2.75 2.75v.5a.75.75 0 0 1-1.5 0v-.5c0-.69-.56-1.25-1.25-1.25h-3c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h3c.69 0 1.25-.56 1.25-1.25v-.5a.75.75 0 0 1 1.5 0v.5A2.75 2.75 0 0 1 7.75 14h-3A2.75 2.75 0 0 1 2 11.25v-6.5Zm9.47.47a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H5.25a.75.75 0 0 1 0-1.5h7.19l-.97-.97a.75.75 0 0 1 0-1.06Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Log out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 invisible h-[4.3rem]"></div>

            {header && (
                <header>
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>

            <ModalConfirm
                isOpen={isOpen}
                closeModal={closeModal}
                headerMessage={"Are you sure you want to log out?"}
                message={"Log out from this device"}
                actionMessage={"Log out"}
                method={"post"}
                url={"logout"}
            />
        </>
    );
}

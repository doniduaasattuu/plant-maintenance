import React from "react";
import { router } from "@inertiajs/react";

export default function Actions({ auth, can, functional_location }) {
    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                </svg>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow border border-neutral-600/40"
            >
                {can.equipment_movement_access && (
                    <li>
                        <div
                            onClick={() =>
                                router.post(
                                    route("equipment-movements.filter", {
                                        search: functional_location.data.id,
                                    })
                                )
                            }
                            className="py-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="size-4"
                            >
                                <path d="M2.908 2.067A.978.978 0 0 0 2 3.05V8h6V3.05a.978.978 0 0 0-.908-.983 32.481 32.481 0 0 0-4.184 0ZM12.919 4.722A.98.98 0 0 0 11.968 4H10a1 1 0 0 0-1 1v6.268A2 2 0 0 1 12 13h1a.977.977 0 0 0 .985-1 31.99 31.99 0 0 0-1.066-7.278Z" />
                                <path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM2 12V9h6v3a1 1 0 0 1-1 1 2 2 0 1 0-4 0 1 1 0 0 1-1-1Z" />
                                <path d="M6 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                            </svg>
                            History
                        </div>
                    </li>
                )}
                {can.functional_location_edit &&
                    !route().current().includes("edit") && (
                        <li>
                            <div
                                onClick={() =>
                                    router.get(
                                        route(
                                            "functional-locations.edit",
                                            functional_location.data.id
                                        )
                                    )
                                }
                                className="py-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="size-4"
                                >
                                    <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                                    <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                                </svg>
                                Edit
                            </div>
                        </li>
                    )}
            </ul>
        </div>
    );
}

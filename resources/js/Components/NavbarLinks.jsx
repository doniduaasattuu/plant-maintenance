import { Link } from "@inertiajs/react";
import VerticalNavLinks from "./VerticalNavLinks";
import HorizontalNavLinks from "./HorizontalNavLinks";

export default function NavbarLinks({ auth, can, orientation }) {
    function Tables() {
        return (
            <>
                {can.functional_location_access && (
                    <li>
                        <Link
                            href={route("functional-locations.index")}
                            className={`${route().current("functional-locations.index") ||
                                route()
                                    .current()
                                    .includes("functional-locations")
                                ? "bg-base-200"
                                : ""
                                }`}
                        >
                            Functional Locations
                        </Link>
                    </li>
                )}
                {can.equipment_access && (
                    <li>
                        <Link
                            className={`${route().current("equipments.index") ||
                                route().current().includes("equipments")
                                ? "bg-base-200"
                                : ""
                                }`}
                            href={route("equipments.index")}
                        >
                            Equipments
                        </Link>
                    </li>
                )}
                {can.material_access && (
                    <li>
                        <Link
                            className={`${route().current("materials.index") ||
                                route().current().includes("materials")
                                ? "bg-base-200"
                                : ""
                                }`}
                            href={route("materials.index")}
                        >
                            Materials
                        </Link>
                    </li>
                )}
                {can.equipment_movement_access && (
                    <li>
                        <Link
                            href={route("equipment-movements.index")}
                            className={`${route()
                                .current()
                                .includes("equipment-movements")
                                ? "bg-base-200"
                                : ""
                                }`}
                        >
                            History
                        </Link>
                    </li>
                )}
            </>
        );
    }

    return (
        <>
            {can.qr_scan && (
                <li>
                    <Link
                        href={route("scanner.index")}
                        className={`${route().current("scanner.index") ||
                            route().current().includes("scanner")
                            ? "bg-base-200"
                            : ""
                            }`}
                    >
                        Scanner
                    </Link>
                </li>
            )}
            {can.functional_location_access &&
                can.equipment_access &&
                can.equipment_movement_access &&
                (orientation == "vertical" ? (
                    <VerticalNavLinks>
                        <Tables />
                    </VerticalNavLinks>
                ) : (
                    <HorizontalNavLinks>
                        <Tables />
                    </HorizontalNavLinks>
                ))}
            {can.document_access && (
                <li>
                    <Link
                        href={route("documents.index")}
                        className={`${route().current().includes("documents")
                            ? "bg-base-200"
                            : ""
                            }`}
                    >
                        Documents
                    </Link>
                </li>
            )}
            {can.finding_access && (
                <li>
                    <Link
                        href={route("findings.index")}
                        className={`${route().current().includes("findings")
                            ? "bg-base-200"
                            : ""
                            }`}
                    >
                        Findings
                    </Link>
                </li>
            )}
            {can.user_access && (
                <li>
                    <Link
                        href={route("users.index")}
                        className={`${route().current("users.index") ||
                            route().current().includes("users")
                            ? "bg-base-200"
                            : ""
                            }`}
                    >
                        Users
                    </Link>
                </li>
            )}
            {can.role_access && (
                <li>
                    <Link
                        href={route("roles.index")}
                        className={`${route().current().includes("roles")
                            ? "bg-base-200"
                            : ""
                            }`}
                    >
                        Roles
                    </Link>
                </li>
            )}
        </>
    );
}

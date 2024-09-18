import { Link } from "@inertiajs/react";

export default function EquipmentList({ can, material }) {
    return (
        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
            <section className="max-w-xl">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-medium">Equipments</h2>

                        <p className="mt-1 text-sm">
                            A list of equipment that uses this material.
                        </p>
                    </div>
                    <div>
                        <Link
                            preserveScroll
                            href={window.location.href}
                            className="py-2"
                        >
                            <span className="text-sm mx-4 text-blue-500 underline underline-offset-2">
                                Refresh
                            </span>
                        </Link>
                    </div>
                </div>

                <ul className="menu bg-base-200 rounded-box p-0 mt-6 mx-0">
                    {material.data.equipments.map((equipment) => {
                        return (
                            <li key={equipment.id}>
                                <div className="flex justify-between">
                                    <Link
                                        preserveScroll
                                        className="link text-blue-500 underline-offset-2"
                                        href={route(
                                            route().current().includes("edit")
                                                ? "equipments.edit"
                                                : "equipments.show",
                                            equipment.id
                                        )}
                                    >
                                        {equipment.id}
                                    </Link>
                                    <p className="w-48 sm:w-max truncate overflow-hidden opacity-50">
                                        {equipment.sort_field}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div>
    );
}

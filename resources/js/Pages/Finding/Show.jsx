import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import SecondaryButton from "@/Components/SecondaryButton";
import Textarea from "@/Components/Textarea";
import FileInput from "@/Components/FileInput";
import InputHelper from "@/Components/InputHelper";
import { useState } from "react";
import DateInput from "@/Components/DateInput";
import { date } from "@/Utils/Helper";
import { useEffect } from "react";
import { useRef } from "react";

export default function Show({ auth, can, finding }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl leading-tight">Finding</h2>
            }
        >
            <Head title="Show finding" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <h2 className="text-lg font-medium">
                                Show Finding
                            </h2>

                            <p className="mt-1 text-sm">
                                Displayed single finding.
                            </p>

                            <div className="mt-6 space-y-6">
                                {/* Status */}
                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="Status"
                                    />

                                    <TextInput
                                        readOnly
                                        id="status"
                                        className="mt-1 block w-full"
                                        value={finding.data.status.keyword}
                                    />
                                </div>

                                {/* Equipment */}
                                <div>
                                    <InputLabel
                                        htmlFor="equipment"
                                        value="Equipment"
                                    />

                                    <TextInput
                                        readOnly
                                        id="equipment"
                                        className="mt-1 block w-full"
                                        value={finding.data.equipment.id}
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />

                                    <Textarea
                                        readOnly
                                        id="description"
                                        className="mt-1 block w-full textarea textarea-bordered h-24"
                                        value={finding.data.description}
                                    />
                                </div>

                                {/* Notification */}
                                <div>
                                    <InputLabel
                                        htmlFor="notification"
                                        value="Notification"
                                    />

                                    <TextInput
                                        readOnly
                                        id="notification"
                                        className="mt-1 block w-full"
                                        value={finding.data.notification}
                                    />
                                </div>

                                {/* Reported by */}
                                <div>
                                    <InputLabel
                                        htmlFor="reported_by"
                                        value="Reported by"
                                    />

                                    <TextInput
                                        readOnly
                                        id="reported_by"
                                        className="mt-1 block w-full"
                                        value={
                                            finding.data.reported_by.full_name
                                        }
                                    />
                                </div>

                                {/* Attachments */}
                                {finding.data.attachments.length > 1 && (
                                    <div className="max-w-xl">
                                        <InputLabel
                                            htmlFor="attachment"
                                            value="Attachments"
                                        />
                                        <div className="mt-1 carousel carousel-center bg-neutral rounded-box space-x-2 p-2">
                                            {finding.data.attachments.map(
                                                (attachment) => (
                                                    <div className="carousel-item">
                                                        <img
                                                            src={`/storage/${attachment.file_path}`}
                                                            className="carousel-item object-cover h-80 sm:h-56 w-full rounded-box"
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Crated at */}
                                <div>
                                    <InputLabel
                                        htmlFor="created_at"
                                        value="Created at"
                                    />

                                    <TextInput
                                        readOnly
                                        id="created_at"
                                        className="mt-1 block w-full"
                                        value={finding.data.created_at}
                                    />
                                </div>

                                {/* Updated at */}
                                <div>
                                    <InputLabel
                                        htmlFor="updated_at"
                                        value="Updated at"
                                    />

                                    <TextInput
                                        readOnly
                                        id="updated_at"
                                        className="mt-1 block w-full"
                                        value={finding.data.updated_at}
                                    />
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
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import SelectInput from "@/Components/SelectInput";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
    departments,
    work_centers,
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm("UpdateProfile", {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            department_id: user.department_id,
            work_center_id: user.work_center_id,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium">Profile Information</h2>

                <p className="mt-1 text-sm">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form
                id="UpdateProfile"
                onSubmit={submit}
                className="mt-6 space-y-6"
            >
                {/* FIRST NAME */}
                <div>
                    <InputLabel htmlFor="first_name" value="First Name" />

                    <TextInput
                        id="first_name"
                        className="mt-1 block w-full"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        required
                        isFocused
                        autoComplete="first_name"
                    />

                    <InputError className="mt-2" message={errors.first_name} />
                </div>

                {/* LAST NAME */}
                <div>
                    <InputLabel htmlFor="last_name" value="Last Name" />

                    <TextInput
                        id="last_name"
                        className="mt-1 block w-full"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                        required
                        autoComplete="last_name"
                    />

                    <InputError className="mt-2" message={errors.last_name} />
                </div>

                {/* EMAIL */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* PHONE NUMBER */}
                <div>
                    <InputLabel htmlFor="phone_number" value="Phone number" />

                    <TextInput
                        id="phone_number"
                        type="phone_number"
                        className="mt-1 block w-full"
                        inputMode="numeric"
                        value={data.phone_number}
                        onChange={(e) =>
                            setData("phone_number", e.target.value)
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
                    <InputLabel htmlFor="department_id" value="Department" />

                    <SelectInput
                        id="department_id"
                        className="mt-1 block w-full"
                        value={data.department_id}
                        onChange={(e) =>
                            setData("department_id", e.target.value)
                        }
                        options={departments}
                    />

                    <InputError
                        className="mt-2"
                        message={errors.department_id}
                    />
                </div>

                {/* WORK CENTER */}
                <div>
                    <InputLabel htmlFor="work_center_id" value="Work center" />

                    <SelectInput
                        id="work_center_id"
                        className="mt-1 block w-full"
                        value={data.work_center_id}
                        onChange={(e) =>
                            setData("work_center_id", e.target.value)
                        }
                        options={work_centers}
                    />

                    <InputError
                        className="mt-2"
                        message={errors.work_center_id}
                    />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm hover rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

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
            </form>
        </section>
    );
}

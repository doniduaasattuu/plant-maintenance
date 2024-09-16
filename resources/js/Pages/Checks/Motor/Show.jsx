import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Show({ auth, motorCheck }) {
    const { data } = useForm(`MotorCheckShow:${motorCheck.data.id}`, {
        equipment_id: motorCheck.data.equipment_id ?? "",
        operational_status_id: motorCheck.data.operational_status.keyword ?? "",
        cleanliness_id: motorCheck.data.cleanliness.keyword ?? "",
        number_of_greasing: motorCheck.data.number_of_greasing ?? "",
        temperature_de: motorCheck.data.temperature_de ?? "",
        temperature_body: motorCheck.data.temperature_body ?? "",
        temperature_nde: motorCheck.data.temperature_nde ?? "",
        vibration_dev: motorCheck.data.vibration_dev ?? "",
        vibration_deh: motorCheck.data.vibration_deh ?? "",
        vibration_dea: motorCheck.data.vibration_dea ?? "",
        vibration_def: motorCheck.data.vibration_def ?? "",
        noise_de: motorCheck.data.noise_de.keyword ?? "",
        vibration_ndev: motorCheck.data.vibration_ndev ?? "",
        vibration_ndeh: motorCheck.data.vibration_ndeh ?? "",
        vibration_ndef: motorCheck.data.vibration_ndef ?? "",
        created_at: motorCheck.data.created_at ?? "",
        checked_by: motorCheck.data.checked_by.full_name ?? "",
        noise_nde: motorCheck.data.noise_nde.keyword ?? "",
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-xl leading-tight">
                                Show Motor Check
                            </h2>
                            <p className="mt-1 text-sm">
                                Displayed single check of motor equipment.
                            </p>
                        </div>
                    </div>
                </>
            }
        >
            <Head title="Motor Check" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div
                        className="space-y-6"
                        id={`MotorCheckShow:${motorCheck.data.id}`}
                    >
                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                {/* EQUIPMENT ID */}
                                <div>
                                    <InputLabel
                                        htmlFor="equipment_id"
                                        value="Equipment"
                                    />

                                    <TextInput
                                        id="equipment_id"
                                        className="mt-1 block w-full"
                                        value={data.equipment_id}
                                        readOnly={true}
                                    />
                                </div>

                                {/* CHECKED DATA */}
                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    <div>
                                        <InputLabel
                                            htmlFor="checked_by"
                                            value="Checked by"
                                        />

                                        <TextInput
                                            id="checked_by"
                                            className="mt-1 block w-full"
                                            value={data.checked_by}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="created_at"
                                            value="Checked at"
                                        />

                                        <TextInput
                                            id="created_at"
                                            className="mt-1 block w-full"
                                            value={data.created_at}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>

                                {/* OPERATIONAL AND CLEANLINESS */}
                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* OPERATIONAL STATUS */}
                                    <div>
                                        <InputLabel
                                            htmlFor="operational_status_id"
                                            value="Status"
                                        />

                                        <TextInput
                                            id="operational_status_id"
                                            className="mt-1 block w-full"
                                            value={data.operational_status_id}
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* CLEANLINESS */}
                                    <div>
                                        <InputLabel
                                            htmlFor="cleanliness_id"
                                            value="Cleanliness"
                                        />

                                        <TextInput
                                            id="cleanliness_id"
                                            className="mt-1 block w-full"
                                            value={data.cleanliness_id}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>

                                {/* NUMBER OF GREASING */}
                                <div>
                                    <InputLabel
                                        htmlFor="number_of_greasing"
                                        value="Number of greasing"
                                    />

                                    <TextInput
                                        id="number_of_greasing"
                                        className="mt-1 block w-full"
                                        value={data.number_of_greasing}
                                        readOnly={true}
                                    />
                                </div>
                            </section>
                        </div>

                        {/* TEMPERATURES */}
                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                <h2 className="font-semibold text-lg leading-tight">
                                    Temperatures
                                </h2>
                                <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-xl">
                                    {/* TEMPERATURE DE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="temperature_de"
                                            value="DE"
                                        />

                                        <TextInput
                                            id="temperature_de"
                                            className="mt-1 block w-full"
                                            value={data.temperature_de}
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* TEMPERATURE BODY */}
                                    <div>
                                        <InputLabel
                                            htmlFor="temperature_body"
                                            value="Body"
                                        />

                                        <TextInput
                                            id="temperature_body"
                                            className="mt-1 block w-full"
                                            value={data.temperature_body}
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* TEMPERATURE NDE */}
                                    <div>
                                        <InputLabel
                                            htmlFor="temperature_nde"
                                            value="NDE"
                                        />

                                        <TextInput
                                            id="temperature_nde"
                                            className="mt-1 block w-full"
                                            value={data.temperature_nde}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                <h2 className="font-semibold text-lg leading-tight">
                                    Drive End Vibration
                                </h2>
                                {/* VIBRATION DE VERTICAL & HORIZONTAL */}
                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* DE VERTICAL */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_dev"
                                            value="DE Vertical"
                                        />

                                        <TextInput
                                            id="vibration_dev"
                                            className="mt-1 block w-full"
                                            value={data.vibration_dev}
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* DE HORIZONTAL */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_deh"
                                            value="DE Horizontal"
                                        />

                                        <TextInput
                                            id="vibration_deh"
                                            className="mt-1 block w-full"
                                            value={data.vibration_deh}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>

                                {/* VIBRATION AXIAL & FRAME */}
                                <div className="grid grid-cols-2 gap-1 sm:gap-2 max-w-xl">
                                    {/* DE AXIAL */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_dea"
                                            value="DE Axial"
                                        />

                                        <TextInput
                                            id="vibration_dea"
                                            className="mt-1 block w-full"
                                            value={data.vibration_dea}
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* DE FRAME */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_def"
                                            value="DE Frame"
                                        />

                                        <TextInput
                                            id="vibration_def"
                                            className="mt-1 block w-full"
                                            value={data.vibration_def}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>

                                {/* NOISE DE */}
                                <div>
                                    <InputLabel
                                        htmlFor="noise_de"
                                        value="Noise DE"
                                    />

                                    <TextInput
                                        id="noise_de"
                                        className="mt-1 block w-full"
                                        value={data.noise_de}
                                        readOnly={true}
                                    />
                                </div>
                            </section>
                        </div>

                        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
                            <section className="max-w-xl space-y-6">
                                <h2 className="font-semibold text-lg leading-tight">
                                    Non Drive End Vibration
                                </h2>

                                {/* VIBRATION NDE VERTICAL, HORIZONTAL & FRAME */}
                                <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-xl">
                                    {/* NDE VERTICAL */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_ndev"
                                            value="NDE Vertical"
                                        />

                                        <TextInput
                                            id="vibration_ndev"
                                            className="mt-1 block w-full"
                                            value={data.vibration_ndev}
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* NDE HORIZONTAL */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_ndeh"
                                            value="NDE Horizontal"
                                        />

                                        <TextInput
                                            id="vibration_ndeh"
                                            className="mt-1 block w-full"
                                            value={data.vibration_ndeh}
                                            readOnly={true}
                                        />
                                    </div>

                                    {/* NDE FRAME */}
                                    <div>
                                        <InputLabel
                                            htmlFor="vibration_ndef"
                                            value="NDE Frame"
                                        />

                                        <TextInput
                                            id="vibration_ndef"
                                            className="mt-1 block w-full"
                                            value={data.vibration_ndef}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>

                                {/* NOISE NDE */}
                                <div>
                                    <InputLabel
                                        htmlFor="noise_nde"
                                        value="Noise NDE"
                                    />

                                    <TextInput
                                        id="noise_nde"
                                        className="mt-1 block w-full"
                                        value={data.noise_nde}
                                        readOnly={true}
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

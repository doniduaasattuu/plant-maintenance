import QRScanner from "@/Components/QRScanner";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Scanner({ auth, can }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<></>}>
            <Head title="Scanner" />

            <div className="py-4">
                <div className="max-w-sm mx-auto ">
                    <QRScanner can={can} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function DeleteConfirmModal({
    isOpen,
    closeModal,
    id,
    url,
    message,
}) {
    const [processing, setProcessing] = useState(false);

    function deleteItem() {
        router.delete(route(url, id), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setProcessing(false);
            },
            onStart: () => {
                setProcessing(true);
            },
        });
    }

    return (
        <Modal show={isOpen} onClose={closeModal}>
            <div className="p-6">
                <h2 className="text-lg font-medium">
                    Are you sure you want to do this operation?
                </h2>

                <p className="py-3 text-sm">
                    {message ??
                        "Once this entity is deleted, all of its resources and data will be permanently deleted."}
                </p>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton
                        onClick={() => {
                            deleteItem();
                        }}
                        className="ms-3"
                        disabled={processing}
                    >
                        Delete
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}

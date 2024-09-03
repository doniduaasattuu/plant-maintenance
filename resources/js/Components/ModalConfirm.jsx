import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function ModalConfirm({
    isOpen,
    closeModal,
    id,
    url,
    method = "post",
    headerMessage = "Are you sure you want to do this operation?",
    message,
    actionMessage,
}) {
    const [processing, setProcessing] = useState(false);

    function close() {
        setProcessing(false);
        closeModal();
    }

    function action() {
        router.visit(route(url, id), {
            method: method,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setProcessing(false);
            },
            onError: () => {
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
                <h2 className="text-lg font-medium">{headerMessage}</h2>

                <p className="py-3 text-sm">
                    {message ?? "This action cannot be undone."}
                </p>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={close}>Cancel</SecondaryButton>

                    <DangerButton
                        onClick={() => {
                            action();
                        }}
                        className="ms-3"
                        disabled={processing}
                    >
                        {actionMessage ?? "Delete"}
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}

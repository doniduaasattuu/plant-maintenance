import Exception from "@/Layouts/ExceptionLayout";

export default function Error({ status, title, description }) {
    return (
        <Exception status={status} title={title} description={description} />
    );
}

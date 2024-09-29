export default function InputHelper({ message, className = "", ...props }) {
    return message ? (
        <p {...props} className={"text-sm text-green-500 " + className}>
            {message}
        </p>
    ) : null;
}

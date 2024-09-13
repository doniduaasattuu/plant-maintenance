export default function VerticalNavLinks({ children }) {
    return (
        <li>
            <a>Tables</a>
            <ul className="p-2">{children}</ul>
        </li>
    );
}

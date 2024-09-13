export default function HorizontalNavLinks({ children }) {
    return (
        <li>
            <details>
                <summary>Tables</summary>
                <ul className="p-2 min-w-max shadow border border-neutral-600/40">
                    {children}
                </ul>
            </details>
        </li>
    );
}

import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function DateInput(
    { type = "date", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "focus:border-indigo-500 focus:ring-indigo-500 shadow-sm input input-bordered w-full flex items-center gap-2 " +
                className
            }
            ref={input}
        />
    );
});
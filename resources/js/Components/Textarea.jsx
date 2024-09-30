import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function Textarea(
    { className = "", isFocused = false, value = '', ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={
                "focus:border-indigo-500 focus:ring-indigo-500 shadow-sm input input-bordered w-full flex items-center gap-2 " +
                className
            }
            ref={input}
            value={value}
        />

    );
});

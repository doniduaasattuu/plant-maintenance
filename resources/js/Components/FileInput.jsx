import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function FileInput(
    { className = "", isFocused = false, ...props },
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
            type="file"
            className={
                "file-input file-input-bordered w-full focus:border-indigo-500 focus:ring-indigo-500 shadow-sm flex items-center gap-2 " +
                className
            }
            ref={input}
        />
    );
});

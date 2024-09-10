import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SelectInput(
    {
        options = [],
        selectName = "-- Choose --",
        withSelectName = true,
        className = "",
        isFocused = false,
        value = "",
        ...props
    },
    ref
) {
    // const input = ref ? ref : useRef();

    // useEffect(() => {
    //     if (isFocused) {
    //         input.current.focus();
    //     }
    // }, []);

    return (
        <select
            value={value}
            {...props}
            className={
                "select select-bordered w-full focus:border-indigo-500 focus:ring-indigo-500 shadow-sm input flex items-center gap-2 " +
                className
            }
        >
            {withSelectName && <option value="">{selectName}</option>}
            {options.map((option) => {
                return (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                );
            })}
        </select>
        // <input
        //     {...props}
        //     className={
        //         "focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm input input-bordered w-full flex items-center gap-2 " +
        //         className
        //     }
        //     ref={input}
        // />
    );
});

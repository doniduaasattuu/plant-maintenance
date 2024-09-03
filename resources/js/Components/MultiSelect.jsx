import React from "react";
import Select from "react-select";

export default function MultiSelect({ ...props }) {
    const customStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: "white",
            borderColor: state.isFocused
                ? "hsl(0, 0%, 80%)"
                : "hsl(0, 0%, 80%)",
            boxShadow: state.isFocused ? "0 0 0 1px #d1d5db" : "none",
            "&:hover": {
                borderColor: "#d1d5db",
            },
            padding: "0.5rem",
            borderRadius: "0.375rem", // Rounded corners
        }),
        menu: (base) => ({
            ...base,
            borderRadius: "0.375rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "#2563eb" : "white",
            color: state.isSelected ? "white" : "black",
            "&:hover": {
                backgroundColor: "#dbeafe",
                color: "#1d4ed8",
            },
            padding: "0.5rem",
        }),
    };

    return (
        <Select {...props} closeMenuOnSelect={false} styles={customStyles} />
    );
}

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { ucFirst } from "@/Utils/Helper";
import React from "react";

export default function Temperatures({
    data,
    setData,
    inputErrors,
    handleFocus,
    temperatures = ["temperature_de", "temperature_body", "temperature_nde"],
}) {
    return (
        <div className="p-4 sm:p-8 bg-base-200 shadow sm:rounded-lg">
            <section className="max-w-xl space-y-6">
                <h2 className="font-semibold text-lg leading-tight">
                    Temperatures
                </h2>
                <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-xl">
                    {temperatures.map((temperature, index) => (
                        <div key={index}>
                            <InputLabel
                                htmlFor={temperature}
                                value={ucFirst(temperature.split("_")[1])}
                            />

                            <TextInput
                                id={temperature}
                                className="mt-1 block w-full"
                                value={data[temperature]}
                                onChange={(e) =>
                                    setData(temperature, e.target.value)
                                }
                                placeholder="°C"
                                inputMode="numeric"
                                onFocus={(e) => handleFocus(e.target.id)}
                            />

                            <InputError
                                className="mt-2"
                                message={inputErrors[temperature]}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Temperatures from "@/Pages/Checks/Motor/Partials/Temperatures";
import { Head, Link } from "@inertiajs/react";
import Header from "../Header";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
    BarChart,
    Bar,
} from "recharts";

export default function Index({
    auth,
    can,
    equipment_id,
    operational_status,
    leakage,
    evasor,
    condensor,
    evaporator,
    currents,
    temperature,
    remote,
    pressure,
    cleanings,
    links,
    classification_id,
}) {
    const exportLink = links[classification_id]?.export;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Header
                    can={can}
                    equipment_id={equipment_id}
                    exportLink={exportLink}
                    table={"ac"}
                />
            }
        >
            <Head title={`Trend of ${equipment_id}`} />

            <div className="py-4 space-y-10">
                {/* OPERATIONAL STATUS */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Operational Status
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={operational_status}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Status"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#8884d8"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#8884d8"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        tickMargin={12}
                                        reversed={false}
                                        tick={{
                                            fontSize: 13,
                                        }}
                                        dataKey="Date"
                                    />
                                    <YAxis
                                        domain={[0, 1]}
                                        ticks={[0, 1]}
                                        tickFormatter={(value) =>
                                            value === 1 ? "Run" : "Stop"
                                        }
                                        tick={{
                                            fontSize: 13,
                                        }}
                                    />
                                    <Legend
                                        wrapperStyle={{
                                            fontSize: 14,
                                            paddingTop: 12,
                                        }}
                                    />
                                    <Tooltip
                                        formatter={(value) =>
                                            value === 1 ? "Run" : "Stop"
                                        }
                                        contentStyle={{ fontSize: 12 }}
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Status"
                                        stroke="#8884d8"
                                        fillOpacity={1}
                                        fill="url(#Status)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* LEAKAGE */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Leakage
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={leakage}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Leakage"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#c1666b"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#c1666b"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        tickMargin={12}
                                        reversed={false}
                                        tick={{
                                            fontSize: 13,
                                        }}
                                        dataKey="Date"
                                    />
                                    <YAxis
                                        domain={[0, 1]}
                                        ticks={[0, 1]}
                                        tickFormatter={(value) =>
                                            value === 1 ? "Save" : "Leak"
                                        }
                                        tick={{
                                            fontSize: 13,
                                        }}
                                    />
                                    <Legend
                                        wrapperStyle={{
                                            fontSize: 14,
                                            paddingTop: 12,
                                        }}
                                    />
                                    <Tooltip
                                        formatter={(value) =>
                                            value === 1 ? "Save" : "Leak"
                                        }
                                        contentStyle={{ fontSize: 12 }}
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Leakage"
                                        stroke="#c1666b"
                                        fillOpacity={1}
                                        fill="url(#Leakage)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* EVASOR */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Evaporator & Condensor
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={evasor}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Evaporator"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#82ca9d"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#82ca9d"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="Condensor"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#759AAB"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#759AAB"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        tickMargin={12}
                                        reversed={false}
                                        tick={{
                                            fontSize: 13,
                                        }}
                                        dataKey="Date"
                                    />
                                    <YAxis
                                        domain={[0, 1]}
                                        ticks={[0, 1]}
                                        tickFormatter={(value) =>
                                            value === 1 ? "Clean" : "Dirty"
                                        }
                                        tick={{
                                            fontSize: 13,
                                        }}
                                    />
                                    <Legend
                                        wrapperStyle={{
                                            fontSize: 14,
                                            paddingTop: 12,
                                        }}
                                    />
                                    <Tooltip
                                        formatter={(value) =>
                                            value === 1 ? "Clean" : "Dirty"
                                        }
                                        contentStyle={{ fontSize: 12 }}
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Evaporator"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#Evaporator)"
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Condensor"
                                        stroke="#759AAB"
                                        fillOpacity={1}
                                        fill="url(#Condensor)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* CURRENTS */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Currents
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={currents}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Before"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#202c59"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#202c59"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="After"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#d95d39"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#d95d39"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        tickMargin={12}
                                        reversed={false}
                                        tick={{
                                            fontSize: 13,
                                        }}
                                        dataKey="Date"
                                    />
                                    <YAxis
                                        domain={[0, 20]}
                                        type="number"
                                        tick={{
                                            fontSize: 13,
                                        }}
                                    />
                                    <CartesianGrid strokeDasharray="4 4" />
                                    <Legend
                                        wrapperStyle={{
                                            fontSize: 14,
                                            paddingTop: 12,
                                        }}
                                    />
                                    <Tooltip contentStyle={{ fontSize: 12 }} />
                                    <Area
                                        type="monotone"
                                        dataKey="Before"
                                        stroke="#103f81"
                                        fillOpacity={1}
                                        fill="url(#Before)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="After"
                                        stroke="#d95d39"
                                        fillOpacity={1}
                                        fill="url(#After)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* TEMPERATURE */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Temperature
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={temperature}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Temperature"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#8884d8"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#8884d8"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        tickMargin={12}
                                        reversed={false}
                                        tick={{
                                            fontSize: 13,
                                        }}
                                        dataKey="Date"
                                    />
                                    <YAxis
                                        tick={{
                                            fontSize: 13,
                                        }}
                                    />
                                    <CartesianGrid strokeDasharray="4 4" />
                                    <Legend
                                        wrapperStyle={{
                                            fontSize: 14,
                                            paddingTop: 12,
                                        }}
                                    />
                                    <Tooltip contentStyle={{ fontSize: 12 }} />
                                    <Area
                                        type="monotone"
                                        dataKey="Temperature"
                                        stroke="#8884d8"
                                        fillOpacity={1}
                                        fill="url(#Temperature)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* REMOTE */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Remote
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={remote}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Remote"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#82ca9d"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#82ca9d"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        tickMargin={12}
                                        reversed={false}
                                        tick={{
                                            fontSize: 13,
                                        }}
                                        dataKey="Date"
                                    />
                                    <YAxis
                                        domain={[0, 1]}
                                        ticks={[0, 1]}
                                        tickFormatter={(value) =>
                                            value === 1 ? "Good" : "Bad"
                                        }
                                        tick={{
                                            fontSize: 13,
                                        }}
                                    />
                                    <Legend
                                        wrapperStyle={{
                                            fontSize: 14,
                                            paddingTop: 12,
                                        }}
                                    />
                                    <Tooltip
                                        formatter={(value) =>
                                            value === 1 ? "Good" : "Bad"
                                        }
                                        contentStyle={{ fontSize: 12 }}
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Remote"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#Remote)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* PRESSURE */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Pressure
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={pressure}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Pressure"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#8884d8"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#8884d8"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        tickMargin={12}
                                        reversed={false}
                                        tick={{
                                            fontSize: 13,
                                        }}
                                        dataKey="Date"
                                    />
                                    <YAxis
                                        tick={{
                                            fontSize: 13,
                                        }}
                                    />
                                    <CartesianGrid strokeDasharray="4 4" />
                                    <Legend
                                        wrapperStyle={{
                                            fontSize: 14,
                                            paddingTop: 12,
                                        }}
                                    />
                                    <Tooltip contentStyle={{ fontSize: 12 }} />
                                    <Area
                                        type="monotone"
                                        dataKey="Pressure"
                                        stroke="#8884d8"
                                        fillOpacity={1}
                                        fill="url(#Pressure)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* CLEANING */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Cleaning
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={cleanings}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Filter_Indoor"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#82ca9d"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#82ca9d"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="Indoor"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#759AAB"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#759AAB"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="Outdoor"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#d95d39"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#d95d39"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        tickMargin={12}
                                        reversed={false}
                                        tick={{
                                            fontSize: 13,
                                        }}
                                        dataKey="Date"
                                    />
                                    <YAxis
                                        domain={[0, 1]}
                                        ticks={[0, 1]}
                                        tickFormatter={(value) =>
                                            value === 1 ? "Clean" : "Dirty"
                                        }
                                        tick={{
                                            fontSize: 13,
                                        }}
                                    />
                                    <Legend
                                        wrapperStyle={{
                                            fontSize: 14,
                                            paddingTop: 12,
                                        }}
                                    />
                                    <Tooltip
                                        formatter={(value) =>
                                            value === 1 ? "Clean" : "Dirty"
                                        }
                                        contentStyle={{ fontSize: 12 }}
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Filter_Indoor"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#Filter_Indoor)"
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Indoor"
                                        stroke="#759AAB"
                                        fillOpacity={1}
                                        fill="url(#Indoor)"
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Outdoor"
                                        stroke="#d95d39"
                                        fillOpacity={1}
                                        fill="url(#Outdoor)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

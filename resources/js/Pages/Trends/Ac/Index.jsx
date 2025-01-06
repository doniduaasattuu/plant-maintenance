import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
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
} from "recharts";

export default function Index({
    auth,
    can,
    equipment_id,
    operational_status,
    is_drain_leaking,
    temperatures,
    current_load,
    cleanliness,
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

                {/* DRAIN LEAKING */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Drain Leakage
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={is_drain_leaking}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="DrainLeak"
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
                                            value === 1 ? "Leak" : "No"
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
                                            value === 1 ? "Leak" : "No"
                                        }
                                        contentStyle={{ fontSize: 12 }}
                                    />
                                    <Area
                                        type="step"
                                        dataKey="DrainLeak"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#DrainLeak)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* CURRENT LOAD */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Current load
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={current_load}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="CurrentLoad"
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
                                        // domain={[0, 20]}
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
                                        dataKey="CurrentLoad"
                                        stroke="#103f81"
                                        fillOpacity={1}
                                        fill="url(#CurrentLoad)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* TEMPERATURES */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Temperatures
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={temperatures}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Blowing"
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
                                        <linearGradient
                                            id="Ambient"
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
                                        dataKey="Blowing"
                                        stroke="#8884d8"
                                        fillOpacity={1}
                                        fill="url(#Blowing)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="Ambient"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#Ambient)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* CLEANLINESS */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Cleanliness
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={cleanliness}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Filter"
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
                                            id="Evaporator"
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
                                            id="Condensor"
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
                                        dataKey="Filter"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#Filter)"
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Evaporator"
                                        stroke="#759AAB"
                                        fillOpacity={1}
                                        fill="url(#Evaporator)"
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Condensor"
                                        stroke="#d95d39"
                                        fillOpacity={1}
                                        fill="url(#Condensor)"
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
                                            id="Filter"
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
                                            id="Evaporator"
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
                                            id="Condensor"
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
                                            value === 1 ? "Yes" : "No"
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
                                            value === 1 ? "Yes" : "No"
                                        }
                                        contentStyle={{ fontSize: 12 }}
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Filter"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#Filter)"
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Evaporator"
                                        stroke="#759AAB"
                                        fillOpacity={1}
                                        fill="url(#Evaporator)"
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Condensor"
                                        stroke="#d95d39"
                                        fillOpacity={1}
                                        fill="url(#Condensor)"
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

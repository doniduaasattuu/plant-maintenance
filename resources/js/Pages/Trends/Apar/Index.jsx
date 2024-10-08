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
    seal,
    weight,
    pressure,
    body,
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
                    table={"apar"}
                />
            }
        >
            <Head title={`Trend of ${equipment_id}`} />

            <div className="py-4 space-y-10">
                {/* SEAL */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Seal
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={seal}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Seal"
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
                                            value === 1 ? "Good" : "Broken"
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
                                            value === 1 ? "Good" : "Broken"
                                        }
                                        contentStyle={{ fontSize: 12 }}
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Seal"
                                        stroke="#8884d8"
                                        fillOpacity={1}
                                        fill="url(#Seal)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* WEIGHT */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Weight
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={weight}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Weight"
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
                                        dataKey="Weight"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#Weight)"
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
                            <ResponsiveContainer width="100%" height={150}>
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
                                        domain={[0, 1]}
                                        ticks={[0, 1]}
                                        tickFormatter={(value) =>
                                            value === 1 ? "Good" : "Broken"
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
                                            value === 1 ? "Good" : "Broken"
                                        }
                                        contentStyle={{ fontSize: 12 }}
                                    />
                                    <Area
                                        type="step"
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

                {/* BODY */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Body
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={body}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Body"
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
                                            value === 1 ? "Good" : "Rusty"
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
                                            value === 1 ? "Good" : "Rusty"
                                        }
                                        contentStyle={{ fontSize: 12 }}
                                    />
                                    <Area
                                        type="step"
                                        dataKey="Body"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#Body)"
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

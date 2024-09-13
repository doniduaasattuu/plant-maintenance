import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
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
    temperatures,
    de_vibration,
    noise_de,
    nde_vibration,
    noise_nde,
    operational_status,
    cleanliness,
    number_of_greasing,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-xl leading-tight">
                                Equipment Trend
                            </h2>

                            <p className="mt-1 text-sm">
                                Records of equipment {equipment_id}
                            </p>
                        </div>
                        {/* <div>
                            {can.role_create && (
                                <Link href={route("roles.create")}>
                                    <PrimaryButton>Print</PrimaryButton>
                                </Link>
                            )}
                        </div> */}
                    </div>
                </>
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
                                        reversed={true}
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
                                            id="Cleanliness"
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
                                        reversed={true}
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
                                        dataKey="Cleanliness"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#Cleanliness)"
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
                                            id="DE"
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
                                        <linearGradient
                                            id="NDE"
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
                                        reversed={true}
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
                                        dataKey="DE"
                                        stroke="#8884d8"
                                        fillOpacity={1}
                                        fill="url(#DE)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="Body"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#Body)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="NDE"
                                        stroke="#759AAB"
                                        fillOpacity={1}
                                        fill="url(#NDE)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* DE VIBRATION */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Drive End Vibration
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={de_vibration}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="DEV"
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
                                            id="DEH"
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
                                            id="DEA"
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
                                            id="DEF"
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
                                        reversed={true}
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
                                        dataKey="DEV"
                                        stroke="#8884d8"
                                        fillOpacity={1}
                                        fill="url(#DEV)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="DEH"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#DEH)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="DEA"
                                        stroke="#759AAB"
                                        fillOpacity={1}
                                        fill="url(#DEA)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="DEF"
                                        stroke="#c1666b"
                                        fillOpacity={1}
                                        fill="url(#DEF)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* NOISE DE */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Noise DE
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={noise_de}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Noise_DE"
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
                                        reversed={true}
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
                                        dataKey="Noise_DE"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#Noise_DE)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* NDE VIBRATION */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Non Drive End Vibration
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={nde_vibration}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="NDEV"
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
                                            id="NDEH"
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
                                            id="NDEF"
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
                                        reversed={true}
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
                                        dataKey="NDEV"
                                        stroke="#8884d8"
                                        fillOpacity={1}
                                        fill="url(#DEV)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="NDEH"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#DEH)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="NDEF"
                                        stroke="#c1666b"
                                        fillOpacity={1}
                                        fill="url(#DEF)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* NOISE NDE */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Noise NDE
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart
                                    syncId={equipment_id}
                                    data={noise_nde}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Noise_NDE"
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
                                        reversed={true}
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
                                        dataKey="Noise_NDE"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#Noise_NDE)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* NUMBER OF GREASING */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-scroll shadow-lg sm:rounded-lg px-4 py-8 bg-base-200 space-y-6">
                        <h2 className="font-semibold text-xl leading-tight text-center opacity-80">
                            Greasing
                        </h2>
                        <div className="min-w-xs">
                            <ResponsiveContainer width="100%" height={150}>
                                <BarChart
                                    syncId={equipment_id}
                                    data={number_of_greasing}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Greasing"
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
                                        reversed={true}
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
                                    <Legend
                                        wrapperStyle={{
                                            fontSize: 14,
                                            paddingTop: 12,
                                        }}
                                    />
                                    <Tooltip contentStyle={{ fontSize: 12 }} />
                                    <Bar
                                        dataKey="Greasing"
                                        stroke="#8884d8"
                                        fillOpacity={1}
                                        fill="url(#Greasing)"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

<?php

namespace App\Exports;

use App\Http\Resources\Export\MotorCheckExportResource;
use App\Models\MotorCheck;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class MotorChecksExport implements FromCollection, WithHeadings
{
    private string $equipment_id;

    public function __construct(string $equipment_id)
    {
        $this->equipment_id = $equipment_id;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $motorChecks = MotorCheck::select(
            'operational_status_id',
            'cleanliness_id',
            'number_of_greasing',
            'temperature_de',
            'temperature_body',
            'temperature_nde',
            'vibration_dev',
            'vibration_deh',
            'vibration_dea',
            'vibration_def',
            'noise_de',
            'vibration_ndev',
            'vibration_ndeh',
            'vibration_ndef',
            'noise_nde',
            'checked_by',
            'created_at',
        )
            ->whereRelation('checkingForm', 'equipment_id', $this->equipment_id)
            ->whereBetween('created_at', [Carbon::now()->subYear()->startOfDay(), Carbon::now()])
            ->orderBy('created_at', 'DESC')
            ->get();

        return MotorCheckExportResource::collection($motorChecks);
    }

    public function headings(): array
    {
        return [
            'Status',
            'Cleanliness',
            'Greasing',
            'Temp DE',
            'Temp Body',
            'Temp NDE',
            'Vib DE Vertical',
            'Vib DE Horizontal',
            'Vib DE Axial',
            'Vib DE Frame',
            'Noise DE',
            'Vib NDE Vertical',
            'Vib NDE Horizontal',
            'Vib NDE Frame',
            'Noise NDE',
            'Checked by',
            'Date',
        ];
    }
}

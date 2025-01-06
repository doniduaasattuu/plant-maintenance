<?php

namespace App\Exports;

use App\Http\Resources\Export\AcCheckExportResource;
use App\Models\AcCheck;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AcCheckExport implements FromCollection, WithHeadings
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
        $acChecks = AcCheck::select(
            'is_operational',
            'is_drain_leaking',
            'current_load',
            'blowing_temperature',
            'ambient_temperature',
            'is_filter_clean',
            'is_evaporator_clean',
            'is_condensor_clean',
            'cleaning_filter',
            'cleaning_evaporator',
            'cleaning_condensor',
            'checked_by',
            'created_at',
        )
            ->whereRelation('checkingForm', 'equipment_id', $this->equipment_id)
            ->whereBetween('created_at', [Carbon::now()->subYear()->startOfDay(), Carbon::now()])
            ->orderBy('created_at', 'DESC')
            ->get();

        return AcCheckExportResource::collection($acChecks);
    }

    public function headings(): array
    {
        return [
            'Status',
            'Drain leaking',
            'Current load',
            'Blowing temperature',
            'Ambient temperature',
            'Filter',
            'Evaporator',
            'Condensor',
            'Cleaning filter',
            'Cleaning evaporator',
            'Cleaning condensor',
            'Checked by',
            'Date',
        ];
    }
}

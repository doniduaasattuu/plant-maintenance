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
            'operational_status_id',
            'leakage',
            'evaporator',
            'condensor',
            'current_before_cleaning',
            'current_after_cleaning',
            'temperature',
            'remote',
            'compressor_pressure',
            'cleaning_filter_indoor',
            'cleaning_indoor',
            'cleaning_outdoor',
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
            'Any leakage',
            'Cleaning evaporator',
            'Cleaning condensor',
            'Current before cleaning',
            'Current after cleaning',
            'Temperature',
            'Remote',
            'Compressor pressure',
            'Cleaning filter indoor',
            'Cleaning indoor',
            'Cleaning outdoor',
            'Checked by',
            'Date',
        ];
    }
}

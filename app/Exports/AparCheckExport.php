<?php

namespace App\Exports;

use App\Http\Resources\Export\AparCheckExportResource;
use App\Models\AparCheck;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AparCheckExport implements FromCollection, WithHeadings
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
        $aparChecks = AparCheck::select(
            'seal',
            'weight',
            'pressure',
            'body',
            'remark',
            'checked_by',
            'created_at',
        )
            ->whereRelation('checkingForm', 'equipment_id', $this->equipment_id)
            ->whereBetween('created_at', [Carbon::now()->subYear()->startOfDay(), Carbon::now()])
            ->orderBy('created_at', 'DESC')
            ->get();

        return AparCheckExportResource::collection($aparChecks);
    }

    public function headings(): array
    {
        return [
            'Seal',
            'Weight',
            'Pressure',
            'Body',
            'Remark',
            'Checked by',
            'Date',
        ];
    }
}

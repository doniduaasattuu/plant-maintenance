<?php

namespace Database\Factories;

use App\Models\Classification;
use App\Models\FunctionalLocation;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Equipment>
 */
class EquipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $equipment_codes = [
            'EGE',
            'EGO',
            'ELP',
            'EMO',
            'ETF',
            'EUP',
            'EWB',
            'FCV',
            'FDV',
            'FMV',
            'FOR',
            'FPG',
            'FPI',
            'FRV',
            'FSI',
            'FSS',
            'FST',
            'FSV',
            'HEN',
            'IAE',
            'IAP',
            'IAV',
            'IBU',
            'ICE',
            'ICT',
            'ICV',
            'IDC',
            'IDM',
            'IEB',
            'IFD',
            'IFT',
            'IGA',
            'IGD',
            'IGN',
            'IGU',
            'IIC',
            'IID',
            'IIF',
            'IIS',
            'IKT',
            'ILS',
            'ILT',
            'ILV',
            'IMG',
            'IMT',
            'IND',
            'IOA',
            'IOV',
            'IPD',
            'IPH',
            'APR',
        ];

        $classifications_id = Classification::all()->pluck('id');
        $functional_locations_id = FunctionalLocation::all()->pluck('id');
        $equipment_status = [1, 2, 3];

        $status = Arr::random($equipment_status);

        return [
            'id' => Arr::random($equipment_codes) . fake()->numerify('######'),
            'classification_id' => $classifications_id->random(),
            'functional_location_id' => $status == 2 ? $functional_locations_id->random() : null,
            'sort_field' => $status == 2 ?  Str::upper(fake()->sentence(2)) : null,
            'description' => fake()->sentence(6),
            'equipment_status_id' => $status,
            'updated_by' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

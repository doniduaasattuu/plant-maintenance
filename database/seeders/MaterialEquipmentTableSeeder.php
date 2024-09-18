<?php

namespace Database\Seeders;

use App\Models\Equipment;
use App\Models\Material;
use Illuminate\Database\Seeder;

class MaterialEquipmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $equipments = Equipment::query()
            ->limit(12)
            ->get();

        $equipments->map(function ($equipment) {
            $equipment->materials()->attach(10010123);
        });

        // $materials = Material::query()
        //     ->limit(12)
        //     ->get();

        // $materials->map(function ($material) {
        //     $material->equipments()->attach('EMO000123');
        // });

        $equipment = Equipment::find('EMO000123');
        $equipment->materials()->attach(Material::first());
    }
}

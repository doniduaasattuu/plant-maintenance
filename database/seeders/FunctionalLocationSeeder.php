<?php

namespace Database\Seeders;

use App\Models\FunctionalLocation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FunctionalLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FunctionalLocation::factory()
            ->count(100)
            ->create();

        FunctionalLocation::insert([
            'id' => 'FP-01-PM3',
            'description' => 'PAPER MACHINE #3',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

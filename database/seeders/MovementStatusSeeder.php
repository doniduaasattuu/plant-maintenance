<?php

namespace Database\Seeders;

use App\Models\MovementStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovementStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movement_status = [
            [
                'id' => 1,
                'keyword' => 'Installed',
            ],
            [
                'id' => 2,
                'keyword' => 'Dismantled',
            ],
        ];

        MovementStatus::insert($movement_status);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Division;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $divisions = [
            [
                'id' => 1,
                'title' => 'Electrical Engineering',
            ],
            [
                'id' => 2,
                'title' => 'Mechanical Engineering',
            ],
            [
                'id' => 3,
                'title' => 'Paper Machine',
            ],
        ];

        Division::insert($divisions);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $electrical = [
            [
                'id' => 'EI1',
                'division_id' => 1,
                'title' => 'Electric Instrument PM12',
            ],
            [
                'id' => 'EI2',
                'division_id' => 1,
                'title' => 'Electric Instrument PM37',
            ],
            [
                'id' => 'EI3',
                'division_id' => 1,
                'title' => 'Electric Instrument PM58',
            ],
            [
                'id' => 'EI4',
                'division_id' => 1,
                'title' => 'Electric Instrument SP12',
            ],
            [
                'id' => 'EI5',
                'division_id' => 1,
                'title' => 'Electric Utility & WWT',
            ],
            [
                'id' => 'EI6',
                'division_id' => 1,
                'title' => 'Electric Instrument Energy Center',
            ],
        ];

        Department::insert($electrical);
    }
}

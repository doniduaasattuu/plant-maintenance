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
        $departments = [
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
            [
                'id' => 'EI7',
                'division_id' => 1,
                'title' => 'Electric Inspector',
            ],
            [
                'id' => 'ME1',
                'division_id' => 2,
                'title' => 'Mechanic PM12',
            ],
            [
                'id' => 'ME2',
                'division_id' => 2,
                'title' => 'Mechanic PM37',
            ],
            [
                'id' => 'ME3',
                'division_id' => 2,
                'title' => 'Mechanic PM58',
            ],
            [
                'id' => 'PM1',
                'division_id' => 3,
                'title' => 'Paper Machine #1',
            ],
            [
                'id' => 'PM2',
                'division_id' => 3,
                'title' => 'Paper Machine #2',
            ],
            [
                'id' => 'PM3',
                'division_id' => 3,
                'title' => 'Paper Machine #3',
            ],
            [
                'id' => 'PM5',
                'division_id' => 3,
                'title' => 'Paper Machine #5',
            ],
            [
                'id' => 'PM7',
                'division_id' => 3,
                'title' => 'Paper Machine #7',
            ],
            [
                'id' => 'PM8',
                'division_id' => 3,
                'title' => 'Paper Machine #8',
            ],
        ];

        Department::insert($departments);
    }
}

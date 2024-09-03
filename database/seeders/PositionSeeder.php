<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            [
                'id' => 'OPR',
                'title' => 'Operator',
            ],
            [
                'id' => 'FR',
                'title' => 'Foreman',
            ],
            [
                'id' => 'GL',
                'title' => 'Group Leader',
            ],
            [
                'id' => 'SPV',
                'title' => 'Supervisor',
            ],
            [
                'id' => 'DH',
                'title' => 'Dept. Head',
            ],
            [
                'id' => 'MNG',
                'title' => 'Manager',
            ],
            [
                'id' => 'DIR',
                'title' => 'Director',
            ],
        ];

        Position::insert($positions);
    }
}

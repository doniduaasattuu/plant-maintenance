<?php

namespace Database\Seeders;

use App\Models\OperationalStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OperationalStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $operationalStatuses = [
            [
                'id' => 1,
                'keyword' => 'Active',
            ],
            [
                'id' => 2,
                'keyword' => 'Inactive',
            ],
        ];

        OperationalStatus::insert($operationalStatuses);
    }
}

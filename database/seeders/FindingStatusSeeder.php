<?php

namespace Database\Seeders;

use App\Models\FindingStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FindingStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $finding_status = [
            [
                'id' => 1,
                'keyword' => 'Open'
            ],
            [
                'id' => 2,
                'keyword' => 'Closed'
            ],
        ];

        FindingStatus::insert($finding_status);
    }
}

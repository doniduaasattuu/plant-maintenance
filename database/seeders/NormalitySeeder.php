<?php

namespace Database\Seeders;

use App\Models\Normality;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NormalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $normality = [
            [
                'id' => 1,
                'keyword' => 'Normal',
                'description' => 'Equipment is operating safely and efficiently, with no need for immediate maintenance or intervention.',
            ],
            [
                'id' => 2,
                'keyword' => 'Abnormal',
                'description' => 'The equipment requires further inspection or maintenance to ensure safe and effective operation.',
            ],
        ];

        Normality::insert($normality);
    }
}

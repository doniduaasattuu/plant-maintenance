<?php

namespace Database\Seeders;

use App\Models\Goodness;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GoodnessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $goodness = [
            [
                'id' => 1,
                'keyword' => 'Good',
            ],
            [
                'id' => 2,
                'keyword' => 'Not Good',
            ],
        ];

        Goodness::insert($goodness);
    }
}

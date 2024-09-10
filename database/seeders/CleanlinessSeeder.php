<?php

namespace Database\Seeders;

use App\Models\Cleanliness;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CleanlinessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cleanliness = [
            [
                'id' => 1,
                'keyword' => 'Clean',
            ],
            [
                'id' => 2,
                'keyword' => 'Dirty',
            ],
        ];

        Cleanliness::insert($cleanliness);
    }
}

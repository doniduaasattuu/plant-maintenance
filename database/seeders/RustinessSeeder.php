<?php

namespace Database\Seeders;

use App\Models\Rustiness;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RustinessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rustiness = [
            [
                'id' => 1,
                'keyword' => 'Good',
            ],
            [
                'id' => 2,
                'keyword' => 'Rusty',
            ],
        ];

        Rustiness::insert($rustiness);
    }
}

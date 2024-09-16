<?php

namespace Database\Seeders;

use App\Models\Confirmation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConfirmationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $confirmations = [
            [
                'id' => 1,
                'keyword' => 'Yes',
            ],
            [
                'id' => 2,
                'keyword' => 'No',
            ],
        ];

        Confirmation::insert($confirmations);
    }
}

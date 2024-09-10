<?php

namespace Database\Seeders;

use App\Models\MotorCheckRecord;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MotorCheckRecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MotorCheckRecord::factory()
            ->count(100)
            ->create();
    }
}

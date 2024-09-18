<?php

namespace Database\Seeders;

use App\Models\UnitOfMeasurement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnitOfMeasurementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $unitOfMeasurements = [
            [
                'id' => 'A',
                'keyword' => 'Ampere'
            ],
            [
                'id' => 'BTG',
                'keyword' => 'Batang'
            ],
            [
                'id' => 'CM',
                'keyword' => 'Centimeter'
            ],
            [
                'id' => 'CM2',
                'keyword' => 'Square centimeter'
            ],
            [
                'id' => 'CON',
                'keyword' => 'Container'
            ],
            [
                'id' => 'CU',
                'keyword' => 'Cubic'
            ],
            [
                'id' => 'D',
                'keyword' => 'Days'
            ],
            [
                'id' => 'DEG',
                'keyword' => 'Degree'
            ],
            [
                'id' => 'FT',
                'keyword' => 'Foot'
            ],
            [
                'id' => 'FT2',
                'keyword' => 'Square foot'
            ],
            [
                'id' => 'GOH',
                'keyword' => 'Gigaohm'
            ],
            [
                'id' => 'H',
                'keyword' => 'Hour'
            ],
            [
                'id' => 'KG',
                'keyword' => 'Kilogram'
            ],
            [
                'id' => 'KM',
                'keyword' => 'Kilometer'
            ],
            [
                'id' => 'M',
                'keyword' => 'Meter'
            ],
            [
                'id' => 'M/H',
                'keyword' => 'Meter per hour'
            ],
            [
                'id' => 'MGO',
                'keyword' => 'Megohm'
            ],
            [
                'id' => 'MIN',
                'keyword' => 'Minute'
            ],
            [
                'id' => 'PC',
                'keyword' => 'Piece'
            ],
            [
                'id' => 'USD',
                'keyword' => 'US Dollar'
            ],
        ];

        UnitOfMeasurement::insert($unitOfMeasurements);
    }
}

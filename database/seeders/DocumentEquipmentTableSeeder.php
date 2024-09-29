<?php

namespace Database\Seeders;

use App\Models\Document;
use App\Models\Equipment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DocumentEquipmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $documents = Document::limit(5)->get();

        Equipment::find('EMO000123')->documents()->attach($documents);
    }
}

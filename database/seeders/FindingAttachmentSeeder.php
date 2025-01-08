<?php

namespace Database\Seeders;

use App\Models\FindingAttachment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FindingAttachmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FindingAttachment::factory()
            ->count(100);
    }
}

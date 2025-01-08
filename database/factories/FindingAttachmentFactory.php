<?php

namespace Database\Factories;

use App\Models\Finding;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FindingAttachment>
 */
class FindingAttachmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $findings = Finding::all();
        $finding = $findings->random();

        return [
            'finding_id' => $finding->id,
            'type' => Arr::random(['before', 'after']),
            'file_path' => 'https://source.unsplash.com/random/800x600',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Equipment;
use App\Models\FindingStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Finding>
 */
class FindingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $equipment = Equipment::where('equipment_status_id', 2)->first();
        $status = FindingStatus::all()->random()->id;

        return [
            'finding_status_id' => $status,
            'equipment_id' => $equipment->id,
            'functional_location_id' => $equipment->functional_location_id,
            'description' => fake()->sentence(),
            'notification' => '100' . fake()->numerify('#####'),
            'attachment_before' => "findings/" . uniqid() . '.png',
            'attachment_after' => $status == 2 ? "findings/" . uniqid() . '.png' : null,
            'reported_by' => User::all()->random()->id,
            'closed_by' => $status == 2 ? User::all()->random()->id : null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

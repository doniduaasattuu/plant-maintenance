<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FunctionalLocation>
 */
class FunctionalLocationFactory extends Factory
{


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $paper_machines = ['SP1', 'PM1', 'SP2', 'PM2', 'SP3', 'PM3', 'SP5', 'PM5', 'SP7', 'PM7', 'SP8', 'PM8',];
        $sub = ['WRS', 'WTS', 'OCC', 'BRS', 'DRY', 'PNL', 'CUT', 'CAS', 'HOO', 'RHD', 'STC', 'SWG', 'TRF', 'VAS', 'WET', 'MCL', 'STA', 'APS',];
        $area = ['TO', 'BW', 'AP', 'HO', 'PJ', 'PU', 'GB', 'MD', 'MO'];

        return [
            'id' => 'FP-01-' . Arr::random($paper_machines) . '-' . Arr::random($sub) . '-' . Arr::random($area) . fake()->numerify('##') . '-' . fake()->numerify('###'),
            'description' => fake()->sentence(3),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

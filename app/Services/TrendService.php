<?php

namespace App\Services;

use App\Models\AcCheck;
use App\Models\AparCheck;
use App\Models\Equipment;
use App\Models\MotorCheck;
use Inertia\Inertia;

class TrendService
{
    public function generate(Equipment $equipment, $equipmentChecks)
    {
        $links = $equipment->links;
        $classification_id = trim($equipment->classification_id);

        if ($classification_id == 'ZCLASS_E009') {

            $is_operational = $equipmentChecks->map(function (MotorCheck $motorCheck, int $index) {
                return [
                    'Status' => $motorCheck->is_operational,
                    'Date' => $motorCheck->created_at->format('d/m/y')
                ];
            });

            $is_clean = $equipmentChecks->map(function (MotorCheck $motorCheck, int $index) {
                return [
                    'Cleanliness' => $motorCheck->is_clean,
                    'Date' => $motorCheck->created_at->format('d/m/y')
                ];
            });

            $temperatures = $equipmentChecks->map(function (MotorCheck $dmotorCheck, int $index) {
                return [
                    'DE' => $dmotorCheck->temperature_de,
                    'Body' => $dmotorCheck->temperature_body,
                    'NDE' => $dmotorCheck->temperature_nde,
                    'Date' => $dmotorCheck->created_at->format('d/m/y')
                ];
            });

            $de_vibration = $equipmentChecks->map(function (MotorCheck $dmotorCheck, int $index) {
                return [
                    'DEV' => $dmotorCheck->vibration_dev,
                    'DEH' => $dmotorCheck->vibration_deh,
                    'DEA' => $dmotorCheck->vibration_dea,
                    'DEF' => $dmotorCheck->vibration_def,
                    'Date' => $dmotorCheck->created_at->format('d/m/y')
                ];
            });

            $is_noisy_de = $equipmentChecks->map(function (MotorCheck $dmotorCheck, int $index) {
                return [
                    'Noise_DE' => $dmotorCheck->is_noisy_de,
                    'Date' => $dmotorCheck->created_at->format('d/m/y')
                ];
            });

            $nde_vibration = $equipmentChecks->map(function (MotorCheck $dmotorCheck, int $index) {
                return [
                    'NDEV' => $dmotorCheck->vibration_ndev,
                    'NDEH' => $dmotorCheck->vibration_ndeh,
                    'NDEF' => $dmotorCheck->vibration_ndef,
                    'Date' => $dmotorCheck->created_at->format('d/m/y')
                ];
            });

            $is_noisy_nde = $equipmentChecks->map(function (MotorCheck $dmotorCheck, int $index) {
                return [
                    'Noise_NDE' => $dmotorCheck->is_noisy_nde,
                    'Date' => $dmotorCheck->created_at->format('d/m/y')
                ];
            });

            $number_of_greasing = $equipmentChecks->map(function (MotorCheck $dmotorCheck, int $index) {
                return [
                    'Greasing' => $dmotorCheck->number_of_greasing,
                    'Date' => $dmotorCheck->created_at->format('d/m/y')
                ];
            });

            // MOTOR TREND
            return Inertia::render('Trends/Motor/Index', [
                'equipment_id' => $equipment->id,
                'operational_status' => $is_operational,
                'cleanliness' => $is_clean,
                'temperatures' => $temperatures,
                'de_vibration' => $de_vibration,
                'noise_de' => $is_noisy_de,
                'nde_vibration' => $nde_vibration,
                'noise_nde' => $is_noisy_nde,
                'number_of_greasing' => $number_of_greasing,
                'links' => $links,
                'classification_id' => $classification_id,
            ]);
        } else if ($classification_id == 'ZCLASS_U001') {
            $is_operational = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Status' => $acCheck->is_operational,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $is_drain_leaking = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'DrainLeak' => $acCheck->is_drain_leaking,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $current_load = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'CurrentLoad' => $acCheck->current_load,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $temperatures = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Blowing' => $acCheck->blowing_temperature,
                    'Ambient' => $acCheck->ambient_temperature,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $cleanliness = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Filter' => $acCheck->is_filter_clean,
                    'Evaporator' => $acCheck->is_evaporator_clean,
                    'Condensor' => $acCheck->is_condensor_clean,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $cleanings = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Filter' => $acCheck->cleaning_filter,
                    'Evaporator' => $acCheck->cleaning_evaporator,
                    'Condensor' => $acCheck->cleaning_condensor,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            // AC TREND
            return Inertia::render('Trends/Ac/Index', [
                'equipment_id' => $equipment->id,
                'operational_status' => $is_operational,
                'is_drain_leaking' => $is_drain_leaking,
                'temperatures' => $temperatures,
                'current_load' => $current_load,
                'cleanliness' => $cleanliness,
                'cleanings' => $cleanings,
                'links' => $links,
                'classification_id' => $classification_id,
            ]);
        } else if ($classification_id == 'ZCLASS_S001') {
            $seal = $equipmentChecks->map(function (AparCheck $aparCheck, int $index) {
                return [
                    'Seal' => $aparCheck->is_seal_ok,
                    'Date' => $aparCheck->created_at->format('d/m/y')
                ];
            });

            $weight = $equipmentChecks->map(function (AparCheck $aparCheck, int $index) {
                return [
                    'Weight' => $aparCheck->is_weight_ok,
                    'Date' => $aparCheck->created_at->format('d/m/y')
                ];
            });

            $pressure = $equipmentChecks->map(function (AparCheck $aparCheck, int $index) {
                return [
                    'Pressure' => $aparCheck->is_pressure_ok,
                    'Date' => $aparCheck->created_at->format('d/m/y')
                ];
            });

            $body = $equipmentChecks->map(function (AparCheck $aparCheck, int $index) {
                return [
                    'Body' => $aparCheck->is_body_ok,
                    'Date' => $aparCheck->created_at->format('d/m/y')
                ];
            });


            // APAR TREND
            return Inertia::render('Trends/Apar/Index', [
                'equipment_id' => $equipment->id,
                'seal' => $seal,
                'weight' => $weight,
                'pressure' => $pressure,
                'body' => $body,
                'links' => $links,
                'classification_id' => $classification_id,
            ]);
        };

        abort(404);
    }
}

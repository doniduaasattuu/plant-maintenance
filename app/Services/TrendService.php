<?php

namespace App\Services;

use App\Models\Equipment;
use App\Models\MotorCheck;
use Inertia\Inertia;

class TrendService
{
    public function generate(Equipment $equipment, $equipmentChecks)
    {

        if ($equipment->classification_id == 'ZCLASS_E009') {

            $operational_status = $equipmentChecks->map(function (MotorCheck $motorCheck, int $index) {
                return [
                    'Status' => $motorCheck->operational_status_id == 1 ? $motorCheck->operational_status_id : 0,
                    'Date' => $motorCheck->created_at->format('d/m/y')
                ];
            });

            $cleanliness = $equipmentChecks->map(function (MotorCheck $motorCheck, int $index) {
                return [
                    'Cleanliness' => $motorCheck->cleanliness_id == 1 ? $motorCheck->cleanliness_id : 0,
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

            $noise_de = $equipmentChecks->map(function (MotorCheck $dmotorCheck, int $index) {
                return [
                    'Noise_DE' => $dmotorCheck->noise_de == 1 ? $dmotorCheck->noise_de : 0,
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

            $noise_nde = $equipmentChecks->map(function (MotorCheck $dmotorCheck, int $index) {
                return [
                    'Noise_NDE' => $dmotorCheck->noise_nde == 1 ? $dmotorCheck->noise_nde : 0,
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
                'operational_status' => $operational_status,
                'cleanliness' => $cleanliness,
                'temperatures' => $temperatures,
                'de_vibration' => $de_vibration,
                'noise_de' => $noise_de,
                'nde_vibration' => $nde_vibration,
                'noise_nde' => $noise_nde,
                'number_of_greasing' => $number_of_greasing,
            ]);
        };
    }
}

<?php

namespace App\Services;

use App\Models\AcCheck;
use App\Models\Equipment;
use App\Models\MotorCheck;
use Inertia\Inertia;

class TrendService
{
    public function generate(Equipment $equipment, $equipmentChecks)
    {
        if (trim($equipment->classification_id) == 'ZCLASS_E009') {

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
        } else if (trim($equipment->classification_id) == 'ZCLASS_U001') {
            $operational_status = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Status' => $acCheck->operational_status_id == 1 ? $acCheck->operational_status_id : 0,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $leakage = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Leakage' => $acCheck->leakage == 1 ? $acCheck->leakage : 0,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $condensor = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Condensor' => $acCheck->condensor == 1 ? $acCheck->condensor : 0,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $evaporator = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Evaporator' => $acCheck->evaporator == 1 ? $acCheck->evaporator : 0,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $evasor = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Condensor' => $acCheck->condensor == 1 ? $acCheck->condensor : 0,
                    'Evaporator' => $acCheck->evaporator == 1 ? $acCheck->evaporator : 0,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $currents = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Before' => $acCheck->current_before_cleaning,
                    'After' => $acCheck->current_after_cleaning,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $temperature = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Temperature' => $acCheck->temperature,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $remote = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Remote' => $acCheck->remote == 1 ? $acCheck->remote : 0,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $pressure = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Pressure' => $acCheck->compressor_pressure,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });

            $cleanings = $equipmentChecks->map(function (AcCheck $acCheck, int $index) {
                return [
                    'Filter_Indoor' => $acCheck->cleaning_filter_indoor == 1 ? $acCheck->cleaning_filter_indoor : 0,
                    'Indoor' => $acCheck->cleaning_indoor == 1 ? $acCheck->cleaning_indoor : 0,
                    'Outdoor' => $acCheck->cleaning_outdoor == 1 ? $acCheck->cleaning_outdoor : 0,
                    'Date' => $acCheck->created_at->format('d/m/y')
                ];
            });


            // AC TREND
            return Inertia::render('Trends/Ac/Index', [
                'equipment_id' => $equipment->id,
                'operational_status' => $operational_status,
                'leakage' => $leakage,
                'condensor' => $condensor,
                'evaporator' => $evaporator,
                'evasor' => $evasor,
                'currents' => $currents,
                'temperature' => $temperature,
                'remote' => $remote,
                'pressure' => $pressure,
                'cleanings' => $cleanings,
            ]);
        };

        abort(404);
    }
}

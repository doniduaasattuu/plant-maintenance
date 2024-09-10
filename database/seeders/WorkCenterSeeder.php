<?php

namespace Database\Seeders;

use App\Models\WorkCenter;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkCenterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $work_centers = [
            // [
            //     'id' => 'PME21001',
            //     'title' => 'ELEC PREVENTIVE NON SHIFT PM3/7',
            // ],
            // [
            //     'id' => 'PME21002',
            //     'title' => 'INSTR PREVENTIVE NON SHIFT PM3/7',
            // ],
            // [
            //     'id' => 'PME21003',
            //     'title' => 'ELEC CORRECTIVE SHIFT PM3/7',
            // ],
            // [
            //     'id' => 'PME21004',
            //     'title' => 'ELCT PM5 AREA (NOT ACTIVE)',
            // ],
            // [
            //     'id' => 'PME21005',
            //     'title' => 'INSTR CORRECTIVE SHIFT PM3/7',
            // ],
            // [
            //     'id' => 'PME31001',
            //     'title' => 'ELEC PREVENTIVE NON SHIFT PM5/8',
            // ],
            // [
            //     'id' => 'PME31002',
            //     'title' => 'INSTR PREVENTIVE NON SHIFT PM5/8',
            // ],
            // [
            //     'id' => 'PME31003',
            //     'title' => 'ELEC CORRECTIVE SHIFT PM5/8',
            // ],
            // [
            //     'id' => 'PME31005',
            //     'title' => 'INSTR CORRECTIVE SHIFT PM5/8',
            // ],
            // [
            //     'id' => 'PME61001',
            //     'title' => 'ELECTRIC NON SHIFT ENERGY CENTER',
            // ],
            // [
            //     'id' => 'PME61002',
            //     'title' => 'ELECTRIC SHIFT 1.2.3 ENERGY CENTER',
            // ],
            // [
            //     'id' => 'PME62001',
            //     'title' => 'INSTRUMENT NON SHIFT ENERGY CENTER',
            // ],
            // [
            //     'id' => 'PME62002',
            //     'title' => 'INSTRUMENT SHIFT 1.2.3 ENERGY CENTER',
            // ],
            // [
            //     'id' => 'PME63001',
            //     'title' => 'ELECTRIC INSPECTOR',
            // ],
            // [
            //     'id' => 'PME63002',
            //     'title' => 'INSTRUMENT INSPECTOR',
            // ],
            // [
            //     'id' => 'PMG11001',
            //     'title' => 'CIVIL GA',
            // ],
            // [
            //     'id' => 'PML11001',
            //     'title' => 'CIVIL ENGINEERING – PROJECT',
            // ],
            // [
            //     'id' => 'PML11002',
            //     'title' => 'CIVIL ENGINEERING – MAINTENANCE',
            // ],
            // [
            //     'id' => 'PMM11001',
            //     'title' => 'MECH.CORRECTIVE SP1/PM1',
            // ],
            // [
            //     'id' => 'PMM11002',
            //     'title' => 'MECH.CORRECTIVE SP2/PM2',
            // ],
            // [
            //     'id' => 'PMM11003',
            //     'title' => 'MECH.PREVENTIVE SP1/PM1',
            // ],
            // [
            //     'id' => 'PMM11004',
            //     'title' => 'MECH.PREVENTIVE SP2/PM2',
            // ],
            // [
            //     'id' => 'PMM11005',
            //     'title' => 'MECH.PREVENTIVE OIL / LUB SP1-2/PM1-2',
            // ],
            // [
            //     'id' => 'PMM11006',
            //     'title' => 'MECH.PREVENTIVE COM / HYD SP1-2/PM1-2',
            // ],
            // [
            //     'id' => 'PMM11007',
            //     'title' => 'MECH.SHIFT SP1-2/PM1-2',
            // ],
            // [
            //     'id' => 'PMM21001',
            //     'title' => 'MECH PREVENTIVE SP-PM3/7 AREA',
            // ],
            // [
            //     'id' => 'PMM21002',
            //     'title' => 'MECH CORRECTIVE NON SHIFT SP-PM3/7 AREA',
            // ],
            // [
            //     'id' => 'PMM21003',
            //     'title' => 'MECH LUBRICATION SP-PM3/7 AREA',
            // ],
            // [
            //     'id' => 'PMM21004',
            //     'title' => 'MECH SHIFT SP-PM3/7 AREA',
            // ],
            // [
            //     'id' => 'PMM31001',
            //     'title' => 'MECH CORRECTIVE SP#5 & PM#5 AREA',
            // ],
            // [
            //     'id' => 'PMM31002',
            //     'title' => 'MECH SHIFT SP#5 & PM#5 AREA',
            // ],
            // [
            //     'id' => 'PMM31003',
            //     'title' => 'MECH PREVENTIVE SP#5 & PM5 AREA',
            // ],
            // [
            //     'id' => 'PMM31004',
            //     'title' => 'MECH CORRECTIVE SP#8 & PM#8 AREA',
            // ],
            // [
            //     'id' => 'PMM31005',
            //     'title' => 'MECH PREVENTIVE SP#8 & PM8 AREA',
            // ],
            // [
            //     'id' => 'PMM31006',
            //     'title' => 'MECH SHIFT SP#8 & PM#8 AREA',
            // ],
            // [
            //     'id' => 'PMM51001',
            //     'title' => 'MECH.CORRECTIVE - PREVENTIVE WWT AREA',
            // ],
            // [
            //     'id' => 'PMM51002',
            //     'title' => 'MECH.CORRECTIVE - PREVENTIVE PELLET AREA',
            // ],
            // [
            //     'id' => 'PMM51003',
            //     'title' => 'MECH.UILITY COMPRESSOR',
            // ],
            // [
            //     'id' => 'PMM51004',
            //     'title' => 'MECH.UILITY CRANES',
            // ],
        ];

        WorkCenter::insert($work_centers);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseCleaner extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('findings')->delete();
        DB::table('finding_statuses')->delete();
        DB::table('document_equipment')->delete();
        DB::table('documents')->delete();
        DB::table('material_equipment')->delete();
        DB::table('materials')->delete();
        DB::table('unit_of_measurements')->delete();
        DB::table('ac_checks')->delete();
        DB::table('motor_checks')->delete();
        DB::table('equipment_checking_forms')->delete();
        DB::table('equipment_movements')->delete();
        DB::table('movement_status')->delete();
        DB::table('equipments')->delete();
        DB::table('equipment_status')->delete();
        DB::table('classifications')->delete();
        DB::table('functional_locations')->delete();
        DB::table('role_user')->delete();
        DB::table('permission_role')->delete();
        DB::table('permissions')->delete();
        DB::table('roles')->delete();
        DB::table('users')->delete();
        DB::table('work_centers')->delete();
        DB::table('positions')->delete();
        DB::table('departments')->delete();
        DB::table('divisions')->delete();
    }
}

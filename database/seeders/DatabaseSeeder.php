<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('motor_check_records');
        DB::table('normality');
        DB::table('cleanliness');
        DB::table('operational_statuses');
        DB::table('equipment_movements');
        DB::table('movement_seeder');
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

        $this->call([
            DivisionSeeder::class,
            DepartmentSeeder::class,
            PositionSeeder::class,
            WorkCenterSeeder::class,
            UserSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            PermissionRoleTableSeeder::class,
            RoleUserTableSeeder::class,
            FunctionalLocationSeeder::class,
            ClassificationSeeder::class,
            EquipmentStatusSeeder::class,
            EquipmentSeeder::class,
            MovementStatusSeeder::class,
            EquipmentMovementSeeder::class,
            OperationalStatusSeeder::class,
            CleanlinessSeeder::class,
            NormalitySeeder::class,
            MotorCheckRecordSeeder::class,
        ]);
    }
}

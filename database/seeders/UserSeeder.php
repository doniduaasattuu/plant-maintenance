<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()
            ->count(50)
            ->create();

        User::insert([
            [
                'id' => '55000154',
                'first_name' => 'Doni',
                'last_name' => 'Darmawan',
                'department_id' => 'EI2',
                'position_id' => 'FR',
                'phone_number' => '08983456945',
                'work_center_id' => 'PME21001',
                'email' => 'doni.duaasattuu@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => '55000153',
                'first_name' => 'Jamal',
                'last_name' => 'Mirdad',
                'department_id' => 'EI6',
                'position_id' => 'SPV',
                'phone_number' => null,
                'work_center_id' => 'PME61001',
                'email' => 'jamal.mirdad@fajarpaper.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => '55000000',
                'first_name' => 'Thanan',
                'last_name' => 'Takhsin',
                'department_id' => null,
                'position_id' => null,
                'email' => 'thanan.takhsin@fajarpaper.com',
                'phone_number' => null,
                'work_center_id' => null,
                'email_verified_at' => null,
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => '11000168',
                'first_name' => 'Ridwan',
                'last_name' => 'Abdurahman',
                'department_id' => null,
                'position_id' => null,
                'email' => 'ridwan.abdurahman@tpm-maruni.com',
                'phone_number' => '08991544689',
                'work_center_id' => null,
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'id' => 1,
                'title' => Role::ROLES['Admin'],
                'created_at' => now(),

            ],
            [
                'id' => 2,
                'title' => Role::ROLES['User'],
                'created_at' => now(),
            ],
            [
                'id' => 3,
                'title' => Role::ROLES['Management'],
                'created_at' => now(),
            ],
        ];

        Role::insert($roles);
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User::all()->map(function ($user) {
        //     $user->roles()->attach(2);
        // });

        User::find('11000168')->roles()->attach(1); // admin role
        // User::find('55000154')->roles()->attach(1); // admin role
        // User::find('55000000')->roles()->attach(3); // management role
    }
}

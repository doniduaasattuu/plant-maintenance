<?php

use App\Models\User;
use Database\Seeders\DocumentSeeder;
use Illuminate\Http\UploadedFile;
use Inertia\Testing\AssertableInertia as Assert;

describe('document test', function () {

    beforeEach(function () {
        $this->seed([
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
            DocumentSeeder::class,
        ]);
    });

    test('document page should be rendered', function () {
        $admin = User::find('55000154');

        $response = $this
            ->actingAs($admin)
            ->get('/documents');

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Document/Index')
                ->has('documents')
        );
    });

    test('create new document page should be rendered', function () {
        $admin = User::find('55000154');

        $response = $this
            ->actingAs($admin)
            ->get('/documents/create');

        $response->assertOk();
        $response->assertInertia(
            fn(Assert $page) =>
            $page
                ->component('Document/Create')
        );
    });

    test('can store document', function () {
        $admin = User::find('55000154');

        $pdf = UploadedFile::fake()->create('attachment', 20, 'application/pdf');

        $response = $this
            ->actingAs($admin)
            ->post(route('documents.store'), [
                'title' => 'New document',
                'attachment' => $pdf,
            ]);

        $response->assertStatus(302);
        $this->assertEquals(session('success'), 'Document successfully created');
    });
});

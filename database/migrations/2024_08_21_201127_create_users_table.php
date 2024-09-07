<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('id', 8)->nullable(false)->primary();
            $table->string('password')->nullable(false);
            $table->string('first_name', 50)->nullable(false);
            $table->string('last_name', 50)->nullable();
            $table->string('department_id', 5)->nullable();
            $table->string('position_id', 5)->nullable();
            $table->string('work_center_id', 8)->nullable();
            $table->string('phone_number', 15)->nullable()->unique();
            $table->timestamp('last_activity')->nullable();
            $table->string('email', 50)->nullable()->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('department_id')->references('id')->on('departments')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('position_id')->references('id')->on('positions')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('work_center_id')->references('id')->on('work_centers')->cascadeOnUpdate()->nullOnDelete();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};

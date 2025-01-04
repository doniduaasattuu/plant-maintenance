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
        Schema::create('ac_checks', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_operational')->nullable();
            $table->decimal('blowing_temperature', 4, 2)->nullable();
            $table->decimal('ambient_temperature', 4, 2)->nullable();
            $table->boolean('is_filter_clean')->nullable();
            $table->boolean('is_evaporator_clean')->nullable();
            $table->boolean('is_condensor_clean')->nullable();
            $table->boolean('is_drain_leakage')->nullable();
            $table->boolean('cleaning_filter')->nullable();
            $table->boolean('cleaning_evaporator')->nullable();
            $table->boolean('cleaning_condensor')->nullable();
            $table->decimal('load', 5, 2)->nullable();
            $table->string('checked_by', 8)->nullable();
            $table->timestamps();

            $table->foreign('checked_by')->references('id')->on('users')->cascadeOnUpdate()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ac_checks');
    }
};

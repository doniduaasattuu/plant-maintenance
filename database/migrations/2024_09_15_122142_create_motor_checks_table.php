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
        Schema::create('motor_checks', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_operational')->nullable();
            $table->boolean('is_clean')->nullable();
            $table->integer('number_of_greasing')->nullable();
            $table->decimal('temperature_de', 5, 2)->nullable();
            $table->decimal('temperature_body', 5, 2)->nullable();
            $table->decimal('temperature_nde', 5, 2)->nullable();
            $table->decimal('vibration_dev', 4, 2)->nullable();
            $table->decimal('vibration_deh', 4, 2)->nullable();
            $table->decimal('vibration_dea', 4, 2)->nullable();
            $table->decimal('vibration_def', 4, 2)->nullable();
            $table->boolean('is_noisy_de')->nullable();
            $table->decimal('vibration_ndev', 4, 2)->nullable();
            $table->decimal('vibration_ndeh', 4, 2)->nullable();
            $table->decimal('vibration_ndef', 4, 2)->nullable();
            $table->boolean('is_noisy_nde')->nullable();
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
        Schema::dropIfExists('motor_checks');
    }
};

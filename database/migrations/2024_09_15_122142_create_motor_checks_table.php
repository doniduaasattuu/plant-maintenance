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
            $table->foreignId('operational_status_id')->nullable(false)->constrained('operational_statuses')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('cleanliness_id')->nullable(false)->constrained('cleanliness')->cascadeOnUpdate()->cascadeOnDelete();
            $table->integer('number_of_greasing')->nullable();
            $table->decimal('temperature_de', 5, 2)->nullable();
            $table->decimal('temperature_body', 5, 2)->nullable();
            $table->decimal('temperature_nde', 5, 2)->nullable();
            $table->decimal('vibration_dev', 4, 2)->nullable();
            $table->decimal('vibration_deh', 4, 2)->nullable();
            $table->decimal('vibration_dea', 4, 2)->nullable();
            $table->decimal('vibration_def', 4, 2)->nullable();
            $table->foreignId('noise_de')->nullable(false)->constrained('normality')->cascadeOnUpdate()->cascadeOnDelete();
            $table->decimal('vibration_ndev', 4, 2)->nullable();
            $table->decimal('vibration_ndeh', 4, 2)->nullable();
            $table->decimal('vibration_ndef', 4, 2)->nullable();
            $table->foreignId('noise_nde')->nullable(false)->constrained('normality')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('checked_by', 8)->nullable(true);
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

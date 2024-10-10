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
        Schema::create('equipment_movements', function (Blueprint $table) {
            $table->id();
            $table->string('functional_location_id', 50)->nullable(false);
            $table->string('functional_location_description', 100)->nullable(true);
            $table->string('equipment_id', 9)->nullable(false);
            $table->string('equipment_sort_field', 50)->nullable(true);
            $table->foreignId('movement_status_id')->constrained('movement_status')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('replaced_by', 8)->nullable(true);
            $table->timestamps();

            $table->foreign('functional_location_id')->references('id')->on('functional_locations')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('equipment_id')->references('id')->on('equipments')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('replaced_by')->references('id')->on('users')->cascadeOnUpdate()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment_movements');
    }
};

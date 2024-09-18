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
        Schema::create('material_equipment', function (Blueprint $table) {
            $table->foreignId('material_id')->constrained('materials')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('equipment_id', 9)->nullable(false);
            $table->integer('quantity')->default(1);
            $table->timestamps();

            $table->foreign('equipment_id')->references('id')->on('equipments')->cascadeOnUpdate()->cascadeOnDelete();
            $table->unique(['material_id', 'equipment_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('material_equipment');
    }
};

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
        Schema::create('document_equipment', function (Blueprint $table) {
            $table->foreignId('document_id')->constrained('documents')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('equipment_id', 9)->nullable(false);

            $table->foreign('equipment_id')->references('id')->on('equipments')->cascadeOnUpdate()->cascadeOnDelete();
            $table->unique(['document_id', 'equipment_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_equipment');
    }
};

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
        Schema::create('equipments', function (Blueprint $table) {
            $table->string('id', 9)->nullable(false)->primary(true);
            $table->foreignId('classification_id')->nullable(false)->constrained('classifications')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('functional_location_id')->nullable(true)->constrained('functional_locations')->cascadeOnUpdate()->nullOnDelete();
            $table->string('sort_field', 50)->nullable(true);
            $table->string('description', 100)->nullable(true);
            $table->foreignId('equipment_status_id')->nullable(false)->constrained('equipment_status')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('updated_by')->nullable(true)->constrained('users')->cascadeOnUpdate()->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipments');
    }
};

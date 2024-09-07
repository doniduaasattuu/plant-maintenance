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
            $table->string('classification_id')->nullable(false);
            $table->string('functional_location_id', 25)->nullable(true);
            $table->string('sort_field', 50)->nullable(true);
            $table->string('description', 100)->nullable(true);
            $table->foreignId('equipment_status_id')->nullable(false)->constrained('equipment_status')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('updated_by', 8)->nullable(true);
            $table->timestamps();

            $table->foreign('classification_id')->references('id')->on('classifications')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('functional_location_id')->references('id')->on('functional_locations')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('updated_by')->references('id')->on('users')->cascadeOnUpdate()->nullOnDelete();
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

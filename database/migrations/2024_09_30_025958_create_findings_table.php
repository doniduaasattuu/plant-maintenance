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
        Schema::create('findings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('finding_status_id')->constrained('finding_statuses')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('equipment_id', 9)->nullable();
            $table->string('functional_location_id', 25)->nullable();
            $table->text('description')->nullable(false);
            $table->string('notification', 8)->nullable();
            $table->string('attachment_before')->nullable();
            $table->string('attachment_after')->nullable();
            $table->string('reported_by', 8)->nullable();
            $table->string('closed_by', 8)->nullable();
            $table->timestamps();

            $table->foreign('equipment_id')->references('id')->on('equipments')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('functional_location_id')->references('id')->on('functional_locations')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('reported_by')->references('id')->on('users')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('closed_by')->references('id')->on('users')->cascadeOnUpdate()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('findings');
    }
};

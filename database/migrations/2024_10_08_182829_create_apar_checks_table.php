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
        Schema::create('apar_checks', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_seal_ok')->nullable();
            $table->boolean('is_weight_ok')->nullable();
            $table->boolean('is_pressure_ok')->nullable();
            $table->boolean('is_body_ok')->nullable();
            $table->string('remark')->nullable();
            $table->string('checked_by', 8)->nullable();
            $table->timestamps();

            $table->foreign('checked_by')->on('users')->references('id')->cascadeOnUpdate()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apar_checks');
    }
};

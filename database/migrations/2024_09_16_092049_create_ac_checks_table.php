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
            $table->foreignId('operational_status_id')->nullable(false)->constrained('operational_statuses')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('leakage')->nullable(false)->constrained('confirmations')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('evaporator')->nullable(false)->constrained('cleanliness')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('condensor')->nullable(false)->constrained('cleanliness')->cascadeOnUpdate()->cascadeOnDelete();
            $table->decimal('current_before_cleaning', 5, 2)->nullable();
            $table->decimal('current_after_cleaning', 5, 2)->nullable();
            $table->decimal('temperature', 4, 2)->nullable();
            $table->foreignId('remote')->nullable(false)->constrained('goodness')->cascadeOnUpdate()->cascadeOnDelete();
            $table->integer('compressor_pressure')->nullable();
            $table->foreignId('cleaning_filter_indoor')->nullable(false)->constrained('confirmations')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('cleaning_indoor')->nullable(false)->constrained('confirmations')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('cleaning_outdoor')->nullable(false)->constrained('confirmations')->cascadeOnUpdate()->cascadeOnDelete();
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

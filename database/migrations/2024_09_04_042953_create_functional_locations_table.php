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
        Schema::create('functional_locations', function (Blueprint $table) {
            $table->string('id', 25)->nullable(false)->primary();
            $table->string('description', 25)->nullable(false);
            $table->foreignId('updated_by')->nullable(true)->constrained('users')->cascadeOnUpdate()->nullOnDelete();
            $table->timestamps();

            // $table->foreign('updated_by')->references('id')->on('users')->onUpdate('cascade')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('functional_locations');
    }
};

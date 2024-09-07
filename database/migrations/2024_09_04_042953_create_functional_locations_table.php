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
            $table->string('description', 100)->nullable(false);
            $table->string('updated_by', 8)->nullable();
            $table->timestamps();

            $table->foreign('updated_by')->references('id')->on('users')->cascadeOnUpdate()->nullOnDelete();
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

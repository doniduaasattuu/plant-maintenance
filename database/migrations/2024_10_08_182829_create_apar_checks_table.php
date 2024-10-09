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
            $table->foreignId('seal')->constrained('goodness')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('weight')->constrained('goodness')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('pressure')->constrained('goodness')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('body')->constrained('rustiness')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('remark')->nullable(true);
            $table->string('checked_by', 8)->nullable(true);
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

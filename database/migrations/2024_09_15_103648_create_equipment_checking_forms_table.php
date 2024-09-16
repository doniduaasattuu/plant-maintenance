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
        Schema::create('equipment_checking_forms', function (Blueprint $table) {
            $table->id();
            $table->string('equipment_id', 9)->nullable(false);
            $table->unsignedBigInteger('formable_id'); // Polymorphic relation
            $table->string('formable_type');           // Polymorphic relation
            $table->timestamps();

            $table->foreign('equipment_id')->references('id')->on('equipments')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment_checking_forms');
    }
};

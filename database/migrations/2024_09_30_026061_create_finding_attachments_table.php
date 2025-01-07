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
        Schema::create('finding_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('finding_id')->nullable(false)->constrained('findings')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('type', 15)->nullable(false);
            $table->string('file_path')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('finding_attachments');
    }
};

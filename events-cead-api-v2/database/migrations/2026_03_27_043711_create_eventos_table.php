<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('eventos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('tipo'); // oficina, palestra, reuniao, minicurso
            $table->foreignId('sala_id')->constrained('salas')->onDelete('cascade');
            $table->integer('num_participantes');
            $table->dateTime('data_inicio');
            $table->dateTime('data_fim');
            $table->text('descricao')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('eventos');
    }
};
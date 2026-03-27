<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\PessoaController;
use App\Http\Controllers\SalaController;

// Rotas públicas
Route::get('/salas', [SalaController::class, 'index']);
Route::get('/salas/{sala}', [SalaController::class, 'show']);

Route::get('/pessoas', [PessoaController::class, 'index']);
Route::post('/pessoas', [PessoaController::class, 'store']);
Route::get('/pessoas/{pessoa}', [PessoaController::class, 'show']);

Route::get('/eventos', [EventoController::class, 'index']);
Route::get('/eventos/{evento}', [EventoController::class, 'show']);
Route::delete('/eventos/{evento}', [EventoController::class, 'destroy']);

// Rota de cadastro de eventos com middleware de horário comercial
Route::post('/eventos', [EventoController::class, 'store'])
    ->middleware('horario.comercial');
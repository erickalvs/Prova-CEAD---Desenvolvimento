<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use App\Http\Requests\StoreEventoRequest;
use Illuminate\Http\JsonResponse;

class EventoController extends Controller
{
    public function index(): JsonResponse
    {
        $eventos = Evento::with(['sala', 'pessoas'])->orderBy('data_inicio')->get();
        return response()->json($eventos);
    }

    public function store(StoreEventoRequest $request): JsonResponse
    {
        $evento = Evento::create($request->validated() + [
            'titulo'            => $request->titulo,
            'tipo'              => $request->tipo,
            'sala_id'           => $request->sala_id,
            'num_participantes' => $request->num_participantes,
            'data_inicio'       => $request->data_inicio,
            'data_fim'          => $request->data_fim,
            'descricao'         => $request->descricao,
        ]);

        // Anexar organizadores
        foreach ($request->organizadores as $pessoaId) {
            $evento->pessoas()->attach($pessoaId, ['papel' => 'organizador']);
        }

        // Anexar palestrante se houver
        if ($request->palestrante) {
            $evento->pessoas()->attach($request->palestrante, ['papel' => 'palestrante']);
        }

        return response()->json([
            'message' => 'Evento cadastrado com sucesso!',
            'evento'  => $evento->load(['sala', 'pessoas']),
        ], 201);
    }

    public function show(Evento $evento): JsonResponse
    {
        return response()->json($evento->load(['sala', 'pessoas']));
    }

    public function destroy(Evento $evento): JsonResponse
    {
        $evento->delete();
        return response()->json(['message' => 'Evento removido com sucesso!']);
    }
}
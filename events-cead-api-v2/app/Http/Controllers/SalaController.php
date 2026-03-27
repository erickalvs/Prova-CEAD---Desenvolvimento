<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use Illuminate\Http\JsonResponse;

class SalaController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Sala::orderBy('andar')->orderBy('nome')->get());
    }

    public function show(Sala $sala): JsonResponse
    {
        return response()->json($sala);
    }
}
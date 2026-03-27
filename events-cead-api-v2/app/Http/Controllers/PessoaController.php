<?php

namespace App\Http\Controllers;

use App\Models\Pessoa;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PessoaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Pessoa::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('nome', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('cpf', 'like', "%{$search}%");
        }

        return response()->json($query->orderBy('nome')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nome'    => 'required|string|max:255',
            'email'   => 'required|email|unique:pessoas,email',
            'celular' => 'required|string|max:20',
            'cpf'     => 'required|string|size:11|unique:pessoas,cpf',
        ]);

        $pessoa = Pessoa::create($validated);

        return response()->json([
            'message' => 'Pessoa cadastrada com sucesso!',
            'pessoa'  => $pessoa,
        ], 201);
    }

    public function show(Pessoa $pessoa): JsonResponse
    {
        return response()->json($pessoa);
    }
}
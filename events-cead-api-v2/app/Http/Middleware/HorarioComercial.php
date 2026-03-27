<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HorarioComercial
{
    public function handle(Request $request, Closure $next): Response
    {
        // Permite o cadastro em qualquer horário se estiver em ambiente local
        if (app()->environment('local')) {
            return $next($request);
        }

        $hora = now()->hour;

        // Bloqueia fora do horário comercial: antes das 08h ou a partir das 18h
        if ($hora < 8 || $hora >= 18) {
            return response()->json([
                'message' => 'Cadastro de eventos permitido apenas em horário comercial (08h às 18h).',
            ], 403);
        }

        return $next($request);
    }
}
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreEventoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'titulo'           => 'required|string|max:255',
            'tipo'             => 'required|in:oficina,palestra,reuniao,minicurso',
            'sala_id'          => 'required|exists:salas,id',
            'num_participantes'=> 'required|integer|min:1',
            'data_inicio'      => 'required|date',
            'data_fim'         => 'required|date|after:data_inicio',
            'descricao'        => 'nullable|string',
            'organizadores'    => 'required|array',
            'organizadores.*'  => 'exists:pessoas,id',
            'palestrante'      => 'nullable|exists:pessoas,id',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $tipo   = $this->input('tipo');
            $salaId = $this->input('sala_id');
            $numPart= $this->input('num_participantes');

            if (!$salaId) return;

            $sala = \App\Models\Sala::find($salaId);
            if (!$sala) return;

            // Regra geral: participantes não podem ultrapassar capacidade da sala
            if ($numPart > $sala->capacidade) {
                $validator->errors()->add('num_participantes',
                    "O número de participantes ({$numPart}) ultrapassa a capacidade da sala ({$sala->capacidade}).");
            }

            // Regras por tipo de evento
            $tiposPermitidos = [
                'oficina'   => ['laboratorio', 'aula'],
                'palestra'  => ['auditorio'],
                'reuniao'   => ['reuniao', 'videoconferencia'],
                'minicurso' => ['aula', 'laboratorio'],
            ];

            if ($tipo && isset($tiposPermitidos[$tipo])) {
                if (!in_array($sala->tipo, $tiposPermitidos[$tipo])) {
                    $validator->errors()->add('sala_id',
                        "Evento do tipo '{$tipo}' não pode ser realizado na sala '{$sala->nome}'.");
                }
            }

            // Oficinas e Palestras exigem mínimo 2 organizadores
            if (in_array($tipo, ['oficina', 'palestra'])) {
                $organizadores = $this->input('organizadores', []);
                if (count($organizadores) < 2) {
                    $validator->errors()->add('organizadores',
                        "Eventos do tipo '{$tipo}' exigem no mínimo 2 organizadores.");
                }
            }

            // Palestra exige palestrante
            if ($tipo === 'palestra' && !$this->input('palestrante')) {
                $validator->errors()->add('palestrante',
                    'Palestras exigem um palestrante cadastrado.');
            }
        });
    }

    public function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Erro de validação.',
            'errors'  => $validator->errors(),
        ], 422));
    }
}
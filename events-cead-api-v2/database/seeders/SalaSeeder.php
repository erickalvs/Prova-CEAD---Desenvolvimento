<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sala;

class SalaSeeder extends Seeder
{
    public function run(): void
    {
        $salas = [
            // 1º Andar
            [
                'nome' => 'Sala de Reuniões',
                'tipo' => 'reuniao',
                'capacidade' => 12,
                'andar' => '1',
                'descricao' => 'Mesa redonda, televisores',
            ],
            [
                'nome' => 'Sala de Videoconferência',
                'tipo' => 'videoconferencia',
                'capacidade' => 15,
                'andar' => '1',
                'descricao' => 'Sistemas de câmera e áudio',
            ],
            [
                'nome' => 'Laboratório Computacional',
                'tipo' => 'laboratorio',
                'capacidade' => 25,
                'andar' => '1',
                'descricao' => 'Equipado com computadores',
            ],
            // 2º Andar
            [
                'nome' => 'Sala da Diretoria / Monitoramento',
                'tipo' => 'diretoria',
                'capacidade' => 5,
                'andar' => '2',
                'descricao' => 'Uso restrito',
            ],
            [
                'nome' => 'Sala de Aula 1',
                'tipo' => 'aula',
                'capacidade' => 30,
                'andar' => '2',
                'descricao' => 'Projetor e quadro branco',
            ],
            [
                'nome' => 'Sala de Aula 2',
                'tipo' => 'aula',
                'capacidade' => 30,
                'andar' => '2',
                'descricao' => 'Projetor e quadro branco',
            ],
            [
                'nome' => 'Auditório',
                'tipo' => 'auditorio',
                'capacidade' => 120,
                'andar' => '2',
                'descricao' => 'Palco, som e projeção',
            ],
        ];

        foreach ($salas as $sala) {
            Sala::create($sala);
        }
    }
}
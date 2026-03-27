<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'tipo',
        'capacidade',
        'andar',
        'descricao',
    ];

    public function eventos()
    {
        return $this->hasMany(Evento::class);
    }
}

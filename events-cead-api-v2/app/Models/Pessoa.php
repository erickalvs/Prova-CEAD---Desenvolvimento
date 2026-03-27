<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pessoa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'email',
        'celular',
        'cpf',
    ];

    public function eventos()
    {
        return $this->belongsToMany(Evento::class, 'evento_pessoa')
            ->withPivot('papel')
            ->withTimestamps();
    }
}


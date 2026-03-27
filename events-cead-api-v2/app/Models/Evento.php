<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'tipo',
        'sala_id',
        'num_participantes',
        'data_inicio',
        'data_fim',
        'descricao',
    ];

    public function sala()
    {
        return $this->belongsTo(Sala::class);
    }

    public function pessoas()
    {
        return $this->belongsToMany(Pessoa::class, 'evento_pessoa')
                    ->withPivot('papel')
                    ->withTimestamps();
    }

    public function organizadores()
    {
        return $this->pessoas()->wherePivot('papel', 'organizador');
    }

    public function palestrantes()
    {
        return $this->pessoas()->wherePivot('papel', 'palestrante');
    }
}
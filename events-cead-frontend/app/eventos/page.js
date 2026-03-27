'use client';
import { useEffect, useState } from 'react';
import { getEventos, deleteEvento } from '../lib/api';
import Link from 'next/link';

export default function EventosPage() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventos().then(data => {
      setEventos(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Deseja remover este evento?')) return;
    await deleteEvento(id);
    setEventos(eventos.filter(e => e.id !== id));
  };

  const tipoLabel = {
    oficina: '🔧 Oficina',
    palestra: '🎤 Palestra',
    reuniao: '🤝 Reunião',
    minicurso: '📚 Minicurso',
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">📅 Eventos</h1>
          <div className="flex gap-3">
            <Link href="/" className="text-gray-500 hover:underline text-sm">← Início</Link>
            <Link href="/eventos/novo" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
              + Novo Evento
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Carregando...</p>
        ) : eventos.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
            Nenhum evento cadastrado ainda.
          </div>
        ) : (
          <div className="grid gap-4">
            {eventos.map(evento => (
              <div key={evento.id} className="bg-white rounded-xl shadow p-6 flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{evento.titulo}</h2>
                  <p className="text-sm text-gray-500">{tipoLabel[evento.tipo] || evento.tipo}</p>
                  <p className="text-sm text-gray-500">📍 {evento.sala?.nome}</p>
                  <p className="text-sm text-gray-500">👥 {evento.num_participantes} participantes</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(evento.data_inicio).toLocaleString('pt-BR')} → {new Date(evento.data_fim).toLocaleString('pt-BR')}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(evento.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  🗑 Remover
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
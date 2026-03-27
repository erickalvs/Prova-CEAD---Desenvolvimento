"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">CEAD Eventos</h1>
        <p className="text-gray-500 mb-8">
          Sistema de Agendamento de Eventos Institucionais
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/eventos"
            className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            📅 Ver Eventos
          </Link>
          <Link
            href="/eventos/novo"
            className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            ➕ Cadastrar Evento
          </Link>
          <Link
            href="/pessoas"
            className="bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
          >
            👥 Gerenciar Pessoas
          </Link>
        </div>
      </div>
    </main>
  );
}

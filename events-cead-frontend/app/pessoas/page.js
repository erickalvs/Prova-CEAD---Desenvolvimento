"use client";
import { useEffect, useState } from "react";
import { getPessoas, createPessoa } from "../lib/api";
import Link from "next/link";

export default function PessoasPage() {
  const [pessoas, setPessoas] = useState([]);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    celular: "",
    cpf: "",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      getPessoas(search).then(setPessoas);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");
    const res = await createPessoa(form);
    if (res.errors) {
      setErrors(res.errors);
      return;
    }
    if (res.pessoa) {
      setSuccessMsg("✅ Pessoa cadastrada com sucesso!");
      setForm({ nome: "", email: "", celular: "", cpf: "" });
      getPessoas(search).then(setPessoas);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-700">👥 Pessoas</h1>
          <Link href="/" className="text-gray-500 hover:underline text-sm">
            ← Início
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Cadastrar Pessoa
            </h2>
            {successMsg && (
              <div className="bg-green-100 text-green-700 rounded p-2 mb-3 text-sm">
                {successMsg}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {["nome", "email", "celular", "cpf"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={field === "cpf" ? "Apenas números" : ""}
                    className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field][0]}
                    </p>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition mt-2"
              >
                Cadastrar
              </button>
            </form>
          </div>

          {/* Lista */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Pessoas Cadastradas
            </h2>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, e-mail ou CPF..."
              className="w-full border rounded-lg px-3 py-2 text-sm mb-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
              {pessoas.map((p) => (
                <div key={p.id} className="border rounded-lg p-3">
                  <p className="font-medium text-gray-800 text-sm">{p.nome}</p>
                  <p className="text-xs text-gray-500">{p.email}</p>
                  <p className="text-xs text-gray-400">
                    CPF: {p.cpf} | {p.celular}
                  </p>
                </div>
              ))}
              {pessoas.length === 0 && (
                <p className="text-gray-400 text-sm">
                  Nenhuma pessoa encontrada.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

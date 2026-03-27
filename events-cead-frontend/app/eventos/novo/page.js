"use client";
import { useEffect, useState } from "react";
import { getSalas, getPessoas, createEvento } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function NovoEventoPage() {
  const router = useRouter();
  const [salas, setSalas] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState({
    titulo: "",
    tipo: "",
    sala_id: "",
    num_participantes: "",
    data_inicio: "",
    data_fim: "",
    descricao: "",
    organizadores: [],
    palestrante: "",
  });

  useEffect(() => {
    getSalas().then(setSalas);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getPessoas(search).then(setPessoas);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleOrganizador = (id) => {
    const idStr = String(id);
    setForm((prev) => ({
      ...prev,
      organizadores: prev.organizadores.includes(idStr)
        ? prev.organizadores.filter((o) => o !== idStr)
        : [...prev.organizadores, idStr],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");

    const payload = {
      ...form,
      sala_id: Number(form.sala_id),
      num_participantes: Number(form.num_participantes),
      organizadores: form.organizadores.map(Number),
      palestrante: form.palestrante ? Number(form.palestrante) : null,
    };

    const res = await createEvento(payload);

    if (res.errors) {
      setErrors(res.errors);
      return;
    }
    if (res.message === "Evento cadastrado com sucesso!") {
      setSuccessMsg("✅ Evento cadastrado com sucesso!");
      setTimeout(() => router.push("/eventos"), 1500);
    } else {
      setErrors({ geral: res.message || "Erro ao cadastrar evento." });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-700">➕ Novo Evento</h1>
          <a href="/eventos" className="text-gray-500 hover:underline text-sm">
            ← Voltar
          </a>
        </div>

        {successMsg && (
          <div className="bg-green-100 text-green-700 rounded-lg p-3 mb-4">
            {successMsg}
          </div>
        )}
        {errors.geral && (
          <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-4">
            {errors.geral}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-8 flex flex-col gap-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.titulo && (
              <p className="text-red-500 text-xs mt-1">{errors.titulo[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Evento
            </label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Selecione...</option>
              <option value="oficina">Oficina</option>
              <option value="palestra">Palestra</option>
              <option value="reuniao">Reunião</option>
              <option value="minicurso">Minicurso</option>
            </select>
            {errors.tipo && (
              <p className="text-red-500 text-xs mt-1">{errors.tipo[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sala
            </label>
            <select
              name="sala_id"
              value={form.sala_id}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Selecione...</option>
              {salas.map((sala) => (
                <option key={sala.id} value={sala.id}>
                  {sala.nome} — Cap. {sala.capacidade} ({sala.andar}º andar)
                </option>
              ))}
            </select>
            {errors.sala_id && (
              <p className="text-red-500 text-xs mt-1">{errors.sala_id[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nº de Participantes
            </label>
            <input
              type="number"
              name="num_participantes"
              value={form.num_participantes}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.num_participantes && (
              <p className="text-red-500 text-xs mt-1">
                {errors.num_participantes[0]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Início
              </label>
              <input
                type="datetime-local"
                name="data_inicio"
                value={form.data_inicio}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.data_inicio && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.data_inicio[0]}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Fim
              </label>
              <input
                type="datetime-local"
                name="data_fim"
                value={form.data_fim}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.data_fim && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.data_fim[0]}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar Pessoas
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nome, e-mail ou CPF..."
              className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            />

            <p className="text-xs text-gray-500 mb-2">
              Selecione os <strong>Organizadores</strong>:
            </p>
            <div className="border rounded-lg max-h-40 overflow-y-auto p-2 flex flex-col gap-1">
              {pessoas.map((p) => (
                <label
                  key={p.id}
                  className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={form.organizadores.includes(String(p.id))}
                    onChange={() => toggleOrganizador(p.id)}
                  />
                  {p.nome} — {p.email}
                </label>
              ))}
              {pessoas.length === 0 && (
                <p className="text-gray-400 text-xs p-2">
                  Nenhuma pessoa encontrada.
                </p>
              )}
            </div>
            {errors.organizadores && (
              <p className="text-red-500 text-xs mt-1">
                {errors.organizadores[0]}
              </p>
            )}

            {form.tipo === "palestra" && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">
                  Selecione o <strong>Palestrante</strong>:
                </p>
                <select
                  name="palestrante"
                  value={form.palestrante}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Selecione...</option>
                  {pessoas.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} — {p.email}
                    </option>
                  ))}
                </select>
                {errors.palestrante && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.palestrante[0]}
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Cadastrar Evento
          </button>
        </form>
      </div>
    </main>
  );
}

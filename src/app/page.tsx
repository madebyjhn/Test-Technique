"use client";
import { useEffect, useState } from "react";
import { getFontaine, getEspacesVerts, getEquipements, Lieu } from "../lib/api";
import { Table } from "../components/Table";
import SelectInput from "../components/SelectInput";

export default function HomePage() {
  const [lieux, setLieux] = useState<Lieu[]>([]);
  const [limit, setLimit] = useState<number>(20);
  const [arrondissement, setArrondissement] = useState<string>();
  const [filtered, setFiltered] = useState<string>("");
  const [lastColumnName, setLastColumnName] = useState<string>("");

  const filterOptions = [
    { value: "", label: "Tout" },
    { value: "fontaines", label: "Fontaines" },
    { value: "espaces", label: "Espaces Verts" },
    { value: "equipements", label: "Equipements" },
  ];

  const arrondissementOptions = [
    { value: "", label: "Selectionnez votre arrondissement" },
    { value: "75001", label: "1er Arrondissement" },
    { value: "75002", label: "2eme Arrondissement" },
    { value: "75003", label: "3eme Arrondissement" },
    { value: "75004", label: "4eme Arrondissement" },
    { value: "75005", label: "5eme Arrondissement" },
    { value: "75006", label: "6eme Arrondissement" },
    { value: "75007", label: "7eme Arrondissement" },
    { value: "75008", label: "8eme Arrondissement" },
    { value: "75009", label: "9eme Arrondissement" },
    { value: "75010", label: "10eme Arrondissement" },
    { value: "75011", label: "11eme Arrondissement" },
    { value: "75012", label: "12eme Arrondissement" },
    { value: "75013", label: "13eme Arrondissement" },
    { value: "75014", label: "14eme Arrondissement" },
    { value: "75015", label: "15eme Arrondissement" },
    { value: "75016", label: "16eme Arrondissement" },
    { value: "75017", label: "17eme Arrondissement" },
    { value: "75018", label: "18eme Arrondissement" },
    { value: "75019", label: "19eme Arrondissement" },
    { value: "75020", label: "20eme Arrondissement" },
  ];

  useEffect(() => {
    async function fetchData() {
      const fontaines = await getFontaine(limit, arrondissement);
      const espacesVerts = await getEspacesVerts(limit, arrondissement);
      const equipements = await getEquipements(limit, arrondissement);
      const combined = [...fontaines, ...espacesVerts, ...equipements];
      if (!filtered) {
        setLieux(combined);
      } else if (filtered === "fontaines") {
        setLieux([...fontaines]);
      } else if (filtered === "equipements") {
        setLieux([...equipements]);
      } else if (filtered === "espaces") {
        setLieux([...espacesVerts]);
      }
    }
    fetchData();
  }, [limit, arrondissement, filtered]);

  useEffect(() => {
    if (filtered === "fontaines") setLastColumnName("Disponible");
    else if (filtered === "espaces") setLastColumnName("Gratuit");
    else if (filtered === "equipements") setLastColumnName("Horaires");
    else setLastColumnName("");
  }, [filtered]);

  return (
    <main className="max-w-5xl mx-auto p-8 flex flex-col items-center rounded-lg shadow-lg space-y-6">
      <h1 className="text-4xl font-extrabold mb-8 text-purple-950">
        🌿 Ilots de fraîcheur à Paris
      </h1>

      <div className="flex gap-4 w-full max-w-md">
        <SelectInput
          value={filtered}
          onChange={(value) => setFiltered(value)}
          options={filterOptions}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <SelectInput
          value={arrondissement || ""}
          onChange={(value) => setArrondissement(value)}
          options={arrondissementOptions}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <Table
        locations={lieux}
        lastColumnName={lastColumnName}
        showLastColumn={filtered}
      />

      <button
        className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        onClick={() => setLimit(limit + 10)}
      >
        Voir plus
      </button>
    </main>
  );
}

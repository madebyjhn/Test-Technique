export function Table({
  locations,
  lastColumnName,
  showLastColumn,
}: {
  locations: Lieu[];
  lastColumnLabel: string;
  showLastColumn: boolean;
}) {
  return (
    <table className="w-full border-collapse shadow-md rounded-md overflow-hidden">
      <thead className="bg-purple-200">
        <tr>
          <th className="py-3 px-6 text-left text-purple-900 font-semibold">
            Type
          </th>
          <th className="py-3 px-6 text-left text-purple-900 font-semibold">
            Nom
          </th>
          <th className="py-3 px-6 text-left text-purple-900 font-semibold">
            Adresse
          </th>
          {showLastColumn && (
            <th className="py-3 px-6 text-left text-purple-900 font-semibold">
              {lastColumnName}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {locations.map((lieu, index) => (
          <tr
            key={index}
            className="even:bg-white odd:bg-purple-50 hover:bg-purple-200 transition-colors duration-200"
          >
            <td className="py-2 px-6 border-t border-purple-300 text-purple-900">
              {lieu.type}
            </td>
            <td className="py-2 px-6 border-t border-purple-300 text-purple-900">
              {lieu.nom}
            </td>
            <td className="py-2 px-6 border-t border-purple-300 text-purple-900">
              {lieu.adresse
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
            </td>
            {showLastColumn && (
              <td className="py-2 px-6 border-t border-purple-300 text-purple-900">
                {lieu.dispo}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

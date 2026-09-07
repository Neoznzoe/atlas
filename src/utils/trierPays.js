export function trierPays(pays, tri, ordre) {
  const paysTries = [...pays].sort((a, b) => {
    if (tri === "population") return a.population - b.population;
    if (tri === "superficie") return (a.superficie ?? 0) - (b.superficie ?? 0);
    return a.name.localeCompare(b.name);
  });
  return ordre === "croissant" ? paysTries : paysTries.reverse();
}

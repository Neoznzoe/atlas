import { useRef } from "react";
import countries from "../data/countries.js";

function AllerAuPays() {
  const inputRef = useRef(null);

  function gererSoumission(e) {
    e.preventDefault();
    const terme = inputRef.current.value.trim().toLowerCase();
    const pays = countries.find((country) => country.name.toLowerCase() === terme);

    if (pays) {
      alert(`${pays.name} — capitale : ${pays.capital ?? "inconnue"}`);
    } else {
      alert(`Aucun pays ne correspond à « ${inputRef.current.value} ».`);
    }
  }

  return (
    <form onSubmit={gererSoumission} className="aller-au-pays">
      <label htmlFor="aller-au-pays-input">Aller directement à un pays</label>
      <input id="aller-au-pays-input" type="text" ref={inputRef} placeholder="Nom exact du pays" />
      <button type="submit">Aller</button>
    </form>
  );
}

export default AllerAuPays;

import { useRef } from "react";

function AllerAuPays({ pays }) {
  const inputRef = useRef(null);

  function gererSoumission(e) {
    e.preventDefault();
    const terme = inputRef.current.value.trim().toLowerCase();
    const paysTrouve = pays.find((country) => country.name.toLowerCase() === terme);

    if (paysTrouve) {
      alert(`${paysTrouve.name} — capitale : ${paysTrouve.capital ?? "inconnue"}`);
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

import Header from "./components/Header.jsx";
import CountryCard from "./components/CountryCard.jsx";

function App() {
  return (
    <>
      <Header />
      <CountryCard name="France" capital="Paris" population={67391582} region="Europe" />
      <CountryCard name="Japon" capital="Tokyo" population={125836021} region="Asie" />
      <CountryCard name="Brésil" capital="Brasilia" population={212559417} region="Amériques" />
    </>
  );
}

export default App;

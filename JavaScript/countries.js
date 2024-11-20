const form = document.getElementById("search-form");
const countryNameInput = document.getElementById("country-name-input");
const countryName = document.getElementById("country-name");
const countryFlag = document.getElementById("country-flag");
const countryCapital = document.getElementById("country-capital");
const countryRegion = document.getElementById("country-region");
const countryPopulation = document.getElementById("country-population");
const countryLanguages = document.getElementById("country-languages");
const errorMessage = document.getElementById("error-message");
const countryInfo = document.getElementById("country-info");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const countryQuery = countryNameInput.value.trim().toLowerCase();
  fetch(`https://restcountries.com/v3.1/name/${countryQuery}`)
    .then((response) => {
      if (!response.ok) throw new Error(`País "${countryQuery}" no encontrado.`);
      return response.json();
    })
    .then((countries) => {
      const country = countries[0]; // Tomamos el primer resultado
      displayCountryInfo(country);
      errorMessage.innerText = "";
    })
    .catch((error) => {
      clearResults();
      errorMessage.innerText = error.message;
      console.error(error);
    });
});

function displayCountryInfo(country) {
  countryInfo.style.display = "block";
  countryName.textContent = country.name.common;
  countryFlag.src = country.flags.svg;
  countryFlag.alt = `Bandera de ${country.name.common}`;
  countryCapital.textContent = country.capital ? country.capital[0] : "Desconocida";
  countryRegion.textContent = country.region;
  countryPopulation.textContent = country.population.toLocaleString();
  countryLanguages.textContent = country.languages
    ? Object.values(country.languages).join(", ")
    : "Desconocidos";
}

function clearResults() {
  countryInfo.style.display = "none";
  countryName.textContent = "";
  countryFlag.src = "";
  countryCapital.textContent = "";
  countryRegion.textContent = "";
  countryPopulation.textContent = "";
  countryLanguages.textContent = "";
}

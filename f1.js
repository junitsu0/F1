let form = document.getElementById("raceForm");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  let season = document.getElementById("inputSeason").value;
  let round = document.getElementById("inputRound").value;

  getRacingInfo(season, round);
  return false;
}

async function getRacingInfo(season, round) {
  try {
    let res = await fetch(
      `https://ergast.com/api/f1/${season}/${round}/results.json`
    );
    let data = await res.json();
    let drivers = data["MRData"]["RaceTable"]["Races"][0]["Results"];

    for (let i = 0; i < drivers.length; i++) {
      var table = document.getElementById("standingTable");

      var row = table.insertRow(1);

      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);

      cell1.innerHTML =
        drivers[i]["Driver"]["givenName"] +
        " " +
        drivers[i]["Driver"]["familyName"];
      cell2.innerHTML = drivers[i]["Driver"]["nationality"];
      cell3.innerHTML = drivers[i]["position"];
      cell4.innerHTML = drivers[i]["points"];
      cell5.innerHTML =
        drivers[i]["Constructor"]["name"] +
        " - " +
        drivers[i]["Constructor"]["nationality"];
    }
  } catch (err) {
    console.error(err);
  }
}

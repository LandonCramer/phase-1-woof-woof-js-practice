const dogBar = document.querySelector("#dog-bar");
const dogInfo = document.querySelector("#dog-info");
const goodDogFilter = document.querySelector("#good-dog-filter");

let clickedPup;

function doggo() {
  fetch("http://localhost:3000/pups")
    .then((res) => res.json())
    .then((pups) => pups.forEach((pup) => renderPup(pup)))
    .catch(console.error);
}

const renderPup = (pup) => {
  const span = document.createElement("span");
  span.textContent = pup.name;
  span.addEventListener("click", () => dogInfoDisplay(pup));
  dogBar.append(span);
};

const dogInfoDisplay = (pup) => {
 // clickedPup = pup.id;
  dogInfo.innerHTML = "";

  const img = document.createElement("img");
  img.src = pup.image;

  const h2 = document.createElement("h2");
  h2.textContent = pup.name;

  const button = document.createElement("button");
  button.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";
  button.addEventListener("click", () => {
    return goodBad(pup)
});
  dogInfo.append(img, h2, button)
};

const goodBad = (pup) => {
  pup.isGoodDog = !pup.isGoodDog;
  const button = document.querySelector("#dog-info button");
  button.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";
    
  fetch(`http://localhost:3000/pups/${pup.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type" : "application/json"
    },
    body:JSON.stringify({name: 'Bailey', isGoodDog: pup.isGoodDog})
  })
  .then(res => res.json())
  .then(data => console.log(data))
  
  
};

//start
doggo();

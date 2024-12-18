const state = {
  everyPuppy: [],
}

const puppyList = document.querySelector(`main`)

const getAllPuppies = async () => {
  const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2410-ftb-mt-web-pt/players');
  const puppyInfo = await response.json();
  const allPuppies = puppyInfo.data;
  state.everyPuppy = allPuppies.players;

  renderAllPuppies();
} 

const renderAllPuppies = () => {
  const puppyNames = state.everyPuppy.map ((singlePuppy) => {
    return `<li>${singlePuppy.name}</li>`;
  });

puppyList.innerHTML = `<ol>
  ${puppyNames.join(``)}
  </ol>`;

const ol = document.querySelector(`ol`);
ol.addEventListener(`click`, (event) => {
  if (event.target.tagName === `LI`) {
    renderSinglePuppy(event.target.innerText);
  }
});
};

const renderSinglePuppy = (clickPuppyName) => {
  const foundPuppy = state.everyPuppy.find ((singlePuppy) => {
    return singlePuppy.name === clickPuppyName;
  });

const puppyDetails = `
  <h2>${clickPuppyName}</h2>
  <p>${foundPuppy.name}</P>
  <p>${foundPuppy.breed}</P>
  <p>${foundPuppy.status}</P>
  <p><img src="${foundPuppy.imageUrl}" alt="${foundPuppy.name}"></p>
  <button>Back</button>
  `;
puppyList.innerHTML = puppyDetails;

const button = document.querySelector(`button`);
button.addEventListener(`click`, () => {
  renderAllPuppies();
});
};

getAllPuppies();
// images path
const male = "images/man.jpg";
const female = "images/women.jpg";

// selectors
let preloader = document.getElementById("preloader");
let con = document.getElementById("con");
let details = document.querySelector(".details");
let input = document.getElementById("search");

//array to store data from calling api
let data = [];

// function to edit entered text
const capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

function showDetails(para) {
  let element = data.filter((ele) => ele.id - 1 == para);
  console.log(element);
  details.style.display = "flex";
  details.innerHTML = "";

  element.map(
    (ele) =>
      (details.innerHTML += `<div>
  <img src=${
    ele.gender == "female" ? female : male
  } width="100%" height="100%" />
</div>
<div>
  <h3  onclick='closeFun()'>&#10006;</h3>
  <p>name : ${ele.name}</p>
  <p>gender: ${ele.gender}</p>
  <p>user name : ${ele.username}</p>
  <p>email: ${ele.email}</p>
  <p>phone: ${ele.phone}</p>
  <p>website: ${ele.website}</p>
  <p>company : ${ele.company.name}</p>
</div>`)
  );
}

function closeFun() {
  details.style.display = "none";
  details.innerHTML = "";
}
function initialGet() {
  fetch("https://mocki.io/v1/fa0793b8-9893-4be8-9f58-dc6fa2a2f844")
    .then((res) => res.json())
    .then((dataSended) => {
      data = [...dataSended];
      console.log(data);
      dataSended.map(
        (ele, index) =>
          (con.innerHTML += ` <div class="card m-2" style="width: 18rem">
    <img
      src=${ele.gender == "female" ? female : male}
      class="card-img-top"
      alt="..."
      height="266px"
    />
    <div class="card-body">
      <h5 class="card-title">${ele.name}</h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </p>
      <button class="btn btn-primary" onclick="showDetails('${index}')">Go somewhere</button>
    </div>
  </div>`)
      );

      return dataSended;
    })
    .catch((error) => (con.innerHTML = "<h2 > Error please try again </h2>"));
}
initialGet();

input.addEventListener("keyup", function getdata(e) {
  if (data.length == 0) {
    con.innerHTML = "<h2 >no data to show </h2>";
  }
  console.log(e.target.value);
  let filtered = data.filter((ele) =>
    ele.name.includes(capitalize(e.target.value))
  );
  con.innerHTML = "";
  filtered.map(
    (ele, index) =>
      (con.innerHTML += ` <div class="card m-2" style="width: 18rem">
    <img
      src=${ele.gender == "female" ? female : male}
      class="card-img-top"
      alt="..."
      height="266px"
    />
    <div class="card-body">
      <h5 class="card-title">${ele.name}</h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </p>
      <button  class="btn btn-primary" onclick="showDetails('${index}')" >Go somewhere</button>
    </div>
  </div>`)
  );
  if (filtered.length == 0) {
    con.innerHTML = "<h2 >Not found  </h2>";
  }
});

window.addEventListener("load", () => {
  preloader.style.display = "none";
  con.style.animation = " example 2s ease  forwards";
});

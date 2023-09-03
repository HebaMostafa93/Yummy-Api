// ----------------Loading---------------
$(document).ready(() => {
  // searchByName("").then(() => {
  $(".loading").fadeOut(1500)
  $("body").css("overflow", "auto")
  // })
})

// ---------------NavBar----------------------
function openSideBar() {

  $("#sideNavbar").animate({ left: 0 }, 500)
  $(".openNav").removeClass("fa-align-justify")
  $(".openNav").addClass("fa-x")
  for (let i = 0; i < 5; i++) {
    $("nav ul li").eq(i).animate({ top: 0 }, (i + 5) * 100)
  }
}

function closeSideBar() {

  $("#sideNavbar").animate({ left: "-260px" }, 500)
  $(".openNav").addClass("fa-align-justify");
  $(".openNav").removeClass("fa-x");
  $("nav ul li").animate({ top: 300 }, 500)
}

$("#sideNavbar .openNav").click(() => {
  if ($("#sideNavbar").css("left") == "0px") {
    closeSideBar()
  } else {
    openSideBar()
  }
})

$("nav ul li").click((e) => {
  closeSideBar()
  let link = e.target.getAttribute("type")
  $(`#${link}`).siblings().css("display", "none")
  $(`#${link}`).css("display", "block")
})

// -----------start Website-----------------------

async function getData() {
  let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
  let data = await req.json()
  let response = data.meals
  console.log(response);
  displayMeals(response.slice(0, 20))
}

getData()

function displayMeals(data) {
  let temp = ""
  data.forEach((el) => {
    temp += `
         <div class="col-md-3 overflow-hidden ">
           <div class="item rounded" id="${el.idMeal}">
             <img src="${el.strMealThumb}" class="w-100 rounded " alt="yummy food">
             <div class="itemLayer rounded d-flex align-items-center">
               <h3 class="text-black ps-3">${el.strMeal}</h3>
             </div>
           </div>
       </div>
         `
  })
  document.getElementById("rowData").innerHTML = temp
  document.getElementById("catRow").innerHTML = temp
  document.getElementById("areaRow").innerHTML = temp
  document.getElementById("ingRow").innerHTML = temp
  getId()
}

// to get id---------
function getId() {
  let itemList = document.querySelectorAll(".item")
  itemList.forEach((el) => {
    el.addEventListener("click", function () {
      let recipieId = this.getAttribute("id")
      getMealDetails(recipieId)
      console.log(recipieId);
    })
  })
}

// to get details of One item -----------
let dataRecipie = []
async function getMealDetails(id) {

  let req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  let data = await req.json()
  dataRecipie = data.meals
  displayMealDetails()
}

function sectionsDisplays() {
  $("#details").css("display", "block")
  $("#homeSection").css("display", "none")
  $("#ingredient").css("display", "none")
  $("#categories").css("display", "none")
  $("#area").css("display", "none")
  $(".closeIcon").click(() => {
    $("#details").css("display", "none")
    $("#homeSection").css("display", "block")
  })
}

function displayMealDetails() {
  sectionsDisplays()
  document.getElementById("mealImg").setAttribute("src", dataRecipie[0].strMealThumb)
  document.getElementById("mealTitle").innerHTML = dataRecipie[0].strMeal
  document.getElementById("strInstructions").innerHTML = dataRecipie[0].strInstructions
  document.getElementById("srcId").setAttribute("href", dataRecipie[0].strSource)
  document.getElementById("youTubeId").setAttribute("href", dataRecipie[0].strYoutube)
  document.getElementById("strArea").innerHTML = `<span class="fw-bolder">Area : </span>` + dataRecipie[0].strArea
  document.getElementById("strCategory").innerHTML = `<span class="fw-bolder">Category : </span>` + dataRecipie[0].strCategory

}

// let ingredients = ``
//   for (let i = 1; i <= 20; i++) {
//       if (`dataRecipie[0].strIngredient${i}`) {
//           ingredients += `<li class="alert alert-info m-2 p-1">${`dataRecipie[0].strMeasure${i}`} ${`dataRecipie[0].strIngredient${i}`}</li>`
//       }

//   }
//   document.getElementById("ingredients").innerHTML = ingredients



// categories --------------

async function getCategories() {
  $(".loading").fadeIn(300)
  let req = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let data = await req.json()
  let response = data.categories
  displayCategories(response)
  $(".loading").fadeOut(300)
}

$("#categoriesLink").click(function () {
  getCategories()
})



function displayCategories(data) {
  let temp = ""
  data.forEach((el) => {
    temp += `
  <div class="col-md-3 overflow-hidden ">
  <div dataCat = ${el.strCategory} class="item catItem rounded ">
    <img src="${el.strCategoryThumb}" class="w-100 rounded " alt="yummy food">
    <div class="itemLayer rounded text-center d-flex align-items-center justify-content-center ">
      <div>
        <h3 class="text-black ps-3">${el.strCategory}</h3>
        <p class="text-black">${el.strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
      </div>
    </div>
  </div>
</div>
  `
  })
  document.getElementById("catRow").innerHTML = temp
  getCat()
}

function getCat() {
  let itemList = document.querySelectorAll(".catItem")
  itemList.forEach((el) => {
    el.addEventListener("click", function () {
      let dataCat = this.getAttribute("dataCat")
      console.log(dataCat);
      getCategoryMeals(dataCat)
    })
  })
}

async function getCategoryMeals(category) {

  let myreq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  let mydata = await myreq.json()
  let myresponse = mydata.meals
  displayMeals(myresponse.slice(0, 20))
}

// Area----------------
async function getArea() {
  $(".loading").fadeIn(300)
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  respone = await respone.json()
  displayArea(respone.meals)
  $(".loading").fadeOut(300)
}

$("#areaLink").click(function () {
  getArea()
})

function displayArea(data) {
  let temp = "";
  data.forEach((el) => {
    temp += `
    <div class="col-md-3">
    <div dataArea = ${el.strArea} class=" areaItem rounded text-center">
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h3>${el.strArea}</h3>
    </div>
  </div>
    `
  })
  document.getElementById("areaRow").innerHTML = temp
  getDataArea()
}

function getDataArea() {
  let itemList = document.querySelectorAll(".areaItem")
  itemList.forEach((el) => {
    el.addEventListener("click", function () {
      let dataArea = this.getAttribute("dataArea")
      console.log(dataArea);
      getAreaMeals(dataArea)
    })
  })
}

async function getAreaMeals(area) {
  document.getElementById("areaRow").innerHTML = ""
  $(".loading").fadeIn(300)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  response = await response.json()
  displayMeals(response.meals.slice(0, 20))
  $(".loading").fadeOut(300)
}

// Ingredients-------------------------

async function getIngredients() {
  $(".loading").fadeIn(300)
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  respone = await respone.json()
  displayIngredients(respone.meals.slice(0, 20))
  $(".loading").fadeOut(300)
}

$("#ingredientLink").click(function () {
  getIngredients()
})


function displayIngredients(data) {
  let temp = "";
  data.forEach((el) => {
    temp += `
    <div class="col-md-3">
    <div dataIng = ${el.strIngredient}  class="ingredientsItem rounded text-center">
      <i class="fa-solid fa-drumstick-bite fa-4x"></i>
      <h3>${el.strIngredient}</h3>
      <p>${el.strDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
  </div>
    `
  })
  document.getElementById("ingRow").innerHTML = temp
  getDataIng()
}

function getDataIng() {
  let itemList = document.querySelectorAll(".ingredientsItem")
  itemList.forEach((el) => {
    el.addEventListener("click", function () {
      let dataIng = this.getAttribute("dataIng")
      console.log(dataIng);
      getIngMeals(dataIng)
    })
  })
}

async function getIngMeals(ing) {
  $(".loading").fadeIn(300)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
  response = await response.json()
  displayMeals(response.meals.slice(0, 20))
  $(".loading").fadeOut(300)
}

// search -----------------------
let searchByName = []
let searchByLetter = []
let searchName = document.getElementById("searchByName")
let searchByFirstLetter = document.getElementById("searchByFirstLitter")

async function searchMealName(name) {
  $(".loading").fadeIn(300)

  let myReq = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  let data = await myReq.json()
  displayMeals(data.meals)
  $(".loading").fadeOut(300)
}
searchName.addEventListener("keyup", function () {
  $("#details").css("display", "none")
  $("#searchContainer").css("display", "none")
  $("#homeSection").css("display", "none")
  $("#ingredient").css("display", "none")
  $("#categories").css("display", "block")
  $("#area").css("display", "none")
  $(".closeIcon").click(() => {
    $("#details").css("display", "none")
    $("#homeSection").css("display", "block")
  })
  searchMealName(searchName.value)
})

async function searchMealFLitter(term) {
  $(".loading").fadeIn(300)
  term == "" ? term = "a" : "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
  response = await response.json()
  displayMeals(response.meals)
  $(".loading").fadeOut(300)
}
searchByFirstLetter.addEventListener("keyup", function () {
  $("#details").css("display", "none")
  $("#homeSection").css("display", "none")
  $("#ingredient").css("display", "none")
  $("#categories").css("display", "block")
  $("#area").css("display", "none")
  $(".closeIcon").click(() => {
    $("#details").css("display", "none")
    $("#homeSection").css("display", "block")
  })
  searchMealName(searchByFirstLetter.value)
})

// Contact Us -------------------
let submitBtn
function showContacts() {

  document.getElementById("contactRow").innerHTML = `

          <div class="col-md-6">
              <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 

          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
 `
  submitBtn = document.getElementById("submitBtn")

  $("#contactRow input").keyup(() => { inputsValidation() })

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
  })

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
  })

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
  })

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
  })

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
  })

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
  })
}

$("#contactstLink").click(function () {
  showContacts()
})

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document.getElementById("nameAlert").classList.replace("d-block", "d-none")

    } else {
      document.getElementById("nameAlert").classList.replace("d-none", "d-block")

    }
  }
  if (emailInputTouched) {

    if (emailValidation()) {
      document.getElementById("emailAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("emailAlert").classList.replace("d-none", "d-block")

    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document.getElementById("ageAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("ageAlert").classList.replace("d-none", "d-block")
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
    }
  }


  if (nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
  } else {
    submitBtn.setAttribute("disabled", true)
  }
}

function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}


















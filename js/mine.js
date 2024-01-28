let defaultData = document.getElementById('data');
let searchContainer = document.getElementById('searchContainer');

//Sidenav Toggle
function openNav()
{
    $(".sidenav").animate({left:0},500)
    $(".whitenav .fa-x").removeClass("d-none")
    $(".whitenav .fa-align-justify").addClass("d-none")
    for(let i=0;i<=5;i++)
    {
        $(".blacknav ul li").eq(i).animate({top:0},500)
    }
}
$(".whitenav .fa-align-justify").click(openNav);

function closeNav()
{
    let blackNavWidth = $(".blacknav").outerWidth(true);
    $(".sidenav").animate({left:`-${blackNavWidth}`},500)
    $(".whitenav .fa-x").addClass("d-none")
    $(".whitenav .fa-align-justify").removeClass("d-none")
    for(let i=0;i<=5;i++)
    {
        $(".blacknav ul li").eq(i).animate({top:300},500)
    }
}
$(".whitenav .fa-x").click(closeNav);

//Default Page Content
async function getDefaultData(){
    let x = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let searchData = await x.json();
    displayDefaultData(searchData);
}
function displayDefaultData(arr){
    let meals = '';
    searchContainer.innerHTML='';
    for(let i=0;i<arr.meals.length;i++)
    {
        meals+=`
            <div class="col-md-3 w-25 position-relative meal overflow-hidden">
                <img src="${arr.meals[i].strMealThumb}" class="w-100 rounded-2 ">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 bg-light rounded-2">
                        <h3>${arr.meals[i].strMeal}</h3>
                    </div>
            </div>
        `
    }
    document.getElementById('data').innerHTML = meals;
}
getDefaultData();

//Search
let searchLink = document.querySelector("#search")
searchLink.addEventListener("click",function(){
    defaultData.innerHTML = '';
    searchContainer.innerHTML=`
        <div class="col-md-6 my-3 search">
            <input oninput="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6 search">
            <input oninput="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>`
});

async function searchByName(name)
{
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let searchData = await x.json();
    displayDefaultData(searchData); 
}
async function searchByLetter(char)
{
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`);
    let searchData = await x.json();
    displayDefaultData(searchData); 
}

//Categories
let catLink = document.getElementById('cat');
async function getCat()
{
    let x = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let searchData = await x.json();
    displayCat(searchData);
}
function displayCat(arr){
    let cats = '';
    searchContainer.innerHTML='';
    for(let i=0;i<arr.categories.length;i++)
    {
        cats+=`
            <div class="col-md-3 w-25 position-relative meal overflow-hidden">
                <img src="${arr.categories[i].strCategoryThumb}" class="w-100 rounded-2 ">
                <div class="meal-layer position-absolute d-flex flex-column align-items-center text-black text-center p-2 bg-light rounded-2">
                        <h3>${arr.categories[i].strCategory}</h3>
                        <p>${arr.categories[i].strCategoryDescription}</p>
                    </div>
            </div>
        `
    }
    document.getElementById('data').innerHTML = cats;
}
catLink.addEventListener("click",getCat);

//Areas
let areaLink = document.getElementById('area');

async function getAreas()
{
    let x = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let searchData = await x.json();
    displayAreas(searchData);
}

function displayAreas(arr)
{
    let areas = '';
    searchContainer.innerHTML='';
    for(let i=0;i<arr.meals.length;i++)
    {
        areas+=`
            <div class="col-md-3 w-25 d-flex flex-column text-center">
            <i class="fa-solid fa-house-laptop fa-2x text-white"></i>
            <span class="text-white">${arr.meals[i].strArea}</span>
            </div>
        `
    }
    document.getElementById('data').innerHTML = areas;
}
areaLink.addEventListener("click",getAreas);

//Ingredients
let ingLink = document.getElementById('ing');

async function getIng()
{
    let x = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let searchData = await x.json();
    displayIng(searchData);
}

function displayIng(arr)
{
    let ing = '';
    searchContainer.innerHTML='';
    for(let i=0;i<20;i++)
    {
        ing+=`
            <div class="col-md-3 w-25 d-flex flex-column text-center">
            <i class="fa-solid fa-drumstick-bite"></i>
            <span class="text-white h2">${arr.meals[i].strIngredient}</span>
            <p class="text-white">${arr.meals[i].strDescription}</p>
            </div>
        `
    }
    document.getElementById('data').innerHTML = ing;
}
ingLink.addEventListener("click",getIng);

//Contact
function getContact()
{
    searchContainer.innerHTML='';
    defaultData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Re-Enter-Password">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
submitBtn = document.getElementById("submitBtn")


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
let contactLink = document.getElementById('contact');
contactLink.addEventListener("click",getContact);

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

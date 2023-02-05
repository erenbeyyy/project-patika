let userName = prompt("Adınız Nedir?")
let myName = document.querySelector("#myName")

myName.innerHTML = `${userName}`

function zaman() {
    const date = new Date().toLocaleString();
    document.getElementById(`myClock`).innerHTML = date;
}
setInterval(zaman, 1000)
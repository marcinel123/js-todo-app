let userName

if (localStorage.getItem("userName") === null) {
    userName = prompt("Please start with entering your name")
    if (userName === null) {
        userName = "Stranger :)"
    }
    document.querySelector(".main-heading").innerText =
    `Hello Dear ${userName}`
    localStorage.setItem("userName", userName )
} else {
    userName = localStorage.getItem("userName")
    document.querySelector(".main-heading").innerText =
    `Hello Dear ${userName}`
}


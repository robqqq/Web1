let y = "";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit_button").addEventListener("click", submit)
    document.getElementById("cleaning_button").addEventListener("click", () => send_request('GET', 'clear.php'))
    inputElements = document.getElementsByTagName("input")
    for (i = 0; i < inputElements.length; i++)
    {
        inputElements[i].addEventListener("change", changeDotPos);
        inputElements[i].addEventListener("input", changeDotPos);
        inputElements[i].addEventListener("click", changeDotPos);
    }
});

function submit() {
    if (checkX() && checkY() && checkR()){
        let params = "?x=" + parseFloat(document.getElementById("x").value.substring(0, 12).replace(',', '.'))
        params += "&y=" + y
        params += "&r=" + document.querySelector("input[type = radio]:checked").value
        send_request('GET', 'server.php', params)
    }
}

function checkX() {
    let x = document.getElementById("x")
    if (x.value.trim() === "") {
        alert("X value must be entered")
        return false;
    }
    let xVal = x.value.replace(',', '.').substring(0, 12)
    if (!isFinite(xVal)) {
        alert("X value must be a number")
        return false;
    }
    if (xVal >= 5 || xVal <= -5) {
        alert("X value must be in range (-5; 5)")
        return false
    }
    return true
}

function silentCheckX(){
    let x = document.getElementById("x")
    if (x.value.trim() === "") {
        return false;
    }
    let xVal = x.value.replace(',', '.').substring(0, 12)
    if (!isFinite(xVal)) {
        return false;
    }
    if (xVal >= 5 || xVal <= -5) {
        return false
    }
    return true
}

function checkY(){
    if (y === ""){
        alert("Y value must be selected")
        return false
    }
    return true
}

function silentCheckY(){
    if (y === ""){
        return false
    }
    return true
}

function checkR(){
    try {
        document.querySelector("input[type = radio]:checked").value;
        return true;
    } catch (err) {
        alert("R value must be selected")
        return false;
    }
}

function silentCheckR(){
    try {
        document.querySelector("input[type = radio]:checked").value;
        return true;
    } catch (err) {
        return false;
    }
}

function setY(object){
    buttons = document.getElementsByName("y_buttons")
    for (let button of buttons) {
        button.removeAttribute("style")
    }
    object.setAttribute("style", "background: rgba(138, 43, 226, 0.3)")
    y = object.value
}

function changeDotPos(e){
    if (silentCheckX() && silentCheckY() && silentCheckR()) {
        let x = parseFloat(document.getElementById("x").value.substring(0, 12).replace(',', '.'))
        let r = document.querySelector("input[type = radio]:checked").value
        document.getElementById("point").setAttributeNS(null, "cx", 150 + x / r * 100)
        document.getElementById("point").setAttributeNS(null, "cy", 150 - y / r * 100)
        document.getElementById("point").setAttributeNS(null, "visibility", "visible")
    } else {
        document.getElementById("point").setAttribute("visibility", "hidden")
    }
}

function send_request(method, url, params = ''){
    new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(method, url + params)
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr)
            }
            else
                resolve(xhr)
        }
        xhr.onerror = () => {
            reject(xhr)
        }
        xhr.send();
    }).then(xhr => {
        let response = xhr.responseText
        if (response !== "") {
            document.querySelector(".result_table").innerHTML = response
        }
        else
            alert(xhr.statusMessage)
    }).catch((xhr) => {
        // if(xhr.status === 400)
            alert(xhr.status + ": " + xhr.statusText)
        // else
        //     alert("Unknown Error")
    })
}

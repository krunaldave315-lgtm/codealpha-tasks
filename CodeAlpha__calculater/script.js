let screen = document.getElementById("screen");

function append(value){
    screen.value += value;
}

function clearScreen(){
    screen.value = "";
}

function deleteLast(){
    screen.value = screen.value.slice(0,-1);
}

function calculate(){
    try{
        screen.value = eval(screen.value);
    }
    catch{
        screen.value = "Error";
    }
}


// Keyboard Support
document.addEventListener("keydown", function(event){

    let key = event.key;

    if(!isNaN(key) || ['+','-','*','/','.','%'].includes(key)){
        screen.value += key;
    }

    else if(key === "Enter"){s
        calculate();
    }

    else if(key === "Backspace"){
        deleteLast();
    }

    else if(key === "Escape"){
        clearScreen();
    }

});
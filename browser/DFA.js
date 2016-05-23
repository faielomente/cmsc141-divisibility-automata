var input;
// var divisor;
var transitions = [];

function main() {
    input = document.getElementById("input").value;
    // var divisor = document.getElementById("divisor").value;
    var dictionary = [];
    var list = [];
    // alert("Input: " + input + 2\nDivi10sor);
    for (var i = 2; i < 10; i++) {
       create2dArray(i);
       populateTable(i);
       console.log(isMultiple(i));
       if (isMultiple(i) == true) {
        list.push(i);
       }
    }
    console.log("LCM: " + list);
}

function create2dArray(divisor) {
    transitions = new Array(divisor);
    for (var i = 0; i < divisor; i++){
        transitions[i] = new Array(divisor);
    }
}

function populateTable(divisor){
    for (var state = 0; state < divisor; state++) {
        for (var remainder = 0; remainder < divisor; remainder++) {
            var nextState = ((state*10)+remainder)%divisor;
            transitions[state][remainder] = nextState;
        }
    }
    console.log(transitions.join("\n"));
}

function isMultiple(divisor){
    var next = 0;
    var state = 0;
    var remainder = 0;

    for (var i = 0; i < input.length; i++) {
        var temp = Number(input[i]);
        remainder = ((state*10)+temp)%divisor;
        console.log("State: " + transitions[state][remainder]);
        next = transitions[state][remainder];
        state = next;
    }

    if (state==0)
        return true;
    else
        return false;
}
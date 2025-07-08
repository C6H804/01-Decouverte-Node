const fs = require("fs");
let readline = require("readline");
let path = require("path");


const chemin = path.join("journal.txt");

console.log(chemin);

function renderFile(p) {
    fs.readFile(p, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(setObject(data));
    });
}

function addMessage(p) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question("votre message : ", (answer) => {
        console.log("vous avez écrit : ", answer);
        writeToFile(answer + " - " + getTimeStamp(), p);
        renderFile(p);
        rl.close();
    });
}


function writeToFile(message, p) {
    fs.appendFile(p, "\n" + message, (err) => {
        if (err) 
            console.error(err);
        else 
        console.log("Message ajouté");
})
}


function getTimeStamp() {
    let now = new Date();
    return now.toLocaleString();
}


function setObject(str) {
    let obj = [];
    const nchr = "08/07/2025 10:52:17".length;
    str.split("\n").forEach(e => {
        let n = {
            "date": e.slice(e.length - nchr),
            "entry": e.slice(0, e.length - (nchr + " - ".length))
        };
        obj.push(n);
    });
    return obj;
}

addMessage(chemin);
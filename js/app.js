/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
 
let game = null;

document.querySelector("#btn__reset").addEventListener("click", event => {
    game = new Game();
    game.startGame();
});

document.querySelector("#qwerty").addEventListener("click", event => {
    if(event.target.tagName === "BUTTON") {
        game.handleInteraction(event.target);
    }
});

document.addEventListener("keydown", event => {
    let key = event.key;

    const buttons = document.querySelectorAll("button.key");
    buttons.forEach( button => {
        if(button.textContent === key && game !== null && button.disabled === false) {
            game.handleInteraction(button);
            
            return;
        }
    });
});
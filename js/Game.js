/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
     }

    /**
    * Creates phrases for use in game
    * @return {array} An array of phrases that could be used in the game
    */
     createPhrases() {
         const phrases = [
            /*new Phrase("You cant handle the truth"),
            new Phrase("I ll be back"),
            new Phrase("Merry Christmas you filthy animal"),
            new Phrase("Luke I am your father"),
            new Phrase("Frankly my dear I dont give a damn"), */
            new Phrase("Happy Happy Banana Cat"),
             new Phrase("Ronaldo vs Messi"),
             new Phrase("My dog is blue"),
             new Phrase("Panos and the big fat mouse"),
             new Phrase("Panos and vasilis are playing fortnite"),
             new Phrase("Santa Clause is fat"),
             new Phrase("Baby is a black and white cat"),
             new Phrase("Panos has a nintendo switch"),
             new Phrase("Merry christmas and a happy new year"),
             new Phrase("Roxie is a stupid dog"),
             new Phrase("My name is Panos"),
             new Phrase("My brothers name is vasilis"),
             new Phrase("Apoel thrillos"),
         ];

         return phrases;
     }

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        const index = Math.floor(Math.random() * this.phrases.length);

        return this.phrases[index];
    };

    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        //document.querySelector("#overlay").style.display = "none";
        document.querySelector("#overlay").classList.add("animated");
        document.querySelector("#overlay").classList.add("bounceOutDown");
        this.activePhrase =  this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    };
    
    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't won
    */
    checkForWin() {
        const listItems = document.querySelectorAll("#phrase ul li");
        let won = true;
        listItems.forEach( (item, index) => {
            if(item.classList.contains("hide")) {
                won = false;
            }
        });

        return won;
    };

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        this.missed++;
        const lives = document.querySelectorAll("#scoreboard ol li img");

        if(this.missed <= 5) {
            for(let i = 0; i < this.missed; i++) {
                lives[i].setAttribute("src", "images/lostHeart.png");
            }
        }

        if(this.missed >= 5) {
            this.gameOver(false);
        } 
    };

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        if(gameWon) {
            const message = document.querySelector("#game-over-message");
            message.textContent = "Congratulations! You Won!"

            const overlay = document.querySelector("#overlay");
            //overlay.style.display = "inherit";
            overlay.className = "win"
            overlay.classList.add("animated");
            overlay.classList.add("bounceInUp");
        } else {
            const message = document.querySelector("#game-over-message");
            message.textContent = "Too Bad :( Try Again!"
            
            const overlay = document.querySelector("#overlay");
            //overlay.style.display = "inherit";
            overlay.className = "lose"
            overlay.classList.add("animated");
            overlay.classList.add("bounceInUp");
        }

        const listItems = document.querySelectorAll("#phrase ul li");
        listItems.forEach( item => {
            item.remove();
        });

        const buttons = document.querySelectorAll("button.key");
        buttons.forEach( button => {
            button.classList.remove("chosen");
            button.classList.remove("wrong");
            button.disabled = false;
        });

        const lives = document.querySelectorAll("#scoreboard ol li img");

        for(let i = 0; i < lives.length; i++) {
            lives[i].setAttribute("src", "images/liveHeart.png");
        }
    };

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */
    handleInteraction(button) {
        const letter = button.textContent;
        button.disabled = true;

        if(this.activePhrase.checkLetter(letter)) {
            button.classList.add("chosen");
            this.activePhrase.showMatchedLetter(letter);

            if(this.checkForWin()) {
                this.gameOver(true);
            }
        } else {
            button.classList.add("wrong");
            this.removeLife();
        }
    };
 }

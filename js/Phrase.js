/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
     constructor(phrase) {
        this.phrase = phrase.toLowerCase();
     }

    /**
    * Display phrase on game board
    */
    addPhraseToDisplay() {
        //Turn phrase into an array of individual letters
        const lettersArray = [];

        for(let i = 0; i < this.phrase.length; i++) {
            lettersArray.push(this.phrase[i]);
        }

        //Get phrase container
        const phraseContainer = document.querySelector("#phrase ul");
        
        //Create a list item for each letter in the phrase
        lettersArray.forEach( (letter, index) => {
            const li = document.createElement("li");

            if (letter === " ") {
                li.className = "space";
            } else {
                li.className = "hide";
                li.classList.add("letter");
                li.classList.add(letter);
                li.textContent = letter;
            }
            
            //Append the list item to the dom
            phraseContainer.appendChild(li);
        });
    };

    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
    checkLetter(letter) {
        if (this.phrase.includes(letter)) {
            return true;
        } else {
            return false;
        }
    };

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {
        const listItems = document.querySelectorAll("#phrase ul li");
        listItems.forEach( (item, index) => {
            if(item.classList.contains(letter)) {
                item.classList.toggle("hide");
                item.classList.toggle("show");
            }
        });
    };
 }

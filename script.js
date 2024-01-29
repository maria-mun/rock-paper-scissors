const choices = ["rock", "paper", "scissors"];



    let tryCount = 1;
    let userCount = 0;
    let comCount = 0;

    let confirmBtn = document.querySelector("#confirm-btn");


    confirmBtn.addEventListener("click", () => {
        console.log(tryCount);

        let options = document.getElementsByName("option");
        let userChoices = document.querySelectorAll(".user-choice");
        let comChoices = document.querySelectorAll(".com-choice");
        let gameResult = document.querySelector(".game-result");

        //отримуємо відповідь гравця і комп'ютера
        let userAnswer = " ";
        options.forEach((option) => {
            if (option.checked) {
                userAnswer = option.value;
            };
        });

        let comAnswer = choices[Math.floor(Math.random()*choices.length)];

        //визначаємо переможця раунда
        function decideRoundWinner () {
            if ((userAnswer === "rock" && comAnswer === "scissors") ||
                (userAnswer === "paper" && comAnswer === "rock") ||       
                (userAnswer === "scissors" && comAnswer === "paper")
            ) {
                return "user";
            }
            if ((userAnswer === "scissors" && comAnswer === "rock") ||
                (userAnswer === "rock" && comAnswer === "paper") ||       
                (userAnswer === "paper" && comAnswer === "scissors")
            ) {
                return "com";
            }
            if ((userAnswer === "scissors" && comAnswer === "scissors") ||
                (userAnswer === "rock" && comAnswer === "rock") ||       
                (userAnswer === "paper" && comAnswer === "paper")
            ) {
                return "even";
            }
        }

        let roundWinner = decideRoundWinner();


        //додаємо вибір гравця у відповідний раунд і позначаємо відповідним кольором
        userChoices.forEach ((userChoice) => {
            if (tryCount == userChoice.dataset.value) {
                userChoice.textContent = userAnswer;
                switch (roundWinner) {
                    case "user":
                        userChoice.style.backgroundColor = "green";
                        userCount++;
                        break;
                    case "com":
                        userChoice.style.backgroundColor = "red";
                        break;
                    case "even":
                        userChoice.style.backgroundColor = "yellow";
                        break;
                }
            };
        });

        
        //додаємо вибір комп'ютера у відповідний раунд і позначаємо відповідним кольором
        comChoices.forEach ((comChoice) => {
            if (tryCount == comChoice.dataset.value) {
                comChoice.textContent = comAnswer;
                switch (roundWinner) {
                    case "com":
                        comChoice.style.backgroundColor = "green";
                        comCount++;
                        break;
                    case "user":
                        comChoice.style.backgroundColor = "red";
                        break;
                    case "even":
                        comChoice.style.backgroundColor = "yellow";
                        break;
                }
            };
        });
        

        tryCount++;

        if (tryCount > 3) {
            options.forEach(option => {
                option.disabled = true;
            });
            confirmBtn.disabled = true;
            let h1 = document.createElement("h1");
            let text = (userCount > comCount) ? "You win!": (userCount < comCount) ? "You lose!" : "It's a tie!";    
            h1.textContent = text;

            let playAgainBtn = document.createElement("button");
            playAgainBtn.classList.add("play-again-btn");
            playAgainBtn.textContent = "Play again";

            gameResult.appendChild(h1);
            gameResult.appendChild(playAgainBtn);
            
            //--------------------------------------------------
            playAgainBtn.addEventListener("click", () => {
                tryCount = 1;
                userCount = 0;
                comCount = 0;

                userChoices.forEach((userChoice) => {
                    userChoice.textContent = "";
                    userChoice.style.backgroundColor = "";
                })
                comChoices.forEach((comChoice) => {
                    comChoice.textContent = "";
                    comChoice.style.backgroundColor = "";
                })
                options.forEach(option => {
                    option.disabled = false;
                });
                confirmBtn.disabled = false;

                gameResult.removeChild(h1);
                gameResult.removeChild(playAgainBtn);
            })
        };
    });



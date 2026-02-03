document.addEventListener('DOMContentLoaded', () => {
    let playerScore = 0;
    let computerScore = 0;
    let gameActive = true;
    const WINNING_SCORE = 5;

    const playerChoiceDisplay = document.getElementById('player-choice-display');
    const computerChoiceDisplay = document.getElementById('computer-choice-display');
    const playerScoreSpan = document.getElementById('player-score');
    const computerScoreSpan = document.getElementById('computer-score');
    const resultMessage = document.getElementById('result-message');
    const resultDetail = document.getElementById('result-detail');
    const choiceButtons = document.querySelectorAll('.choice-btn');
    const resetBtn = document.getElementById('reset-btn');

    const emojis = {
        rock: '🪨',
        paper: '📄',
        scissors: '✂️'
    };

    function computerPlay() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function playRound(playerSelection) {
        if (!gameActive) return;

        const computerSelection = computerPlay();
        updateChoiceDisplay(playerSelection, computerSelection);

        if (playerSelection === computerSelection) {
            roundResult('draw', playerSelection, computerSelection);
        } else if (
            (playerSelection === 'rock' && computerSelection === 'scissors') ||
            (playerSelection === 'paper' && computerSelection === 'rock') ||
            (playerSelection === 'scissors' && computerSelection === 'paper')
        ) {
            playerScore++;
            roundResult('win', playerSelection, computerSelection);
        } else {
            computerScore++;
            roundResult('lose', playerSelection, computerSelection);
        }

        updateScoreboard();
        checkGameWinner();
    }

    function updateChoiceDisplay(pChoice, cChoice) {
        playerChoiceDisplay.querySelector('.emoji').textContent = emojis[pChoice];
        computerChoiceDisplay.querySelector('.emoji').textContent = emojis[cChoice];

        playerChoiceDisplay.classList.add('active');
        computerChoiceDisplay.classList.add('active');

        setTimeout(() => {
            playerChoiceDisplay.classList.remove('active');
            computerChoiceDisplay.classList.remove('active');
        }, 300);
    }

    function roundResult(result, pChoice, cChoice) {
        playerChoiceDisplay.className = 'choice-placeholder active';
        computerChoiceDisplay.className = 'choice-placeholder active';

        if (result === 'win') {
            resultMessage.textContent = 'You Win!';
            resultMessage.style.color = '#3b82f6';
            resultDetail.textContent = `${capitalize(pChoice)} beats ${capitalize(cChoice)}`;
            playerChoiceDisplay.classList.add('winner');
            computerChoiceDisplay.classList.add('loser');
        } else if (result === 'lose') {
            resultMessage.textContent = 'You Lose!';
            resultMessage.style.color = '#ec4899';
            resultDetail.textContent = `${capitalize(cChoice)} beats ${capitalize(pChoice)}`;
            computerChoiceDisplay.classList.add('winner');
            playerChoiceDisplay.classList.add('loser');
        } else {
            resultMessage.textContent = "It's a Draw!";
            resultMessage.style.color = '#f8fafc';
            resultDetail.textContent = `Both chose ${capitalize(pChoice)}`;
        }
    }

    function updateScoreboard() {
        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;
    }

    function checkGameWinner() {
        if (playerScore >= WINNING_SCORE || computerScore >= WINNING_SCORE) {
            gameActive = false;

            if (playerScore > computerScore) {
                resultMessage.textContent = '🎉 GAME WON! 🎉';
                resultMessage.style.color = '#10b981';
                resultDetail.textContent = 'Congratulations! You defeated the computer.';
            } else {
                resultMessage.textContent = '💀 GAME OVER 💀';
                resultMessage.style.color = '#ef4444';
                resultDetail.textContent = 'The computer defeated you. Try again!';
            }

            choiceButtons.forEach(btn => {
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            });

            resetBtn.classList.remove('hidden');
        }
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        gameActive = true;
        updateScoreboard();

        resultMessage.textContent = 'Choose your weapon';
        resultMessage.style.color = '#f8fafc';
        resultDetail.textContent = `First to ${WINNING_SCORE} wins!`;

        playerChoiceDisplay.querySelector('.emoji').textContent = '❔';
        computerChoiceDisplay.querySelector('.emoji').textContent = '❔';

        playerChoiceDisplay.className = 'choice-placeholder';
        computerChoiceDisplay.className = 'choice-placeholder';

        resetBtn.classList.add('hidden');

        choiceButtons.forEach(btn => {
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        });
    }

    choiceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (gameActive) {
                playRound(btn.dataset.choice);
            }
        });
    });

    resetBtn.addEventListener('click', resetGame);
});

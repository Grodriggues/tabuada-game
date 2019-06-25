const $tabuada = document.querySelector("#tabuada");
const $button = document.querySelector("#tabuada .answer .btn");

const $answer = document.querySelector("#answer");
const $question = document.querySelector("#question");
const $steps = document.querySelector("#score h2 span");
const wrongAnswers = {};
const maxSteps = 5;

// Variables
let currentAnswer;
let steps = 0;
let score = 0;


$button.addEventListener("submit", (event) => {
    event.preventDefault();
    if((isInvalidValue())) return
    verifyAnswer();
    createNewQuestion();
    clearInput();
    if(steps > 5) renderResults();
});

window.addEventListener("load" ,() =>{
    createNewQuestion();
})

const clearInput = () => $answer.value = "";

const createProblems = () =>{
    const choose = Math.floor(Math.random()*10)
    const num = Math.floor(Math.random()*9)
    currentAnswer= choose*num;
    return { num,choose }
}

const createNewQuestion = () =>{
    const {num,choose} = createProblems();
    $question.innerHTML = `<h1 class="text-light l-heading">${num}<span class="text-primary">x</span>${choose} ?</h1>`
    steps++;
    renderScore(steps,maxSteps);

}

const isInvalidValue = () =>{
    if(!$answer.value) return true;
    if(isNaN($answer.value)) return true;
    

}

const renderResults = () =>{
    const $replay = document.querySelector("#btn-replay button");
    $replay.style.display = "block";
    $tabuada.innerHTML = `<p class="errors text-light">Você acertou ${score} das ${maxSteps} Questoes</p>`

    $tabuada.innerHTML += `<h2 class="text-light results"> Seus Erros :</h2>`;

    for(let props in wrongAnswers){
        let {rightAnswer , wrongAnswer} = wrongAnswers[props];
        $tabuada.innerHTML += `<p class="text-primary results">${props} errado: <span class="wrong-as">${wrongAnswer}</span> correto: <span class="right-as">${rightAnswer}</span></p>`
    }

    $replay.addEventListener("click" , () => location.reload()) // this is going to reload the page
}

const renderScore = (currentStep,maxSteps) =>{
    $steps.innerHTML = `(${currentStep}/${maxSteps})`
}


const verifyAnswer = () =>{
    const answerOfUser = Number($answer.value);
    if(answerOfUser === currentAnswer) score++;
    else{
        const formated = $question.textContent.split("?").join("").trim();
        wrongAnswers[formated] = {rightAnswer:currentAnswer,wrongAnswer:answerOfUser};

    }
    
}



 


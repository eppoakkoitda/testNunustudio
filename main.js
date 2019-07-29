window.onload = function(){

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
let currentQuestion = 0;
buildQuiz(0);

previousButton.addEventListener("click", showPreviousQuestion);
nextButton.addEventListener("click", showNextQuestion);
submitButton.addEventListener('click', showResult);

// 問題HTMLの生成
function buildQuiz(n){
    // HTML出力を格納する変数
    const output = [];

    // 選択肢を保存する配列定義＆初期化
    const answers = [];
    
    // 選択肢(myQuestions[].answers)の数だけループしanswers配列に格納
    for(letter in myQuestions[n].answers){
        answers.push(
            `<label>
                <input type="radio" name="questions" value="${letter}">
                ${letter} : ${myQuestions[n].answers[letter]} <br>
            </label>`
        );
    }

    let saveData = getSaveData(n);
    // outputに質問文と選択肢のHTMLを格納
    output.push(
        `${JSON.stringify(saveData)}
        <div class="question"> ${myQuestions[n].question} </div>
        <div class="answers"> ${answers.join('')} </div>`
    );

    //console.log(quizContainer);
    // output配列を一つの文字列に結合してからDOM操作
    quizContainer.innerHTML = output.join("");
    currentQuestion = n;
}

function showResult(){
    let buttons = document.getElementsByName( "questions" );
    for ( var userAnswer="", i=buttons.length; i--; ) {
        if ( buttons[i].checked ) {
            var userAnswer = buttons[i].value ;
            break ;
        }
    }

    let saveData = getSaveData(currentQuestion);
    let sd_length = Object.keys(saveData).length;
    
    if ( userAnswer === "" ) {
        
    } else {
        if(userAnswer === myQuestions[currentQuestion].correctAnswer){
            quizContainer.style.color = 'lightgreen';
            saveData[sd_length + 1] = "〇";
        }else{
            quizContainer.style.color = 'red';
            saveData[sd_length + 1] = "×";
        }
    }

    let setJSON = JSON.stringify(saveData);
    localStorage.setItem(currentQuestion, setJSON);
    resultsContainer.innerHTML = userAnswer;
}

function showNextQuestion() {
    quizContainer.style.color = 'black';
    buildQuiz(currentQuestion + 1);
}
  
function showPreviousQuestion() {
    quizContainer.style.color = 'black';
    buildQuiz(currentQuestion - 1);
}

function getSaveData(key){
    let getJSON = localStorage.getItem(key);
    if(getJSON == null){
        var saveData = {};
    }else{
        var saveData = JSON.parse(getJSON);
    }
    return saveData;
}

}
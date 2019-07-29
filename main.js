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
submitButton.addEventListener('click', showResults);

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
                <input type="radio" name="question${n}" value="${letter}">
                ${letter} : ${myQuestions[n].answers[letter]} <br>
            </label>`
        );
    }

    // outputに質問文と選択肢のHTMLを格納
    output.push(
        `<div class="question"> ${myQuestions[n].question} </div>
        <div class="answers"> ${answers.join('')} </div>`
    );

    //console.log(quizContainer);
    // output配列を一つの文字列に結合してからDOM操作
    quizContainer.innerHTML = output.join("");
    currentQuestion = n;
}

function showResults(){
    // outputの中のHTMLのクラスがanswersのDOMを選択
    const answerContainers = quizContainer.querySelectorAll('.answers');
    // ユーザーが選択した回答を格納する変数
    let numCorrect = 0;

    // 質問の解答をループを使って順番にチェック
    // 1.ユーザーが選択した解答をHTMLから取得
    // 2.正答の場合の処理
    // 3.誤答の場合の処理
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            if(userAnswer === currentQuestion.correctAnswer){
                numCorrect++;
                answerContainers[questionNumber].style.color = 'lightgreen';
            }else{
                answerContainers[questionNumber].style.color = 'red';
            }
        }
    );

    resultsContainer.innerHTML = `${numCorrect}out of${myQuestions.length}`;
}

function showNextQuestion() {
    buildQuiz(currentQuestion + 1);
}
  
function showPreviousQuestion() {
    buildQuiz(currentQuestion - 1);
}

}
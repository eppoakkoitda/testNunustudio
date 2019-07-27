(function(){

function buildQuiz(){


    // HTML出力を格納する変数
    const output = [];

    // foreach: myQuestions配列の要素数分ループ
    myQuestions.forEach(
        // コールバック関数(配列の内容(value), 配列番号(index))
        (currentQuestion, questionNumber) => {
            // 選択肢を保存する配列定義＆初期化
            const answers = [];
            
            // 選択肢(myQuestions[].answers)の数だけループしanswers配列に格納
            for(letter in currentQuestion.answers){
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            // outputに質問文と選択肢のHTMLを格納
            output.push(
                `<div class="answers> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );

    console.log(quizContainer);
    // output配列を一つの文字列に結合してからDOM操作
    quizContainer.innerHTML = output.join("");
}

function showResults(){
    // outputの中のHTMLのクラスがanswersのDOMを選択
    const answerContainers = quizContainer.querySelectorAll('.answers');
    // ユーザーが選択した回答を格納する変数
    let numCorrect = 0;

    // 
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = 'input[name=question' + questionNumber+']:checked';
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            if(userAnswer === currentQuestion.correctAnswer){
                numCorrect++;
                answerContainers[questionNumber].style.color = 'lightgreen';
            }else{
                answerContainers[questionNumber].style.color = 'red';
            }
        }
    );

    resultsContainer.innerHTML = numCorrect + 'out of' + myQuestions.length;
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

buildQuiz();

submitButton.addEventListener('click', showResults);
})();
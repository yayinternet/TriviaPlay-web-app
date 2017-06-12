
class QuestionScreen{
  constructor(jsonData, name, email, category){
    this.jsonData = jsonData;
    this.name = name;
    this.email = email;
    this.category = category;
    this.resultsScreen;
    this.showNextQuestion = this.showNextQuestion.bind(this);
    this.previousContainer = document.querySelector(".category");
    this.previousContainer.classList.add('inactive');
    this.counter = 0;
    this.max = this.jsonData.length;
    this.questionHolder = document.querySelector('#triviaQuestion');
    this.questionDisplay = document.querySelector(".questions");
    this.onClick = this.onClick.bind(this);
    this.numCorrect =0;
    this.numWrong = 0;
    this.questionDisplay.classList.remove('inactive');
    this.showNextQuestion();
  }

  showNextQuestion(){
    let loadScreen = document.querySelector("#loadScreen");
    loadScreen.classList.add("inactive");
     if (this.counter >= 10) return;
    this.questionHolder.innerHTML = this.jsonData[this.counter].text;
    this.choicesHolder = document.querySelector('#choices');
    while (this.choicesHolder.firstChild){
      this.choicesHolder.removeChild(this.choicesHolder.firstChild);
    }
    this.choices = this.jsonData[this.counter].answers;
    for (let choice of this.choices){
      let containerElem =document.createElement("div");
      containerElem.innerHTML = choice.text;
      containerElem.classList.add("selection");
      if (choice.correct === true){
        containerElem.classList.add("true");
      }
      containerElem.classList.add('answer_format');
      this.choicesHolder.appendChild(containerElem);
      containerElem.addEventListener('click', this.onClick);
    }
  }


  onClick(event){
    if (event.currentTarget.classList.contains('true')){
      event.currentTarget.style.backgroundImage = "url('images/correct.jpg')";
      this.numCorrect++;
    }else{
      event.currentTarget.style.backgroundImage = "url('images/wrong.jpg')";
      this.numWrong++;
    }
     setTimeout(function(){
      this.counter++;
     if (this.counter === 10){
      this.resultsScreen = new ResultScreen(this.numCorrect, this.numWrong, this.name, this.email, this.category, this.jsonData);
      }
      this.showNextQuestion();
      }.bind(this), 500);
  }

}
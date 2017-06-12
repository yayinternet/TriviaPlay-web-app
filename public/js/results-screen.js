
        class ResultScreen{
          constructor(numCorrect, numWrong, name, email, category, jsonData){
            this.numCorrect = numCorrect;
            this.numWrong = numWrong;
            this.name = name;
            this.email = email;
            this.category = category;
            this.jsonData = jsonData;
            this.getRecommendation = this.getRecommendation.bind(this);
            this.calculatePercentage = this.calculatePercentage.bind(this);
            this.congratsDiv = document.querySelector("#results-head");
            this.displayResults = this.displayResults.bind(this);
            this.restartBut = document.querySelector("#restart-button");
            this.chooseCategBut = document.querySelector("#category-button");
            this.image;
            this.displayResults();
          }

          async displayResults(){
             let giphyElem = document.querySelector("#giphy");
             let recTitle = document.querySelector("#rec");
            let rec = document.querySelector("#recommendation");
            let prevScreen = document.querySelector(".questions");
            prevScreen.classList.add("inactive");
            let currentScreen = document.querySelector(".respage");
            currentScreen.classList.remove("inactive");
            this.restartBut.addEventListener('click', function(){
              currentScreen.classList.add("inactive");
              let repeatQuestions = new QuestionScreen(this.jsonData,this.name, this.email, this.category);
              this.image.classList.add('inactive');
              this.image.parentNode.removeChild(this.image);
              return;
            }.bind(this));

            this.chooseCategBut.addEventListener('click',function(){
              currentScreen.classList.add("inactive");
              let newQuestions = new CategoryScreen(this.name,this.email);
              this.image.classList.add('inactive');
              this.image.parentNode.removeChild(this.image);
              return;
            }.bind(this));
             this.image = new Image();
            if (this.numCorrect === 10){
              this.image.src = "images/winner.gif";
              this.image.classList.add("giph_img");
              giphyElem.appendChild(this.image);
              this.congratsDiv.textContent = "You, "+this.name+" are Awesome!";
            }else if(this.numCorrect >= 5){
              recTitle.classList.remove("inactive");
              this.image.classList.add("giph_img");
              this.image.src = "images/loser.gif";
              giphyElem.appendChild(this.image);
              this.congratsDiv.textContent = "You, "+this.name+" got "+this.calculatePercentage()+"% You are good, but not Awesome!";
              rec.textContent = this.getRecommendation();
            }else{
              recTitle.classList.remove("inactive");
              this.image.src = "images/loser.gif";
              this.image.classList.add("giph_img");
              giphyElem.appendChild(this.image);
              this.congratsDiv.textContent = "Dear, "+this.name +" today is evidently not your day. You only managed: "+this.calculatePercentage()+'% !';
               rec.textContent = this.getRecommendation();
            }
            const fetchOptions2= {
              method: 'GET'
                   };
          let rs  = await fetch('/get/'+this.email,fetchOptions2);
          let test = await rs.json();  
          let cumulativeScore = this.numCorrect;
          if (test[0].contained){
            console.log(test[1].points)
            cumulativeScore += test[1].points;
          } 
            const message = {
              name: this.name,
              email: this.email,
              points: cumulativeScore
            };
            const fetchOptions = {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
              },
              body: JSON.stringify(message)
            };
            console.log("just about to fetch");
            let rst  = await fetch('/save',fetchOptions);
            console.log("after post");
            let text = await rst.json(); 
          }

          calculatePercentage(){
            let perc = (this.numCorrect/(this.numCorrect+this.numWrong))*100;
            return perc;
          }

          getRecommendation(){
            if (this.category === "movies"){
              return "Subscribe to netflix, vimeo, youtube, HBO ..etc. Just watch movies! And also watch Game of Thrones!";
            }else if (this.category === "sports"){
              return "Go for football and soccer matches, take part in the olympics or join intramural sports!!!";
            }else if (this.category === "music"){
              return "Heard of Spotify? Youtube? If not google them and listen to music!";
            }
          }
        }


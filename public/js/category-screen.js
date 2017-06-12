
		class CategoryScreen{
			constructor(name , email){
				this.name = name;
				this.email = email;
				this.category;
				this.onSelectCategory = this.onSelectCategory.bind(this);
				this.containerElem = document.querySelector(".category");
				this.containerElem.classList.remove("inactive");
				this.addCategoryListeners = this.addCategoryListeners.bind(this);
				this.questionScreen;
				this.changeUserButton = document.querySelector("#change-user");
				this.changePlayer = this.changePlayer.bind(this);
				this.changeUserButton.addEventListener('click', this.changePlayer);
				this.addCategoryListeners();
			}

			changePlayer(){
				let categElem = document.querySelector(".category");
				categElem.classList.add("inactive");
				let register = document.querySelector("#register");
                register.classList.remove("inactive");
			}

			addCategoryListeners(){
				let categories = document.querySelectorAll(".navigation");
				for (let item of categories){
					item.addEventListener('click',this.onSelectCategory);
				}
			}

			async onSelectCategory(event){
				let currentContainerElem = event.currentTarget;
				let categElem = document.querySelector(".category");
				categElem.classList.add("inactive");
				let loadScreen = document.querySelector("#loadScreen");
				loadScreen.classList.remove("inactive");
				if (currentContainerElem.classList.contains("sports")){
					let sportItems = await fetch('https://cocktail-trivia-api.herokuapp.com/api/category/sports');
					let jsonData = await sportItems.json();
				  this.category = "sports";
				  this.questionScreen = new QuestionScreen(jsonData,this.name, this.email, this.category);
				}else if (currentContainerElem.classList.contains("movies")){
					let movieItems = await fetch('https://cocktail-trivia-api.herokuapp.com/api/category/entertainment-film');
					let jsonData = await movieItems.json();
				  this.category = "movies";
					this.questionScreen = new QuestionScreen(jsonData,this.name, this.email,this.category);

				}else if (currentContainerElem.classList.contains("music")){
					let  musicItems = await fetch('https://cocktail-trivia-api.herokuapp.com/api/category/entertainment-music');
					let jsonData = await musicItems.json();
					this.category = "music";
					this.questionScreen = new QuestionScreen(jsonData, this.name, this.email, this.category);
				}else if(currentContainerElem.classList.contains("leaderboard")){
					loadScreen.classList.add("inactive");
					let categPageElem= document.querySelector(".category");
					categPageElem.classList.add('inactive');
					const fetchOptions = {
		        method: 'GET'
		             };
					const respo = await fetch('/getall', fetchOptions);
					let data = await respo.json();
					let sorted=[];
					let prev = 0;
					for (let i = 1; i < data.length; i++){
						prev = i-1;
						if (data[i].points >= data[prev].points){
							let currentSortPosition = i;
							while(data[currentSortPosition].points >= data[prev].points){
								let temp = data[prev];
								data[prev] = data[currentSortPosition];
								data[currentSortPosition] = temp;
								if (prev >= 1){
									currentSortPosition = prev;
									prev--;
								}else{
									break;
								}
							}
						}
					}

					const holderElem = document.querySelector("#rankings");
					holderElem.classList.remove("inactive");
					let rankButton = document.querySelector("#back-rank");
					rankButton.addEventListener('click', function(){
						const elemHold = document.querySelector("#rankings");
						elemHold.classList.add("inactive");
						const categHold = document.querySelector(".category");
						categHold.classList.remove("inactive");
					});
					const containerElement = document.querySelector("#realData");
					containerElement.innerHTML = '';
					let tableHead ={
						name: "NAME",
						points: "SCORE"
					};
					data.splice(0,0,tableHead);
					for (let i = 0; i < data.length; i++){
						let rankTable = document.createElement("TABLE");
						rankTable.classList.add("tableFormat");
						containerElement.appendChild(rankTable);
						let row = rankTable.insertRow(0);
						row.classList.add("tableFormat");
						row.classList.add("rank");

						let cell0 = row.insertCell(0);
						cell0.classList.add("tableFormat");
						let cell1 = row.insertCell(1);
						cell1.classList.add("tableFormat");
						let cell2 = row.insertCell(2);
						cell2.classList.add("tableFormat");
						if (i == 0){
							cell0.innerHTML = "RANK";
						}else{
							cell0.innerHTML = i;
						}
						cell1.innerHTML = data[i].name;
						cell2.innerHTML = data[i].points;
					}
			}
		}
	}

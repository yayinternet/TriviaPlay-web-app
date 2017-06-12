      class App {
        constructor() {
          this.onSubmitAction = this.onSubmitAction.bind(this);
          this.nameElem = document.querySelector("#register");
          this.nameElem.classList.remove("inactive");
          this.registerAction = document.querySelector("form");
          this.registerAction.addEventListener('submit', this.onSubmitAction);
          this.nameHolder = document.querySelector("#name-input");
          this.emailHolder = document.querySelector("#email-input");
          this.categoryScreen;
       
        }



         onSubmitAction(){
          event.preventDefault();
          if (this.nameHolder.value.trim() == '' || this.emailHolder.value.trim() == ''){
            return;
          }
          this.nameElem.classList.add("inactive");
          // console.log("creating category categoryScreen");
          this.categoryScreen = new CategoryScreen(this.nameHolder.value, this.emailHolder.value);
        }
      }
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
          // this.getLoggenIn();
        }

        // async _getLoggedIn() {
        //   await LoginUtils.initialize();
        //   await this._setupLoginLogout();
        //   await this._updateMenu();
        // }
        
        //   async _setupLoginLogout() {
        //   await LoginUtils.initialize();
        //   const auth2 = gapi.auth2.getAuthInstance();
        //   auth2.isSignedIn.listen(this._onLoginChanged);
        //   const loginButton = document.querySelector('#login');
        //   auth2.attachClickHandler(loginButton);
        //   const logoutButton = document.querySelector('#logout');
        //   logoutButton.addEventListener('click', this._onLogout);
        // }

        // async _updateMenu() {
        //   const result = await LoginUtils.getSignedInUser();
        //   if (result.loggedIn) {
        //     await this._loadOptions();
        //     this.loginMenu.classList.add('hidden');
        //     this.mainMenu.classList.remove('hidden');
        //   } else {
        //     this.mainMenu.classList.add('hidden');
        //     this.loginMenu.classList.remove('hidden');
        //   }
        // }

        // async _loadOptions() {
        //   await LoginUtils.initialize();
        //   const user = await LoginUtils.getSignedInUser();
        //   const response = await fetch(`/load/${user.idToken}`);
        //   const result =  await response.json();
        //   const menuContainer = document.querySelector('#menu');
        //   menuContainer.innerHTML = '';
        //   if (result && result.response) {
        //     const items = result.response;
        //     for (const item of items) {
        //       new MenuItem(menuContainer, item.name, item._id);
        //     }
        //   }
        // }



         onSubmitAction(){
          event.preventDefault();
          if (this.nameHolder.value.trim() == '' || this.emailHolder.value.trim() == ''){
            return;
          }
          this.nameElem.classList.add("inactive");
          console.log("creating category categoryScreen");
          this.categoryScreen = new CategoryScreen(this.nameHolder.value, this.emailHolder.value);
        }
      }
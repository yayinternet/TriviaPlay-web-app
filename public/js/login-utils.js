// ***NOTE:***
// You should create your own client ID via these instructions:
// https://developers.google.com/identity/sign-in/web/devconsole-project
// ***This client ID WILL BE DELETED by the end of the quarter, so please
// create your own!!!***
const CLIENT_ID = '285198512418-ekjr12rdggi140n1uk04rhv3l6jd9ino.apps.googleusercontent.com';

class LoginUtils {
  static async getSignedInUser() {
    const auth2 = gapi.auth2.getAuthInstance();
    const loggedIn = auth2.isSignedIn.get();
    let result = {
      loggedIn: loggedIn
    };
    if (loggedIn) {
      const user = auth2.currentUser.get();
      const profile = user.getBasicProfile();
      result = {
        loggedIn: loggedIn,
        idToken: user.getAuthResponse().id_token,
        fullName: profile.getName(),
        firstName: profile.getGivenName(),
        lastName: profile.getFamilyName(),
        email: profile.getEmail()
      };
    }
    return result;
  }

  // Must be called before other Google API calls.
  static async initialize() {
    await new Promise((resolve) => {
      gapi.load('client:auth2', () => {
        resolve();
      });
    });
    await gapi.client.init({ client_id: CLIENT_ID, scope: 'profile' });
  }
}

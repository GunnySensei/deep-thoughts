import decode from "jwt-decode";

class AuthService {
  //retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  //check if user still logged in
  loggedIn() {
    //checks if saved token && valid
    const token = this.getToken();
    //use type conversion to check if token is NOT undefined and token is NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  //check token expiration status
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  getToken() {
    //retrieve token from localStorage
    return localStorage.getItem("id_token");
  }

  //set token to localStorage and reload page to homepage
  login(idToken) {
    //save user token
    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }

  logout() {
    //clear token from localStorage and force logout with reload
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();

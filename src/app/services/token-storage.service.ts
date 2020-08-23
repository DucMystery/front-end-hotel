import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_AVATAR ='user-avatar';
const LOGGED_STATUS='logged-status';
const IMAGES_LIST = 'image-list';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }
  public saveUserAvatar(urlAvatar: string){
    window.sessionStorage.removeItem(USER_AVATAR);
    window.sessionStorage.setItem(USER_AVATAR,urlAvatar);
  }
  public saveStatusWhenUserLogged(status: string) {
    window.sessionStorage.removeItem((LOGGED_STATUS));
    window.sessionStorage.setItem(LOGGED_STATUS,status);
  }

  public getUserAvartar(): string {
    return sessionStorage.getItem(USER_AVATAR);
  }

  public getStatusLoggedOrLogout() : boolean {
    if(sessionStorage.getItem(LOGGED_STATUS) === 'logged'){
      return true;
    } else {
      return false;
    }
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }


  public saveUserId(id: string) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, id);
  }
  public getUserId() {
    //sau thu bo Json parse xem chuong trinh co chay khong
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}

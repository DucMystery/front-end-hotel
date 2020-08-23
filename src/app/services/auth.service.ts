import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<String>;
  public currentUser:Observable<String>;
  update = new EventEmitter<string>();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<String>(localStorage.getItem('auth-token'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): String {
    return this.currentUserSubject.value;
  }

  login(credentials): Observable<any> {
    return this.http.post(environment.urlAPI + 'api/customers/login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user: any): Observable<any> {
    return this.http.post(environment.urlAPI + 'api/customers/register', user);
  }
  logout(){
    return this.http.get(environment.urlAPI+'logout');
  }

  findUserById(id : number) : Observable<any> {
    return this.http.get(environment.urlAPI+'api/customers/'+id+'/details')
  }
}

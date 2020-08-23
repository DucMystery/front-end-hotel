import { Component, OnInit } from '@angular/core';
import {IUser} from '../../models/iuser';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMess = '';
  roles: string[] = [];
  account: IUser;
  myGroup: FormGroup;
  returnUrl: string;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams[this.returnUrl] || '/';

  }

  onSubmit() {
    this.authService.login(this.form)
      .subscribe(
        data => {
          // login successful so redirect to return url
          this.router.navigateByUrl( this.returnUrl);
          this.tokenStorage.saveToken(data.accessToken);
          console.log(data.accessToken);
          this.tokenStorage.saveUserId(data.id);
          console.log(data);
          this.tokenStorage.saveStatusWhenUserLogged('logged');
          this.authService.findUserById(data.id).subscribe(dataAccount => {
            this.tokenStorage.saveUserAvatar(dataAccount.avatar);
            this.roles = dataAccount.roles;
          });
          this.isLoginFailed = false;
          this.isLoggedIn = true;
        },
        error => {
          // login failed so display error
          this.errorMess = error.error.message;
          this.isLoginFailed = true;
        });
  }

}

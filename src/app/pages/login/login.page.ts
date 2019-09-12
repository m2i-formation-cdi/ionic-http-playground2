import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user = {
    name: '',
    login: '',
    pass: ''
  }

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  validate(){
    this.authService.login(this.user);
  }

}

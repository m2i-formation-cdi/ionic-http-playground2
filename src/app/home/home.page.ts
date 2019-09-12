import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private url: string = 'https://randomuser.me/api';

  public userList: Array<any> = [];

  private loadingMode = {
    'REPLACE': 0,
    'BEFORE': 1,
    'AFTER': 2
  };

  constructor(private http: HttpClient, private navCtrl: NavController) {
    this.loadUsers(this.loadingMode.REPLACE, null);
  }

  private loadUsers(mode, callback){

    let queryParameters = new HttpParams()
      .set('results', '50').set('nat', 'fr,gb')
      .set('gender', 'male').set('seed', '123456');

    this.http.get(this.url, {params: queryParameters}).subscribe(
      (response: any)=> {

        console.log(response);
        switch(mode){
          case this.loadingMode.REPLACE:
            this.userList = response.results;
            break;
          case this.loadingMode.BEFORE:
            this.userList = response.results.concat(this.userList);
            break;
          case this.loadingMode.AFTER:
            this.userList = this.userList.concat(response.results);
            break;
        }

        if(callback){
          callback();
        }
        
      }
    );
  }

  public doRefresh(even){
    this.loadUsers(this.loadingMode.BEFORE, 
      ()=> even.target.complete());

    //even.target.complete();
  }

  public loadMore(even){
    this.loadUsers(this.loadingMode.AFTER,
      ()=> even.target.complete());
    //even.target.complete();
  }

  public showDetails(user){
    console.log(user);

    const extras: NavigationExtras = {
      state: {
        user: user
      }
    };
    this.navCtrl.navigateForward('/user-details', extras);
  }

}

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private collectionName = "user";

  public authenticationState = new BehaviorSubject(false);

  constructor( private storage: Storage) { }

  public login(credentials){
    this.storage.set(this.collectionName, credentials)
      .then( () => this.authenticationState.next(true) );
  }

  public logout(){
    this.storage.remove(this.collectionName)
      .then( () => this.authenticationState.next(false));
  }

  public getUser(){
    return this.storage.get(this.collectionName);
  }

  public isLogged(){
    return this.authenticationState.value;
  }
}

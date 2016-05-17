import { Injectable } from 'angular2/core';
import {RequestOptions, Headers, Http} from 'angular2/http';
import 'rxjs/Rx';
import { Hero } from './hero';

@Injectable()
export class HeroService {
  baseUrl : string;
  constructor(private _http:Http) {
    this.baseUrl = 'http://localhost:3000';
  }

  getHeroes() {
    return this._http.get(`${this.baseUrl}/api/v1/hero`).map(res => res.json()).toPromise();
  }

  getHero(id:number) {
    return this._http.get(`${this.baseUrl}/api/v1/hero/${id}`).map(res => res.json()).toPromise();
  }

  deleteHero(id:number) {
    return this._http.delete(`${this.baseUrl}/api/v1/hero/${id}`).map(res => res.json()).toPromise();
  }

  saveHero(hero:Hero) {
    let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    let options = new RequestOptions({headers: headers});
    if (hero.id == -1){
      delete hero.id;
      return this._http.post(`${this.baseUrl}/api/v1/hero`, JSON.stringify(hero), options).map(res => res.json()).toPromise();
    }
    else {
      return this._http.put(`${this.baseUrl}/api/v1/hero/${hero.id}`, JSON.stringify(hero), options).map(res => res.json()).toPromise();
    }

  }
}

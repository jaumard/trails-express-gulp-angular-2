import { Injectable } from 'angular2/core';
import {RequestOptions, Headers, Http} from 'angular2/http';
import 'rxjs/Rx';
import { Hero } from './hero';

@Injectable()
export class HeroService {

  constructor(private _http:Http) {
  }

  getHeroes() {
    return this._http.get('http://localhost:3000/api/v1/hero').map(res => res.json()).toPromise();
  }

  getHero(id:number) {
    return this._http.get('http://localhost:3000/api/v1/hero/' + id).map(res => res.json()).toPromise();
  }

  deleteHero(id:number) {
    return this._http.delete('http://localhost:3000/api/v1/hero/' + id).map(res => res.json()).toPromise();
  }

  saveHero(hero:Hero) {
    let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    let options = new RequestOptions({headers: headers});
    if (hero.id == -1) delete hero.id;

    return this._http.post('http://localhost:3000/api/v1/hero', JSON.stringify(hero), options).map(res => res.json()).toPromise();
  }
}

import { Injectable } from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

  constructor(private _http: Http) {}

  getHeroes() {
    return this._http.get('http://localhost:3000/api/v1/hero').map(res => res.json()).toPromise();
  }

  getHero(id: number) {
    return this._http.get('http://localhost:3000/api/v1/hero/'+id).map(res => res.json()).toPromise();
  }
}

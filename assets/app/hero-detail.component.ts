import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero:Hero;

  constructor(private _heroService:HeroService,
              private _routeParams:RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    if (id && id != -1) {
      this._heroService.getHero(id)
        .then(hero => this.hero = hero);
    }
    else {
      this.hero = {id: -1, name: ''};
    }

  }

  goBack() {
    window.history.back();
  }

  saveHero() {
    this._heroService.saveHero(this.hero)
      .then(hero => this.goBack());
  }
}

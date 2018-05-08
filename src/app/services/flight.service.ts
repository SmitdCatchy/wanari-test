import { Injectable } from '@angular/core';

import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

import {Routes, Server} from "../utils/ServerRoutes";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor( private userService: UserService, private http: Http ) {}

  getArrivalsFlights(airport: string, begin: number, end: number): Observable<any> {
    return this.http.get("https://" + this.userService.user.username + ":" + this.userService.user.password + "@opensky-network.org/api/flights/arrival?airport=" + airport + "&begin=" + begin + "&end=" + end)
      .map(res => res.json());
  }
  getDeparturesFlights(airport: string, begin: number, end: number): Observable<any> {
    return this.http.get("https://" + this.userService.user.username + ":" + this.userService.user.password + "@opensky-network.org/api/flights/departure?airport=" + airport + "&begin=" + begin + "&end=" + end)
      .map(res => res.json());
  }

  getOrigin(icao24: string){
    return this.http.get("https://" + this.userService.user.username + ":" + this.userService.user.password + "@opensky-network.org/api/states/all?icao24=" + icao24)
      .map(res => res.json());
  }
}

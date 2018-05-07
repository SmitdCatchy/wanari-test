import { Injectable } from '@angular/core';

import {Http} from "@angular/http";
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
      .map(res => res.json())
  }
  getDeparturesFlights(airport: string, begin: number, end: number): Observable<any> {
    return this.http.get("https://" + this.userService.user.username + ":" + this.userService.user.password + "@opensky-network.org/api/flights/departure?airport=" + airport + "&begin=" + begin + "&end=" + end)
      .map(res => res.json())
  }

}

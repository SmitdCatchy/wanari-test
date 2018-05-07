import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

import { Airport } from '../../models/Airport';

import {FlightService} from "../../services/flight.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService, private flightService: FlightService, private router: Router) { }

  airports: Airport[] = [];

  modal = "";
  airport: Airport;
  arrivals: any[] = [];
  departures: any[] = [];
  arrivalsDuration = 8;
  departuresDuration = 8;

  ngOnInit() {
    if(this.userService.user.role === "GUEST") this.router.navigate(['']);
    this.airports.push( new Airport("Amsterdam", "EHAM"));
    this.airports.push( new Airport("Atlanta", "KATL"));
    this.airports.push( new Airport("Chicago", "KORD"));
    this.airports.push( new Airport("Dubai", "OMDB"));
    this.airports.push( new Airport("Hong Kong", "VHHH"));
    this.airports.push( new Airport("London", "EGLL"));
    this.airports.push( new Airport("Los Angeles", "KLAX"));
    this.airports.push( new Airport("Paris", "LFPG"));
    this.airports.push( new Airport("Shanghai", "ZSPD"));
    this.airports.push( new Airport("Tokyo", "RJTT"));
    this.airport = this.airports[0];
    console.log(this.airport);
  }

  getEpoch(): number{
    let d = new Date();
    return Math.round(d.getTime() / 1000);
  }
  getEpochMinus( h: number ): number{
    let d = new Date();
    d.setTime( d.getTime() - ( h * 60 * 60 * 1000 ));
    return Math.round( d.getTime() / 1000);
  }

  formatDate(epoch: number): string{
    let date = new Date(epoch*1000);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  }

  setAirport(a: Airport){
    this.airport = a;

    this.getArrivals(this.arrivalsDuration);
    this.getDepartures(this.departuresDuration);

    this.modal = "on";
  }

  closeModal(){
    this.modal = "off";
    this.arrivalsDuration = 8;
    this.departuresDuration = 8;
  }

  getArrivals(value: number){
    this.arrivals = [];
    this.arrivalsDuration = value;
    this.flightService.getArrivalsFlights(this.airport.icao,this.getEpochMinus(value), this.getEpoch()).subscribe(results => {
      this.arrivals = results;
    });
  }
  getDepartures(value: number){
    this.departures = [];
    this.departuresDuration = value;
    this.flightService.getDeparturesFlights(this.airport.icao,this.getEpochMinus(value), this.getEpoch()).subscribe(results => {
      this.departures = results;
    });
  }

}

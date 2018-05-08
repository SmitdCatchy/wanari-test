import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { Airport } from '../../models/Airport';

import { FlightService } from "../../services/flight.service";

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
  arrivalsState = 0;
  departuresState = 0;

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
    let month:any = date.getMonth() + 1;
    if(month < 10) month = "0"+ month;
    let day:any = date.getDate();
    if(day < 10) day = "0"+ day;
    let hours:any = date.getHours();
    if(hours < 10) hours = "0"+ hours;
    let minutes:any = date.getMinutes();
    if(minutes < 10) minutes = "0"+ minutes;
    let seconds:any = date.getSeconds();
    if(seconds < 10) seconds = "0"+ seconds;

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
    this.arrivalsState = 0;
    this.flightService.getArrivalsFlights(this.airport.icao,this.getEpochMinus(value), this.getEpoch()).subscribe(
      results => {

        let promises = [];
        for(const res of results){
          let promise = this.flightService.getOrigin(res.icao24);
          promises.push(promise);
        }
        Observable.forkJoin(promises).subscribe(origins =>{
          for(let i = 0; i < results.length; i++){
            let origin =  "Unknown";
            if( origins[i].states !== null ){
              origin = origins[i].states[0][2];
            }
            this.arrivals.push({
              "icao24"    : results[i].icao24,
              "callsign"  : results[i].callsign,
              "firstSeen" : this.formatDate(results[i].firstSeen),
              "lastSeen"  : this.formatDate(results[i].lastSeen),
              "origin"    : origin
            });
          }
          this.arrivalsState = 1;
        });
      },
      error =>{
        this.arrivalsState = -1;
      }
    );
  }
  getDepartures(value: number){
    this.departures = [];
    this.departuresDuration = value;
    this.departuresState = 0;
    this.flightService.getDeparturesFlights(this.airport.icao,this.getEpochMinus(value), this.getEpoch()).subscribe(
      results => {

        let promises = [];
        for(const res of results){
          let promise = this.flightService.getOrigin(res.icao24);
          promises.push(promise);
        }
        Observable.forkJoin(promises).subscribe(origins =>{
          for(let i = 0; i < results.length; i++){
            let origin =  "Unknown";
            if( origins[i].states !== null ){
              origin = origins[i].states[0][2];
            }
            this.departures.push({
              "icao24"    : results[i].icao24,
              "callsign"  : results[i].callsign,
              "firstSeen" : this.formatDate(results[i].firstSeen),
              "lastSeen"  : this.formatDate(results[i].lastSeen),
              "origin"    : origin
            });
          }
          this.departuresState = 1;
        });
      },
      error =>{
        this.departuresState = -1;
      }
    );
  }

}

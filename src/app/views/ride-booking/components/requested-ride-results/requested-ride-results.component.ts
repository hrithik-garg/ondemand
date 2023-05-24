import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { OngoingRidesComponent } from '../ongoing-rides/ongoing-rides.component';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from 'src/app/components/description/description.component';
import * as moment from 'moment';

@Component({
  selector: 'app-requested-ride-results',
  templateUrl: './requested-ride-results.component.html',
  styleUrls: ['./requested-ride-results.component.scss'],
  standalone: true,
  imports: [ButtonComponent, HeadingComponent, OngoingRidesComponent, CommonModule, DescriptionComponent]
})
export class RequestedRideResultsComponent implements OnInit {
 
  @Input() startingStop!: string;
  @Input() destinationStop!: string;
  @Input() date!: string;
  @Input() time!: string;
  @Input() seats!: string;
  @Input() isWalkerOrWheelChair!: string;

  price:string = "€9.75";
  requiredStops:string =  "3 stops";
  startingTime:string = " 11:40 AM";
  destinationTime:string = " 1:30 PM";
  isOngoingRideSelected:boolean = false;

  ngOnInit(): void {
    this.setValues();
  }
  setValues(){
    this.date = moment(this.date).format('DD MMM YYYY');
    this.time = moment(this.time).format('hh:mm A');
  }
  showOngoingRides(){
    this.isOngoingRideSelected = true;
  }
  showAvailableRides(){
    this.isOngoingRideSelected = false;
  }
}

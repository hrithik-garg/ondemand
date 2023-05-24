import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { DescriptionComponent } from 'src/app/components/description/description.component';

interface Ride {
  startingAddress: string;
  destinationAddress: string;
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'app-ongoing-rides',
  templateUrl: './ongoing-rides.component.html',
  styleUrls: ['./ongoing-rides.component.scss'],
  standalone: true,
  imports: [CommonModule, HeadingComponent, ButtonComponent, DescriptionComponent]
})
export class OngoingRidesComponent {

  ongoingRides: Ride[] = [{ startingAddress: "Nord Am Alberts..", destinationAddress: "Bahnhof, Halte..", startTime: "11:00 AM", endTime: "1:00 PM" },
                          { startingAddress: "Nord Am Alberts..", destinationAddress: "Bahnhof, Halte..", startTime: "11:00 AM", endTime: "1:00 PM" }]
}

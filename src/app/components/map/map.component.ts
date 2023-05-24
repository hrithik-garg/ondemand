import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import mapStyleJsonData from 'src/assets/map-style-json/map-style.json';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MapComponent implements OnInit{

    @ViewChild('gmap', {static: false}) gmapElement:any ;
    map!: google.maps.Map;
    mapJsonData:any;

    constructor(private mapService: MapService){}

    ngOnInit(): void {
      let latlng = new google.maps.LatLng(51.1657, 10.4515);
      let mapProp = {
          zoom: 6,
          center: latlng,
          clickableIcons: false,
          draggableCursor: 'arrow',
          draggingCursor: 'arrow',
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
              position: google.maps.ControlPosition.LEFT_TOP,
          },
          zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_CENTER,
          },
          scaleControl: true,
          streetViewControl: true,
          streetViewControlOptions: {
              position: google.maps.ControlPosition.LEFT_BOTTOM,
          },
          fullscreenControl: true,
          fullscreenControlOptions: {
              position: google.maps.ControlPosition.LEFT_BOTTOM,
          },
          
        };
        setTimeout(() => {
            this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
            this.mapJsonData = mapStyleJsonData;
            const styledMapType = new google.maps.StyledMapType(this.mapJsonData, { name: "Styled Map" });
            //this code in working
            // this.map.mapTypes.set("styled_map", styledMapType);
            // this.map.setMapTypeId("styled_map");
            this.mapService.setMap(this.map);
        }, 500);
    }
}

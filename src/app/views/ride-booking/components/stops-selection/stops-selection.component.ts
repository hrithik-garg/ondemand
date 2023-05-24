import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { DescriptionComponent } from 'src/app/components/description/description.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { MatInputComponent } from 'src/app/components/mat-input/mat-input.component';
import { OngoingRidesComponent } from '../ongoing-rides/ongoing-rides.component';
import { TranslateModule } from '@ngx-translate/core';
import { LocationInputComponent } from 'src/app/components/location-input/location-input.component';
import { RequestedRideResultsComponent } from '../requested-ride-results/requested-ride-results.component';
import { MapService } from 'src/app/services/map.service';
import { CalendarModule } from 'primeng/calendar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PCalendarComponent } from 'src/app/components/p-calendar/p-calendar.component';
import { CommonService } from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { getNearByMatchpoints, saveRideRequest } from 'src/app/constants/apiConstants';
import { NearByMatchpointsInteface } from 'src/app/constants/interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { RadioButtonComponent } from 'src/app/components/radio-button/radio-button.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import * as moment from 'moment';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
const _ = require('lodash');

@Component({
  selector: 'app-stops-selection',
  templateUrl: './stops-selection.component.html',
  styleUrls: ['./stops-selection.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, SelectButtonModule, ButtonComponent, HeadingComponent, InputComponent, DescriptionComponent, OngoingRidesComponent, TranslateModule, LocationInputComponent, CalendarModule, MatInputModule, MatInputComponent, MatCheckboxModule, RequestedRideResultsComponent, CheckboxModule, ReactiveFormsModule, PCalendarComponent, RadioButtonComponent, CheckboxComponent]
})
export class StopsSelectionComponent implements OnInit {

  @ViewChild('showRideRequestResponse', { static: true }) showRideRequestResponse!: ElementRef;
  selectedView: any;
  mpWayptsMarkers: any;
  isStartingStopsAreSelected = false;
  isDestinationStopsAreSelected = false;
  isRequirementsSelected = false;
  selectedStop!: any;
  selectedStartingStop!: any;
  selectedDestinationStop!: any;
  selectedStopList: any;
  viewOptions = [{ name: 'New ride request', code: '1' }, { name: 'Ongoing rides', code: '2' }];
  startDate = new Date(1990, 0, 1);
  map: any;
  isStopsAreSelected: boolean = false;
  wheelchairchecked!: boolean;
  walkerchecked!: boolean;
  requirementForm!: FormGroup;
  communityId!: number;
  latitude!: number;
  longitude!: number;
  pStartPolyline!: any;
  pDestinationPolyLine!: any;
  pStartMarker!: any;
  pDestinationMarker!: any;
  pStartingStopsMarker!: any;
  pDestinationStopMarker!: any;
  selectedAddress!: string;
  communityData!: any;
  storedStartingLocation!: any;
  storedDestLocation!: any;
  currentSelectedStop!: string;
  isMatchPointsAvailable: boolean = false;
  startingLocationMatchpointList: any = [];
  destinationLocationMatchpointList: any = [];
  nearByMatchpoints!: NearByMatchpointsInteface[];
  defaultDate:any = new Date();
  requestedData:any;
  responseData:any;
  ref!: DynamicDialogRef;
  isWalkerOrWheelChair!: string;

  constructor(private formBuilder: FormBuilder,
    private mapService: MapService,
    private commonService: CommonService,
    private dialogService: DialogService,
    private httpService: HttpService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.setValues();
    this.createForm();
    this.getMapControl();
    this.commonService.isFindRideSelected.subscribe((res) => {
      this.isStopsAreSelected = res
      this.createForm();
    })
    this.commonService.selectedCommunity.subscribe((res) => {
      this.setValues();
    })
  }

  onEditLocation(value: any) {
    this.isRequirementsSelected = false;
    if (value === 'start') {
      this.selectedAddress = 'Start';
      this.isStartingStopsAreSelected = true;
      this.setMarker(this.pStartMarker);
      this.setMarker(this.pStartingStopsMarker);
      this.setMarker(this.pStartPolyline);
      this.selectedStop = this.selectedStartingStop;
      this.clearMarkerAndPolyline(this.pDestinationStopMarker);
      this.clearMarkerAndPolyline(this.pDestinationMarker);
      this.clearMarkerAndPolyline(this.pDestinationPolyLine);
      this.storedDestLocation = null;
      this.nearByMatchpoints = this.startingLocationMatchpointList;
      if (this.selectedDestinationStop) {
        this.storedDestLocation = this.nearByMatchpoints.find((stopp: any) => stopp.LocationId === this.selectedDestinationStop.LocationId);
      }
    }
    else {
      this.selectedAddress = 'Dest';
      this.isDestinationStopsAreSelected = true;
      this.setMarker(this.pDestinationMarker);
      this.setMarker(this.pDestinationStopMarker);
      this.setMarker(this.pDestinationPolyLine);
      this.selectedStop = this.selectedDestinationStop;
      this.clearMarkerAndPolyline(this.pStartPolyline);
      this.clearMarkerAndPolyline(this.pStartMarker);
      this.clearMarkerAndPolyline(this.pStartingStopsMarker);
      this.storedStartingLocation = null;
      this.nearByMatchpoints = this.destinationLocationMatchpointList;
      if (this.selectedStartingStop) {
        this.storedStartingLocation = this.nearByMatchpoints.find((stopp: any) => stopp.LocationId === this.selectedStartingStop.LocationId);
      }
    }
  }

  setValues() {
    this.communityData = this.storageService.getValueFromLocalStorage('communityData');
    this.communityId = this.communityData.Id;
  }

  createForm() {
    this.requirementForm = this.formBuilder.group({
      start: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      seats: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]]
    })
    this.selectedView = '1';
    this.f['date'].setValue(this.defaultDate);
    this.f['time'].setValue(this.defaultDate);
    this.isStartingStopsAreSelected = false;
    this.isDestinationStopsAreSelected = false;
    this.isRequirementsSelected = false;
  }

  getMapControl() {
    this.mapService.getMap().subscribe((map: google.maps.Map) => {
      this.map = map;
    });
  }

  get f() { return this.requirementForm.controls }

  clearMarkerAndPolyline(marker : any){
    if(marker){
      marker.setMap(null);
    }
  }

  setMarker(marker: any){
    if(marker){
      marker.setMap(this.map);
    }
  }

  createPolylineOnToggle(stop: any) {
    this.selectedStop = stop;
    if (this.selectedAddress === "Start") {
      this.selectedStartingStop = stop;
      this.addStartingStopsMarker(stop);
    }
    else {
      this.selectedDestinationStop = stop;
      this.addDestinationStopsMarker(stop);
    }
  }

  createPolyLine(stop: any, color: string, windowInfo: any) {
    let htmlM = '<div style="background-color:' + color + ';padding:12px 16px 12px 16px;line-height:24px;overflow:hidden;white-space:nowrap;font-weight:500;font-size:16px;color:white;">' + stop.AddressLine + '</div>';
    let infowindow = new google.maps.InfoWindow;
    infowindow.setContent(htmlM);
    infowindow.open(this.map, windowInfo);
    const lineSymbol = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 4,
      strokeColor: color
    };
    const polylineOptions = {
      path: [
        { lat: this.latitude, lng: this.longitude },
        { lat: stop.Latitude, lng: stop.Longitude }
      ],
      strokeOpacity: 0,
      icons: [
        {
          icon: lineSymbol,
          offset: '0%',
          repeat: '15px',
        }
      ]
    } as google.maps.PolylineOptions;
    return this.mapService.addPolyline(this.map, polylineOptions);
  }

  addStartingStopsMarker(stop: any) {
    this.clearMarkerAndPolyline(this.pStartPolyline);
    this.clearMarkerAndPolyline(this.pStartingStopsMarker);
    this.pStartingStopsMarker = this.addMarker(stop?.Latitude, stop?.Longitude, './assets/img/star_loc_marker.png');
    this.pStartPolyline = this.createPolyLine(stop, '#03B029', this.pStartingStopsMarker);
  }

  addDestinationStopsMarker(stop: any) {
    this.clearMarkerAndPolyline(this.pDestinationStopMarker);
    this.clearMarkerAndPolyline(this.pDestinationPolyLine);
    this.pDestinationStopMarker = this.addMarker(stop?.Latitude, stop?.Longitude, './assets/img/dest_loc_marker.png');
    this.pDestinationPolyLine = this.createPolyLine(stop, '#DC2525', this.pDestinationStopMarker);
  }

  addMarker(latitude: number, longitude: number, icon: any) {
    let markerOptions: google.maps.MarkerOptions = {
      position: new google.maps.LatLng(latitude, longitude), zIndex: 1, icon: icon
    };
    this.mapService.addFocusOnMap(this.map, markerOptions, 16);    
    return this.mapService.addMarker(this.map, markerOptions);
  }

  getAddressForStart(address: any, value: string) {
    this.f['start'].setValue(address.formatted_address)
    this.selectedAddress = value;
    this.clearMarkerAndPolyline(this.pStartMarker);
    this.clearMarkerAndPolyline(this.pDestinationStopMarker);
    this.clearMarkerAndPolyline(this.pDestinationMarker);
    this.clearMarkerAndPolyline(this.pDestinationPolyLine);
    this.isStartingStopsAreSelected = true;
    this.latitude = address?.geometry?.location.lat();
    this.longitude = address?.geometry?.location.lng();
    let icon = { url: './assets/img/location.png', scaledSize: new google.maps.Size(50, 50) }
    this.pStartMarker = this.addMarker(this.latitude, this.longitude, icon);
    this.commonService.notifyIsProcessStarted(true);
    this.getNearByMatchpoints();
  }

  getAddressForDestination(address: any, value: string) {
    this.selectedAddress = value;
    this.f['destination'].setValue(address.formatted_address)
    this.clearMarkerAndPolyline(this.pStartMarker);
    this.clearMarkerAndPolyline(this.pStartingStopsMarker);
    this.clearMarkerAndPolyline(this.pStartPolyline);
    this.clearMarkerAndPolyline(this.pDestinationMarker);
    this.isDestinationStopsAreSelected = true;
    this.latitude = address?.geometry?.location.lat();
    this.longitude = address?.geometry?.location.lng();
    let icon = { url: './assets/img/location.png', scaledSize: new google.maps.Size(50, 50) }
    this.pDestinationMarker = this.addMarker(this.latitude, this.longitude, icon);
    this.commonService.notifyIsProcessStarted(true);
    this.getNearByMatchpoints();
  }

  saveRideRequest() {
    if(this.f['seats'].invalid){
      this.f['seats'].markAsTouched();
      return;
    }
    let pickupTime = moment(this.f['date'].value).format('YYYY-MM-DD') + "T" + moment(this.f['time'].value).format('HH:mm:ss') + "Z";          
    let body = {
      "rideRequestId": 0,
      "communityId": this.communityId,
      "numPassengers": this.f['seats'].value,
      "pickupTime": pickupTime,
      "startAddressLine": this.selectedStartingStop.AddressLine,
      "startCity": this.selectedStartingStop.City,
      "startDependentCity": this.selectedStartingStop.DependentCity,
      "startState": this.selectedStartingStop.State,
      "startPostalCode": this.selectedStartingStop.PostalCode,
      "startCountry": this.selectedStartingStop.CountryRegion,
      "startLatitude": this.selectedStartingStop.Latitude,
      "startLongitude": this.selectedStartingStop.Longitude,
      "startSelectedLocationId": this.selectedStartingStop.LocationId,
      "destAddressLine": this.selectedDestinationStop.AddressLine,
      "destCity": this.selectedDestinationStop.City,
      "destDependentCity": this.selectedDestinationStop.DependentCity,
      "destState": this.selectedDestinationStop.State,
      "destPostalCode": this.selectedDestinationStop.PostalCode,
      "destCountry": this.selectedDestinationStop.CountryRegion,
      "destLatitude": this.selectedDestinationStop.Latitude,
      "destLongitude": this.selectedDestinationStop.Longitude,
      "destSelectedLocationId": this.selectedDestinationStop.LocationId
    }
    this.requestedData = body;
    const token = this.storageService.getValueFromLocalStorage('MRAUid');      
    this.httpService.postRequest(saveRideRequest, body, undefined, undefined, [{key: "token", value: token}]).subscribe((data) =>{
      if(data.Status === "Success"){
        this.responseData = data.Payload;
        this.isStopsAreSelected = true;
      }
    })      
  }

  onSelectDestination(event: any) {
    this.isRequirementsSelected = this.isStartingStopsAreSelected && this.isDestinationStopsAreSelected;
    this.clearMarkerAndPolyline(this.pDestinationMarker);
    this.clearMarkerAndPolyline(this.pDestinationPolyLine);
    this.clearMarkerAndPolyline(this.pStartMarker);
    this.clearMarkerAndPolyline(this.pStartPolyline);
    this.setMarker(this.pStartingStopsMarker);
    this.setMarker(this.pDestinationStopMarker);
  }

  getNearByMatchpoints() {
    const token = this.storageService.getValueFromLocalStorage('MRAUid');
    let urlParams = this.communityId + "/" + this.latitude + "/" + this.longitude;
    this.nearByMatchpoints = [];
    this.httpService.getRequest(getNearByMatchpoints + urlParams, undefined, [{ key: "token", value: token }]).subscribe((data) => {
      this.isMatchPointsAvailable = true;
      if (data.Status === "Success") {
        if(!data.Payload.length){
          if(this.selectedAddress === "Start"){
            this.selectedStartingStop = null;
            this.startingLocationMatchpointList = [];
            this.clearMarkerAndPolyline(this.pStartingStopsMarker);
            this.clearMarkerAndPolyline(this.pStartPolyline);
            this.pStartPolyline = null;
            this.pStartingStopsMarker = null;
          }
          else{
            this.selectedDestinationStop = null;
            this.destinationLocationMatchpointList = [];
            this.clearMarkerAndPolyline(this.pDestinationStopMarker);
            this.clearMarkerAndPolyline(this.pDestinationPolyLine);
            this.pDestinationStopMarker = null;
            this.pDestinationPolyLine = null;
          }
        }
        else{
          this.nearByMatchpoints = data['Payload'];
          let stopsList = [...this.nearByMatchpoints];
          if (this.selectedAddress === "Start") {
            this.startingLocationMatchpointList = this.nearByMatchpoints;
            if (this.selectedDestinationStop) {
              this.storedDestLocation = this.nearByMatchpoints.find((stopp: any) => stopp.LocationId === this.selectedDestinationStop.LocationId);
              _.remove(stopsList, (stopp: any) => stopp.LocationId === this.selectedDestinationStop.LocationId);
            }
            this.selectedStartingStop = stopsList[0];
            this.selectedStop = this.selectedStartingStop;
            this.addStartingStopsMarker(this.selectedStop);
          }
          else {
            this.destinationLocationMatchpointList = this.nearByMatchpoints;
            if (this.selectedStartingStop) {
              this.storedStartingLocation = this.nearByMatchpoints.find((stopp: any) => stopp.LocationId === this.selectedStartingStop.LocationId);
              _.remove(stopsList, (stopp: any) => stopp.LocationId === this.selectedStartingStop.LocationId);
            }
            this.selectedDestinationStop = stopsList[0];
            this.selectedStop = this.selectedDestinationStop;
            this.addDestinationStopsMarker(this.selectedStop);
          }
        }
      }  
    }
  )}
  editRide(){
    this.isStopsAreSelected = false;
  }
  //  this code is used for testing purpose by client side after testing we will remove this code 
  openModalToShowResponse(){
    this.ref = this.dialogService.open(ModalComponent, {
      data: {
        contentTemplate: this.showRideRequestResponse,
        modalContentType: 'HtmlContent',
        firstBtnName: '',
        secondBtnName: '',
      },
      header: "Ride Request Data",
      height: '30rem',
      styleClass: 'custom-header'
    });
    this.ref.onClose.subscribe((value: boolean) => {
      if (value) {
        this.ref.close();
      }
    });
  }
  changeRequirement(event: any){
    this.isWalkerOrWheelChair = event;
  }
}
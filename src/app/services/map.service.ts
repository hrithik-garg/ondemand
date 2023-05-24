import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    map!: google.maps.Map;
    mapSubject: any = new BehaviorSubject<any>({});
    assetIdSubject: any = new BehaviorSubject<any>('');
    infoWindowArray = [];
    private mpWayptsMarkers: google.maps.Marker[] = [];
    constructor() { }

    setMap(map: any) {
        this.mapSubject.next(map);
    }
    getMap() {
        return this.mapSubject.asObservable();
    }

    addMarker(map: google.maps.Map, markerOptions?: google.maps.MarkerOptions) {
        let marker = new google.maps.Marker(markerOptions);
        marker.setMap(map);
        return marker;
    }

    addFocusOnMap(map: google.maps.Map, markerOptions: google.maps.MarkerOptions, zoom: number) {
        let position = markerOptions.position;
        if (position) {
            map.panTo(position);
            map.setZoom(zoom);
        }
    }

    addPolyline(map: google.maps.Map, options: google.maps.PolylineOptions): google.maps.Polyline {
        let polyline = new google.maps.Polyline(options)
        polyline.setMap(map);
        return polyline;
    }
} 

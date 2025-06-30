import { NgForOf } from '@angular/common';
import { FactoryTarget } from '@angular/compiler';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MarkerClustererOptions } from '@angular/google-maps';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StatusInfoComponent } from '../status-info/status-info.component'; 
import { UserLocationService } from '../user-location/user-location.service'; 
import MarkerClusterer from '@google/markerclustererplus';
import { RouterModule } from '@angular/router';

interface CustomMarker extends google.maps.LatLngLiteral {
  isUser?: boolean;
}

interface ATMInfo {
  id: string;
  name: string;
}

interface GroupedMarker {
  lat: number;
  lng: number;
  atms: ATMInfo[];
  isUser?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GoogleMapsModule, NgForOf, MatDialogModule, RouterModule ],
  templateUrl: './map-interface-component.html',
  styleUrls: ['./map-interface-component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})


export class MapInterfaceComponent implements OnInit{
  @ViewChild(GoogleMap) mapRef!: GoogleMap;

  center: google.maps.LatLngLiteral = {lat:-24.6580, lng: 25.9077};
  markerLatLong: CustomMarker[] = [
    {lat:-24.6584, lng: 25.9039},
    {lat: -24.636866, lng: 25.845456},
    {lat: -24.6126, lng: 25.851},
    {lat: -24.62, lng: 25.89},
    {lat: -24.6273, lng: 25.8701}
  ];

  markerGroups: GroupedMarker[] = [
         {lat:-24.65, lng: 25.9062, atms:[
      { id: 'atm1', name: 'ATM 1' },
      { id: 'atm2', name: 'ATM 2'},
      { id: 'atm3', name: 'ATM 3'},
      { id: 'atm4', name: 'ATM 4'},
      { id: 'atm5', name: 'ATM 5' }
    ]}
  ];
  markers: google.maps.Marker[] = [];
  markerClustrer!: MarkerClusterer;
  individualMarker: google.maps.Marker[] = [];
  user!: CustomMarker

  constructor(private dialogueRef: MatDialog, private userLocationService: UserLocationService){}
  
   ngOnInit(): void {
    this.getUserLocation();
  }

  ngAfterViewInit(): void {
    this.loadMarkers();
  }

  openInfoWindow(marker: CustomMarker){
    this.dialogueRef.open(StatusInfoComponent, {
      panelClass: 'custom-dialog-panel',
      backdropClass: 'custom-dialog-backdrop',
      width: '50%',
      height: 'fit-content',
      autoFocus: false,
      data: {
        atmMarker: marker,
        userMarker:this.user
      }
    })
  }
   userIconPath = {
    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    scaledSize: new google.maps.Size(40, 40),
  };

iconPath = {
  url: 'assets/marker.png',
  scaledSize: new google.maps.Size(50, 70), 
  };

  // Load markers & clustering
loadMarkers(): void {
  this.markers.forEach(m => m.setMap(null));
  this.markers = [];

  const map = this.mapRef.googleMap;
  if (!map) return;

  // 1. Add individual ATM + user markers
  const atmMarkers = this.markerLatLong.map(atm => {
    const marker = new google.maps.Marker({
      position: atm,
      map,
      icon: atm.isUser ? this.userIconPath : this.iconPath,
      clickable: !atm.isUser  
    });

    marker.addListener('click', () => {
      this.openInfoWindow(atm);
    });

    this.markers.push(marker);
    return marker;
  });

  // 2. Add group markers
  this.markerGroups.forEach(group => {
    const groupMarker = new google.maps.Marker({
      position: { lat: group.lat, lng: group.lng },
      map,
      icon: this.iconPath,
      label: {
        text: `${group.atms.length}`,
        color: 'black',
        fontSize: '16px',
        fontWeight: 'bold'
      }
    });

    groupMarker.addListener('click', () => {

        this.individualMarker.forEach(marker => marker.setMap(null));
        this.individualMarker = [];

      const offset = 0.00006; // ~6m offset
      group.atms.forEach((atm, index) => {
        const angle = Math.PI + (index / (group.atms.length -10)) * Math.PI;
        const offsetLat = group.lat + Math.sin(angle) * offset;
        const offsetLng = group.lng + Math.cos(angle) * offset;

        const individualMarker = new google.maps.Marker({
          position: { lat: offsetLat, lng: offsetLng },
          map,
          icon: this.iconPath
        });

        individualMarker.addListener('click', () => {
          this.openInfoWindow({
            lat: offsetLat,
            lng: offsetLng,
            ...atm
          }, );
        });
        // Store reference for later removal
        this.individualMarker.push(individualMarker);
      

        this.markers.push(individualMarker);
      });
    });

    this.markers.push(groupMarker);
  });
}
  getUserLocation(): void{
    this.userLocationService.getPosition().then(pos=>{
    console.log(`Position: ${pos.lng} ${pos.lat}`);
    this.center= {lat: pos.lat, lng: pos.lng};

    const userMarker: CustomMarker = {
        lat: pos.lat,
        lng: pos.lng,
        isUser: true
      };

      this.user = userMarker;
      this.markerLatLong.push(userMarker);
      this.loadMarkers();
  }).catch(err=>
    console.log('Couldnt get locaation', err)
  )
  };


}

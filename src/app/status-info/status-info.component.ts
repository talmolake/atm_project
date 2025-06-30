import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReportLogComponent } from '../report-log/report-log.component';
import { RealTimeDataService } from '../real-time-data/real-time-data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserLocationService } from '../user-location/user-location.service';

@Component({
  selector: 'app-status-info',
  standalone: true,
  imports: [CommonModule, MatDialogModule, HttpClientModule ],
  templateUrl:'./status_info.component.html',
  styleUrl:'./status_info.component.css'
})  
export class StatusInfoComponent implements OnInit{
  record: any;
  atmMarker: any;
  markerDistance?: number;
  isOutOfRange = false;
  readonly MAX_DISTANCE_KM = 3;

  constructor(private dialogueRef: MatDialog, private dataService: RealTimeDataService, private userLocationService: UserLocationService,@Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    this.atmMarker = this.data.atmMarker;

    this.dataService.getRecords().subscribe({
      next:(data)=>{
        console.log('Fetched records:', data);
        this.record = data;
      },
      error: (err) => {
        console.error('Failed to fetch ATM data', err);
      }
    });

  this.userLocationService.getPosition().then(pos => {
      if (this.atmMarker?.lat != null && this.atmMarker?.lng != null) {
        this.markerDistance = this.getDistanceFromLatLngInKm(
          this.atmMarker.lat,
          this.atmMarker.lng,
          pos.lat,
          pos.lng
        );
        console.log('Calculated Distance:', this.markerDistance, 'km');

        
      if (this.markerDistance > this.MAX_DISTANCE_KM) {
        console.warn('ATM too far away. Info restricted.');
         this.isOutOfRange = true;
      }
      }
    }).catch(err => {
      console.error('Failed to get user location in modal:', err);
    });
  }
    
  isOpenReportWindowOpen = false;

    openReportWindow(){
      this.isOpenReportWindowOpen = true
      this.dialogueRef.open(ReportLogComponent, {
      panelClass: 'custom-dialog-panel',
      backdropClass: 'custom-dialog-backdrop',
      width: '50%',
      height: '62',
      autoFocus: false
    })
}
  close():void{
    this.dialogueRef.closeAll();
  }

 getDistanceFromLatLngInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 100) / 100;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  getDirections(lat: number, lng: number): void{
    const atmLat = this.data.atmMarker.lat;
    const atmLng = this.data.atmMarker.lng;

    this.userLocationService.getPosition().then(pos => {
      const origin = `${pos.lat}, ${pos.lng}`;
      const destination = `${atmLat},
                          ${atmLng}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
      window.open(url, '_blank');
    });
    }
}
  

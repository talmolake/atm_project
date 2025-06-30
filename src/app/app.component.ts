import { NgForOf } from '@angular/common';
import { FactoryTarget } from '@angular/compiler';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MarkerClustererOptions } from '@angular/google-maps';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StatusInfoComponent } from './status-info/status-info.component';
import { UserLocationService } from './user-location/user-location.service';
import MarkerClusterer from '@google/markerclustererplus';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GoogleMapsModule, MatDialogModule, RouterModule ],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})


export class AppComponent{


}

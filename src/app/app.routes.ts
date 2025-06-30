import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AppComponent } from './app.component';
import { MapInfoWindow } from '@angular/google-maps';
import { MapInterfaceComponent } from './map-interface/map-interface.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent },                    // fallback route
    {path: 'locator', component: MapInterfaceComponent}

];

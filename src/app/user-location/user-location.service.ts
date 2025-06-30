import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  constructor() { }

    getPosition(): Promise<any>
    {
      return new Promise ((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition((position) =>{
          resolve({
            lng: position.coords.longitude, lat: position.coords.latitude
          })
        },
          err =>{
            reject(err);
          });
        });
    }
}

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-grouped-markers',
  imports: [],
  template: `
    
  `,
  styles: ``
})
export class GroupedMarkersComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}

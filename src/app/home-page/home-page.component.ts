import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  standalone: true, 
  imports: [],
  templateUrl:'./home-page-component.html',
  styleUrl: './home-page-component.css'
})
export class HomePageComponent implements OnInit{
  constructor(private route: ActivatedRoute, private router: Router) { }

ngOnInit() {
  this.route.params.subscribe(res => console.log(res['id']));
}

navToLocator(){
  this.router.navigate(['/locator'])
}

}

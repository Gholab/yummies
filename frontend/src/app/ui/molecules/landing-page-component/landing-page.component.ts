import { Component } from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page-component',
  imports: [TitleComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  constructor(private router: Router) {
  }

  onClick(){
    this.router.navigate(["/menu"]);
  }

}

import {Component, Inject} from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {Router} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';
import {ORDER_SERVICE} from '../../../services/services.token';

@Component({
  selector: 'app-landing-page-component',
  imports: [TitleComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  constructor(private router: Router,
              @Inject(ORDER_SERVICE) private orderService: OrderService) {
  }

  onClick(){
    this.orderService.createOrder();
    this.router.navigate(["/menu"]);
  }

}

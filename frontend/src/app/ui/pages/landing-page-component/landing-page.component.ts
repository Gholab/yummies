import {Component, Inject} from '@angular/core';
import {TitleComponent} from '../../atoms/title/title.component';
import {Router} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';
import {ORDER_SERVICE} from '../../../services/services.token';
import {GroupService} from '../../../services/group.service';

@Component({
  selector: 'app-landing-page-component',
  imports: [TitleComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  constructor(private router: Router,
    @Inject(ORDER_SERVICE) private orderService: OrderService,
    private groupService: GroupService) {
  }

  onClick(){
    this.orderService.createOrder();
    this.groupService.resetGroup();
    this.router.navigate(["/chooseType"]);
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {ORDER_SERVICE} from '../../../services/services.token';
import {OrderService} from '../../../services/order/order.service';
import {resolve} from '@angular/compiler-cli';
import {Router} from '@angular/router';
import {TitleComponent} from '../../atoms/title/title.component';

@Component({
  selector: 'app-cash-endpage',
  imports: [TitleComponent],
  templateUrl: './cash-endpage.html',
  styleUrl: './cash-endpage.component.scss'
})
export class CashEndpage implements OnInit{

  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService,
              private router: Router){}

  async ngOnInit(){
    await new Promise(resolve => setTimeout(resolve, 5000));
    this.orderService.resetOrder();
    this.router.navigate(['/']);
  }
}

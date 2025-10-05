import {Component, Inject, OnInit} from '@angular/core';
import {ORDER_SERVICE} from '../../../services/services.token';
import {OrderService} from '../../../services/order/order.service';

@Component({
  selector: 'app-endpage',
  imports: [],
  templateUrl: './endpage.html',
  styleUrl: './endpage.scss'
})
export class Endpage implements OnInit{
  numBipper: number = -1;

  constructor(@Inject(ORDER_SERVICE) private orderService: OrderService){}

  ngOnInit(){
    this.numBipper = this.orderService.getBipperId()
  }
}

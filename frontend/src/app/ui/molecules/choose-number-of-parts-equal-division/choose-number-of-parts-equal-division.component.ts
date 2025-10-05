import {Component, Input, SimpleChanges} from '@angular/core';
import {ButtonComponent} from '../../atoms/button/button.component';
import {NumberSelectorComponent} from '../../atoms/number-selector/number-selector.component';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-choose-number-of-parts-equal-division',
  imports: [ButtonComponent, NumberSelectorComponent],
  templateUrl: './choose-number-of-parts-equal-division.component.html',
  styleUrl: './choose-number-of-parts-equal-division.component.scss'
})
export class ChooseNumberOfPartsEqualDivisionComponent {
  @Input() public totalPrice: number = 588.99;
  public singlePartPrice: number = 588.99;
  public numberOfParts: number = 1;

  constructor(private modalService: ModalService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updatePartsPrice();
  }

  public onNumberOfPartsChange(parts: number) {
    this.numberOfParts=parts;
    this.updatePartsPrice();
  }

  private updatePartsPrice() {
    if(this.numberOfParts == 1) {
      this.singlePartPrice=this.totalPrice;
    }
    else {
      this.singlePartPrice = this.totalPrice / this.numberOfParts;
    }
  }

  public closeModal() {
    this.modalService.close();
  }
}

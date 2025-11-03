import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {MenuItem} from '../../../models/menu-item.model';
import {CardItemComponent} from '../cardItem/cardItem.component';
import {TitleComponent} from '../../atoms/title/title.component';

@Component({
  selector: 'app-card-item-carousel',
  imports: [
    CardItemComponent,
    TitleComponent
  ],
  templateUrl: './card-item-carousel.html',
  standalone: true,
  styleUrl: './card-item-carousel.scss'
})
export class CardItemCarousel {
  @Input() items: MenuItem[] = [];
  @Input() title: string = '';

  private startX: number = 0;
  private scrollLeft: number = 0;
  private isDown: boolean = false;

  constructor(private el: ElementRef) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    this.isDown = true;
    this.startX = e.pageX - this.el.nativeElement.querySelector('.carousel-track').offsetLeft;
    this.scrollLeft = this.el.nativeElement.querySelector('.carousel-track').scrollLeft;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isDown = false;
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isDown = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.el.nativeElement.querySelector('.carousel-track').offsetLeft;
    const walk = (x - this.startX) * 1.5; // vitesse du défilement
    this.el.nativeElement.querySelector('.carousel-track').scrollLeft = this.scrollLeft - walk;
  }

  // Gestion tactile
  private touchStartX: number = 0;
  private touchScrollLeft: number = 0;

  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent) {
    const carousel = this.el.nativeElement.querySelector('.carousel-track');
    this.touchStartX = e.touches[0].pageX - carousel.offsetLeft;
    this.touchScrollLeft = carousel.scrollLeft;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(e: TouchEvent) {
    const carousel = this.el.nativeElement.querySelector('.carousel-track');
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - this.touchStartX) * 1.5;
    carousel.scrollLeft = this.touchScrollLeft - walk;
  }
}

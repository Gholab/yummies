import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-number-selector',
  imports: [],
  templateUrl: './number-selector.component.html',
  styleUrls: ['./number-selector.component.scss']
})
export class NumberSelectorComponent implements OnChanges {
  @Input() min = 0;
  @Input() max = 10;
  @Input() current = 0;

  @Output() currentChange = new EventEmitter<number>();

  ngOnChanges(_: SimpleChanges): void {
    this.current = this.clamp(this.current, this.min, this.max);
  }

  decrement(): void {
    const next = this.current - 1;
    this.updateValue(this.clamp(next, this.min, this.max));
  }

  increment(): void {
    const next = this.current + 1;
    this.updateValue(this.clamp(next, this.min, this.max));
  }

  private updateValue(val: number): void {
    if (val !== this.current) {
      this.current = val;
      this.currentChange.emit(this.current);
    }
  }

  private clamp(value: number, min: number, max: number): number {
    if (min > max) [min, max] = [max, min]; 
    return Math.min(Math.max(value, min), max);
  }

  get canDecrement(): boolean {
    return this.current > this.min;
  }

  get canIncrement(): boolean {
    return this.current < this.max;
  }

  get ariaLabel(): string {
    return `Sélecteur numérique de ${this.min} à ${this.max}`;
  }
}

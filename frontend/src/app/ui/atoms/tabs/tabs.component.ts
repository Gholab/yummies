import { Component, Input, TemplateRef, signal, computed } from '@angular/core';
import { NgFor, NgClass, NgTemplateOutlet , NgIf} from '@angular/common';

export type TabItem = {
  title: string;
  template: TemplateRef<unknown>;
  disabled?: boolean;
};

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [NgFor, NgClass, NgTemplateOutlet, NgIf],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input({ required: true }) tabs: TabItem[] = [];

  readonly selectedIndex = signal(0);

  readonly activeTab = computed(() => this.tabs[this.selectedIndex()] ?? null);

  select(i: number) {
    const t = this.tabs[i];
    if (!t || t.disabled) return;
    this.selectedIndex.set(i);
  }

  isActive(i: number) {
    return this.selectedIndex() === i;
  }
}

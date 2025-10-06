import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  OnDestroy,
  Type
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnDestroy {
  @ViewChild('modalContent', { read: ViewContainerRef, static: true })
  modalContent!: ViewContainerRef;

  private componentRef?: ComponentRef<any>;
  private onCloseCallback?: (result?: any) => void;
  closable: boolean = true;

  constructor(private modalService: ModalService) {
  }

  open<T>(component: Type<T>, inputs?: Partial<T>, onClose?: (result?: any) => void, closable: boolean = true) {
    this.modalContent.clear();
    this.componentRef = this.modalContent.createComponent(component);

    // Injecter les inputs dynamiquement
    if (inputs) {
      Object.assign(this.componentRef.instance, inputs);
    }

    this.onCloseCallback = onClose;
    this.closable = closable;
  }

  closeClick(result?: any){
    if(this.closable){
      this.modalService.close();
    }
  }
  close(result?: any) {
    this.componentRef?.destroy();
    this.componentRef = undefined;

    this.onCloseCallback?.(result);
  }

  ngOnDestroy() {
    this.componentRef?.destroy();
  }
}

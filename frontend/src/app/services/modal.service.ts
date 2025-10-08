import {ApplicationRef, ComponentRef, createComponent, Injectable, Injector, Type} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ModalComponent} from '../ui/molecules/modal/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalRef?: ComponentRef<ModalComponent>;

  constructor(private appRef: ApplicationRef, private injector: Injector) {}

  open<T>(component: Type<T>, inputs?: Partial<T>, closable: boolean= true): Promise<any> {
    return new Promise(resolve => {
      if (!this.modalRef) {
        this.modalRef = createComponent(ModalComponent, { environmentInjector: this.appRef.injector });
        this.appRef.attachView(this.modalRef.hostView);
        document.body.appendChild(this.modalRef.location.nativeElement);
      }

      this.modalRef.instance.open(component, inputs, (result?: any) => {
        resolve(void 0);
      }, closable);
    });
  }

  close(result?: any) {
    if (this.modalRef) {
      this.modalRef.instance.close();
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.modalRef = undefined;
    }
  }
}


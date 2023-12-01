import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ControlContainer, FormGroupDirective, NgControl, NgForm, NgModel } from '@angular/forms';
import { EMPTY, Subscription, fromEvent, iif, merge, of, skip, startWith } from 'rxjs';
import { ERROR_MESSAGES } from 'src/app/common/helper/error.message';

@Directive({
  selector: `
  [ngModel]:not([noValidate]),
  [formControl]:not([noValidate]),
  [formControlName]:not([noValidate]),
  [formGroupName]:not([noValidate]),
  [ngModelGroup]:not([noValidate])
  `
})
export class ErrorMessageDirective implements OnInit, OnDestroy {

  ngControl = inject(NgControl, { self: true, optional: true })
    || inject(ControlContainer, { self: true });
  parentControl = inject(ControlContainer, { optional: true });
  elementRef = inject(ElementRef);
  errorMessages = inject(ERROR_MESSAGES);
  errorMessageTrigger!: Subscription;

  @Input() errorRef!: HTMLElement;

  constructor() { }

  get form() {
    return this.parentControl?.formDirective as NgForm | FormGroupDirective | null;
  }

  ngOnInit() {
    if (!this.errorRef) { return; }
    queueMicrotask(() => {
      if (!this.ngControl.control) {
        throw Error(`No control model for ${this.ngControl.name} control...`);
      }
      this.errorMessageTrigger = merge(
        this.ngControl.control.statusChanges,
        fromEvent(this.elementRef.nativeElement, 'blur'),
        iif(() => !!this.form, this.form!.ngSubmit, EMPTY)
      ).pipe(
        startWith(this.ngControl.control.status),
        skip(this.ngControl instanceof NgModel ? 1 : 0),
      ).subscribe(() => {
        if (!this.ngControl.errors) {
          this.errorRef.innerText = '';
          return;
        }
        const [[key, value], ..._] = Object.entries(this.ngControl.errors);
        const error = this.errorMessages[key];
        this.errorRef.innerText = error ? typeof error === 'function' ? error(value) : error : '';
      });
    });
  }
  ngOnDestroy(): void {
    this.errorMessageTrigger?.unsubscribe();
  }
}

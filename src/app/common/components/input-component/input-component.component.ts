import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.scss'],
})
export class InputComponentComponent {
  @Input() group!: FormGroup;
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() controlName: string = '';
  @Input() class: string = '';
}

import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent {
  @Input() controlName: string = '';
  @Input() productForm!: FormGroup;
  @Input() imgUrl: string = '';
  @Output() fileSelected = new EventEmitter<FileList>();
  fileError: string | null = null;
  urls: Array<string | ArrayBuffer | null> = [];
  fileInput!: HTMLInputElement;

  constructor(private toastrService: ToastrService) {
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.addEventListener('change', this.onFileSelected.bind(this));

    setTimeout(() => {
      this.urls = this.imgUrl ? [this.imgUrl] : [];
    });
  }

  get fileControle() {
    return this.productForm.get(this.controlName) as FormControl;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png'
      ) {
        this.fileSelected.emit(input.files);
        this.fileError = null;
        this.urls = []; // Reset the urls array
        for (let i = 0; i < input.files.length; i++) {
          const file = input.files[i];
          const reader = new FileReader();

          reader.onload = () => {
            this.urls.push(reader.result);
          };

          reader.readAsDataURL(file);
        }
      } else {
        this.toastrService.showError('only jpg or png files are supported');
      }
    } else {
      this.fileError = 'Please select a file.';
    }
  }

  removeImage(index: number): void {
    this.urls.splice(index, 1);
    const fileList = this.productForm.get(this.controlName)?.value;
    if (fileList) {
      const dt = new DataTransfer();
      for (let i = 0; i < fileList.length; i++) {
        if (i !== index) {
          dt.items.add(fileList[i]);
        }
      }
      this.productForm.get(this.controlName)?.setValue(dt.files);
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'pb-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  formData: any = {
    name: '',
    phone: '',
    email: '',
    description: '',
  };

  onSubmit() {
    console.log('Form data submitted:', this.formData);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'pb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  formData: any = {
    name: '',
    phone: '',
    email: '',
    description: '',
  };

  onSubmit() {
    // Here, you can handle the form submission, e.g., send the data to a server.
    console.log('Form data submitted:', this.formData);
  }
}

// this style is a Reactive Forms
import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    // console.log(this.form)
    const inputEmail = this.form.value.email;
    const inputPassword = this.form.value.password;
    console.log(inputEmail, inputPassword)
  }
}

import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  onSubmit(FormDatas: NgForm) {
    //console.log(FormDatas);
    const email = FormDatas.form.value.email;
    const password = FormDatas.form.value.password;

    console.log(FormDatas.form.value.email);
    console.log(FormDatas.form.value.password);
    console.log(FormDatas.form.value.xxxx);
    console.log(email);
    console.log(password);
  }
}

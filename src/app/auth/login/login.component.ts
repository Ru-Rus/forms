// this style is a Template Driven Forms
  import { NgFor } from '@angular/common';
  import {
    afterNextRender,
    Component,
    DestroyRef,
    inject,
    viewChild,
  } from '@angular/core';
  import { FormsModule, NgForm } from '@angular/forms';
  import { debounceTime } from 'rxjs';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
  })
  export class LoginComponent {
    private form = viewChild<NgForm>('form');
    private destroyRef = inject(DestroyRef);
    constructor() {
      afterNextRender(() => {
        const savedForm = window.localStorage.getItem('save-login-form');

        if (savedForm) {
          const loadedFormData = JSON.parse(savedForm);
          const savedEmailData = loadedFormData.email;
          // this.form()?.setValue({
          //   email: savedEmailData,
          //   password: ''
          // }) ////this is another way to set all

          setTimeout(() => {
            this.form()?.controls['email'].setValue(savedEmailData); // set a value to one control only
          }, 1);
        }

        const subscription = this.form()
          ?.valueChanges?.pipe(debounceTime(500))
          .subscribe({
            next: (value) =>
              window.localStorage.setItem(
                'save-login-form',
                JSON.stringify({ email: value.email })
              ),
          });

        this.destroyRef.onDestroy(() => subscription?.unsubscribe());
      });
    }

    onSubmit(FormDatas: NgForm) {
      if (!FormDatas.form.valid) {
        return;
      }
      const email = FormDatas.form.value.email;
      const password = FormDatas.form.value.password;

      console.log(email);
      console.log(password);

      FormDatas.form.reset();
    }
  }

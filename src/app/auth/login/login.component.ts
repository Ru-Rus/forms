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

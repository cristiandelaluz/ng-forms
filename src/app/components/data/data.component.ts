import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  form: FormGroup;
  user: any = {
    fullname: {
      name: 'Cristian',
      lastName: 'De La Luz'
    },
    email: 'cris@gmail.com'
  };

  constructor() {
    console.log(this.user);
    this.form = new FormGroup({
      'fullname': new FormGroup({
        'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'lastName': new FormControl('', [Validators.required, this.noDeLaLuz])
      }),
      'email': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'hobbies': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existUser),
      'password': new FormControl('', Validators.required),
      'password2': new FormControl()
    });

    this.form.controls['password2'].setValidators([
      Validators.required,
      this.notEquals.bind(this.form)
    ]);

    //this.form.setValue(this.user);

    this.form.controls['username'].valueChanges.subscribe(data => {
      console.log(data);
    });

    this.form.controls['username'].statusChanges.subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

  save() {
    console.log(this.form);
    // this.form.reset();
    // this.form.reset({
    //   fullname: {
    //     name: '',
    //     lastName: ''
    //   },
    //   email: ''
    // });
    // this.form.controls['email'].setValue('test@test.com');
  }

  addHobby() {
    (<FormArray>this.form.controls['hobbies']).push(new FormControl('', Validators.required));
  }

  noDeLaLuz(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'De La Luz') {
      return {
        nodelaluz: true
      };
    }

    return null;
  }

  notEquals(control: FormControl): {[s: string]: boolean} {
    const form: any = this;
    if (control.value !== form.controls['password'].value) {
      return {
        notequals: true
      };
    }

    return null;
  }

  existUser(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'Pain') {
          resolve({ exist: true });
        } else {
          resolve(null);
        }
      }, 3000);
    });

    return promise;
  }

}

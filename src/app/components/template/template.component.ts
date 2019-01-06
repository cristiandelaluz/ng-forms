import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    input.ng-invalid.ng-touched {
      border: 1px solid red
    }
  `]
})
export class TemplateComponent implements OnInit {

  user: Object = {
    name: null,
    lastName: null,
    email: null,
    country: '',
    sex: '',
    accept: false
  };

  countries = [
    {
      code: 'MX',
      name: 'México'
    },
    {
      code: 'GB',
      name: 'Inglaterra'
    },
    {
      code: 'FR',
      name: 'Francia'
    }
  ];

  sex: string[] = ['Hombre', 'Mujer', 'No definido'];

  constructor() { }

  ngOnInit() {
  }

  save(form: NgForm) {
    console.log('Formulario posteado');
    console.log('form', form);
    console.log('value', form.value);
    console.log('user', this.user);
  }

}

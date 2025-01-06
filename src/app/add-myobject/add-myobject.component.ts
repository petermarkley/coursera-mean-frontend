import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { MyObjectService } from '../myobject.service';
import { MyObject } from '../myobject';
import { MyObjectFormComponent } from '../myobject-form/myobject-form.component';

@Component({
  standalone: true,
  selector: 'app-add-myobject',
  template: `
  	<div class="absolute top left">
  		<a href="/">&lt; Back</a>
  	</div>
    <h2 class="text-3xl text-center mb-4">Add a New MyObject</h2>
    <app-myobject-form (formSubmitted)="addMyObject($event)"></app-myobject-form>
  `,
  styles: [
  ],
  imports: [MyObjectFormComponent],
  schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class AddMyObjectComponent {

  constructor(
    private router:Router,
    private myObjectService: MyObjectService
  ){}
  addMyObject(myObject: MyObject){
    this.myObjectService.createMyObject(myObject)
      .subscribe({
        next: () => {
          this.router.navigate(['/objects']);
        },
        error: (error) => {
          alert('Failed to create MyObject')
          console.error(error)
        }
      }) 
  }

}


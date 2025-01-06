import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MyObject } from '../myobject';
import { ActivatedRoute, Router } from '@angular/router';
import { MyObjectService } from '../myobject.service';
import { MyObjectFormComponent } from '../myobject-form/myobject-form.component';

@Component({
  standalone: true,
  selector: 'app-edit-myobject.comonent.ts',
  template: `
  	<div class="absolute top left">
  		<a href="/">&lt; Back</a>
  	</div>
    <h2 class="text-3xl text-center mb-4">Edit MyObject</h2>
    <app-myobject-form [initialState]="myObject" (formSubmitted)="editMyObject($event)"></app-myobject-form>
  `,
  styles: [
  ],
  imports: [MyObjectFormComponent],
  schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class EditMyObjectComponent implements OnInit {

  myObject: BehaviorSubject<MyObject> =  new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private myObjectService: MyObjectService,
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(!id){
      alert('No id provided')
    }

    this.myObjectService.getMyObject(id !).subscribe((myObject) => {
      this.myObject.next(myObject);
    })
  }
  editMyObject(myObject: MyObject){
    this.myObjectService.updateMyObject(this.myObject.value._id || '', myObject )
      .subscribe({
        next: () => {
          this.router.navigate(['/objects'])
        },
        error: (error) => {
          alert('Failed to update MyObject');
          console.error(error)
        }
      })
  }

}


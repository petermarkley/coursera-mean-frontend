import { Component, EventEmitter, Input, OnInit, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { MyObject } from '../myobject';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-myobject-form',
  template: `
    <form autocomplete="off" [formGroup]="myObjectForm" (ngSubmit)="submitForm()" >
    	<div class="min-w-[600px] bg-white rounded shadow p-6 flex flex-col gap-4 mb-4">
		    <div class="flex flex-col gap-2 justify-start">
		        <label class="font-bold" for="name">Name</label>
		        <input class="border rounded" type="text" id="name" formControlName="name" placeholder="name" required />
		    </div>

		    <div *ngIf="name.invalid && (name.dirty || name.touched)">
		        <div *ngIf="name.errors?.['required']">
		          Name is required
		        </div>
		        <div *ngIf="name.errors?.['minLength']">
		          Name must be atleast 3 characters long
		        </div>
		    </div>

		    <div class="flex flex-col gap-2 justify-start">
		        <label class="font-bold" for="body">Body</label>
		        <textarea class="border rounded" id="body" formControlName="body" placeholder="Body"></textarea>
		    </div>

		    <div class="flex flex-row gap-2 justify-start">
		        <div class="flex flex-row gap-2">
		          <input class="cursor-pointer" type="radio" formControlName="color" name="color" id="red" value="red" required>
		          <label class="bg-[#ff0000] hover:bg-[#ff4444] active:bg-[#cc0000] rounded-full text-white font-bold px-6 cursor-pointer" for="red">red</label>
		        </div>
		        <div class="flex flex-row gap-2">
		          <input class="cursor-pointer" type="radio" formControlName="color" name="color" id="green" value="green">
		          <label class="bg-[#00ff00] hover:bg-[#44ff44] active:bg-[#00cc00] rounded-full text-white font-bold px-6 cursor-pointer" for="green">green</label>
		        </div>
		        <div class="flex flex-row gap-2">
		          <input class="cursor-pointer" type="radio" formControlName="color" name="color" id="blue" value="blue">
		          <label class="bg-[#0000ff] hover:bg-[#4444ff] active:bg-[#0000cc] rounded-full text-white font-bold px-6 cursor-pointer" for="blue">blue</label>
		        </div>
		    </div>
		  </div>

			<div class="flex flex-row justify-end">
		    <button class="bg-[#ff8800] hover:bg-[#ff9900] active:bg-[#ff7700] rounded-full text-white font-bold px-6" type="submit" [disabled]="myObjectForm.invalid">Submit</button>
		  </div>

    </form>
  `,
  styles: [
  ],
  imports: [
  	CommonModule,
  	ReactiveFormsModule
  ],
  schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class MyObjectFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<MyObject> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<MyObject>();

  @Output()
  formSubmitted = new EventEmitter<MyObject>();

  myObjectForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  get name() {return this.myObjectForm.get('name')!;}
  get body() {return this.myObjectForm.get('body')!;}
  get color() {return this.myObjectForm.get('color')!;}

  ngOnInit(): void {
    this.initialState.subscribe(myObject => {
      this.myObjectForm = this.fb.group({
        name: [myObject.name, [Validators.required]],
        body: [myObject.body],
        color: [myObject.color, [Validators.required]],
      })
    })
    this.myObjectForm.valueChanges.subscribe((val) => {this.formValuesChanged.emit(val);})
  }
  submitForm(){
    this.formSubmitted.emit(this.myObjectForm.value)
  }
}


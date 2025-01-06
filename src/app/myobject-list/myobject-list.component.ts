import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MyObject } from '../myobject';
import { MyObjectService } from '../myobject.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-myobject-list',
  template: `
	<h2 class="text-3xl text-center mb-4">MyObject List</h2>
	<div class="space-y-4 mb-4">
		<div class="bg-white rounded shadow p-6 flex flex-row gap-4 justify-between" *ngFor="let myObject of myObjects$ | async">
			<div class="flex flex-col gap-2 justify-start">
				<div class="flex flex-row gap-4 justify-start">
					<h3 class="text-xl font-bold">{{myObject.name}}</h3>
					@switch (myObject.color) {
						@case ("red") {
							<div class="bg-[#ff0000] rounded-full text-white text-sm font-bold px-2 relative"><span class="relative bottom-[-3px]">{{myObject.color}}</span></div>
						}
						@case ("green") {
							<div class="bg-[#00ff00] rounded-full text-white text-sm font-bold px-2 relative"><span class="relative bottom-[-3px]">{{myObject.color}}</span></div>
						}
						@case ("blue") {
							<div class="bg-[#0000ff] rounded-full text-white text-sm font-bold px-2 relative"><span class="relative bottom-[-3px]">{{myObject.color}}</span></div>
						}
					}
				</div>
				<div>{{myObject.body}}</div>
			</div>
			<div class="flex flex-col gap-2 justify-start">
	      <button class="bg-[#ff8800] hover:bg-[#ff9900] active:bg-[#ff7700] rounded-full text-white font-bold px-6" [routerLink] = "['edit/', myObject._id]">Edit</button>
	      <button class="bg-[#ff8800] hover:bg-[#ff9900] active:bg-[#ff7700] rounded-full text-white font-bold px-6" (click)="deleteMyObject(myObject._id || '')">Delete</button>
			</div>
		</div>
	</div>
	<div class="flex flex-row justify-end">
		<button class="bg-[#ff8800] hover:bg-[#ff9900] active:bg-[#ff7700] rounded-full text-white font-bold px-6" [routerLink]= "['new']">New</button>
	</div>
  `,
  styles: [
  ],
  imports: [
  	CommonModule,
  	RouterModule
  ],
  schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class MyObjectListComponent implements OnInit {

  myObjects$: Observable<MyObject[]> =  new Observable();

  constructor(private myObjectService: MyObjectService){}

  ngOnInit(): void {
    this.fetchMyObjects();
  }

  deleteMyObject(id:string): void{
    this.myObjectService.deleteMyObject(id).subscribe({
      next: () => this.fetchMyObjects()
    })
  }

  private fetchMyObjects(): void {
    this.myObjects$ = this.myObjectService.getMyObjects();
  }

}


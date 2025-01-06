import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Router, Routes } from '@angular/router';
import { MyObjectListComponent } from './myobject-list/myobject-list.component';
import { AddMyObjectComponent } from './add-myobject/add-myobject.component';
import { EditMyObjectComponent } from './edit-myobject/edit-myobject.component';

const routes: Routes = [
	{path: '', redirectTo: 'objects', pathMatch: 'full'},
	{path: 'objects', component: MyObjectListComponent},
	{path: 'objects/new', component: AddMyObjectComponent},
	{path: 'objects/edit/:id', component: EditMyObjectComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
	constructor(private router: Router) {
		console.log('Current URL:', this.router.url);
	}
}


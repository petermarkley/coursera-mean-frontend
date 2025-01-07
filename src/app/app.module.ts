import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyObjectListComponent } from './myobject-list/myobject-list.component';
import { MyObjectFormComponent } from './myobject-form/myobject-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddMyObjectComponent } from './add-myobject/add-myobject.component';
import { EditMyObjectComponent } from './edit-myobject/edit-myobject.component';

@NgModule({
  imports: [
  	CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
  	RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class AppModule {}


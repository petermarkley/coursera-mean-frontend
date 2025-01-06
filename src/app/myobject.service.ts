import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MyObject } from './myobject';
import { HttpClient } from'@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyObjectService {

  private url = `${environment.baseURL}`;
  private myObjects$: Subject<MyObject[]> = new Subject();

  constructor(private httpClient: HttpClient) { console.log("instantiating MyObjectService"); }

  private refreshMyObjects(){
    this.httpClient.get<MyObject[]>(`${this.url}/objects`)
      .subscribe(myObjects => {
        this.myObjects$.next(myObjects);
      })
  }

  getMyObjects(): Subject<MyObject[]>{
    this.refreshMyObjects();
    return this.myObjects$;
  }

  getMyObject(id:string):Observable<MyObject>{
    return this.httpClient.get<MyObject>(`${this.url}/objects/${id}`);
  }

  createMyObject(myObject:MyObject):Observable<string>{
    return this.httpClient.post(`${this.url}/objects`, myObject, {responseType: 'text'});
  }

  updateMyObject(id:string, myObject:MyObject):Observable<string>{
    return this.httpClient.put(`${this.url}/objects/${id}`, myObject, {responseType: 'text'});
  }

  deleteMyObject(id:string):Observable<string>{
    return this.httpClient.delete(`${this.url}/objects/${id}`, {responseType: 'text'});
  }

}


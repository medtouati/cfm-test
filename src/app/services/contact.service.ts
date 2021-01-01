import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


  get():Observable<any>{
    return this.http.get('api/contacts');
  }
  add(contact: Contact):Observable<any>{
    return this.http.post('api/contacts', contact);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = 'api/contacts'
  constructor(private http: HttpClient) { }


  get():Observable<Contact[]>{
    return this.http.get<Contact[]>(this.baseUrl);
  }
  add(contact: Contact):Observable<Contact>{
    return this.http.post<Contact>(this.baseUrl, contact);
  }
  update(contact: Contact):Observable<Contact>{
    return this.http.put<Contact>(this.baseUrl, contact);
  }
  delete(contact: Contact | number):Observable<Contact>{
    const id = typeof contact === 'number' ? contact : contact.id;

    return this.http.delete<Contact>(this.baseUrl + '/' + id);
   
  }

  searchContacts(term: string): Observable<Contact[]> {
    term = term.trim();
    // add safe, encoded search parameter if term is present
    const options = term ?
      { params: new HttpParams().set('nom', '^'+term) } : {};

    return this.http.get<Contact[]>(this.baseUrl, options);
  }
}

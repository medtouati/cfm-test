import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class InMemContactService implements InMemoryDbService {

  createDb() {
    let contacts: Contact[] = [
      { id: 0, nom: 'Toyota', prenom: 'Celica', dateNaissance: "", adresses: [
        {typeAdresse:'Boite', typeVoie:'A', rue:'La nouvelle France', numero:'15bis',
         ville:'Aubervilliers', cp:93300, commentaire:'', numTelephone:'+33751240131' }] 
      },
      { id: 1, nom: 'Ford', prenom: 'Mondeo', dateNaissance: "", adresses: [
        {typeAdresse:'Boite', typeVoie:'A', rue:'La nouvelle France', numero:'15bis',
         ville:'Aubervilliers', cp:93300, commentaire:'', numTelephone:'+33751240131' }] 
      },
      { id: 2, nom: 'Porsche', prenom: 'Boxter', dateNaissance: "", adresses: [
        {typeAdresse:'Boite', typeVoie:'A', rue:'La nouvelle France', numero:'15bis',
         ville:'Aubervilliers', cp:93300, commentaire:'', numTelephone:'+33751240131' }] 
      }
      ];
    return {contacts};
  }
}

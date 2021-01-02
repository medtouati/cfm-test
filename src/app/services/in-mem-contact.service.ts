import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class InMemContactService implements InMemoryDbService {

  createDb() {
    let contacts: Contact[] = [
      { id: 0, nom: 'Herbadji', prenom: 'Anis', dateNaissance: "", adresses: [
        {typeAdresse:'Boite', typeVoie:'A', rue:'La nouvelle France', numero:'15bis',
         ville:'Aubervilliers', cp:93300, commentaire:'', numTelephone:'+33751240131' },
         {typeAdresse:'Boite', typeVoie:'B', rue:'Pierre Curie', numero:'7',
         ville:'Aubervilliers', cp:93300, commentaire:'', numTelephone:'+33751240131' }] 
      },
      { id: 1, nom: 'Don', prenom: 'John', dateNaissance: "", adresses: [
        {typeAdresse:'Boite', typeVoie:'B', rue:'La nouvelle France', numero:'15bis',
         ville:'Aubervilliers', cp:93300, commentaire:'', numTelephone:'+33751240131' }] 
      },
      { id: 2, nom: 'Sam', prenom: 'Tee', dateNaissance: "", adresses: [
        {typeAdresse:'Boite', typeVoie:'C', rue:'La nouvelle France', numero:'15bis',
         ville:'Aubervilliers', cp:93300, commentaire:'', numTelephone:'+33751240131' }] 
      }
      ];
    return {contacts};
  }
}

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from '../models/contact.model';

import contacts from '../utils/MOCK_DATA.json';

@Injectable({
  providedIn: 'root'
})
export class InMemContactService implements InMemoryDbService {

  createDb() {
    return {contacts};
  }
}

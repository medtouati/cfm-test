import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import {MatDialog} from '@angular/material/dialog';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { DatePipe, formatDate } from '@angular/common';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers:[DatePipe]
})
export class ContactListComponent implements OnInit {

  columnDefs = [
    { field: 'nom', sortable: true, filter: true },
    { field: 'prenom', sortable: true, filter: true },
    { field: 'dateNaissance', sortable: true, filter: true, valueFormatter: dateFormatter }, //pipe
    { field: 'adresses', sortable: true, filter: true },

];

rowData = []

  constructor(private contactService: ContactService,
              private dialog: MatDialog,
              @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(){
    this.contactService.get().subscribe(res => {
      console.log(res);
      this.rowData = res;
    });

  }

  addContact(){
    const dialogRef = this.dialog.open(AddContactComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getContacts();
    });

  }
  
}
function dateFormatter(params) {
  const datePipe = new DatePipe('fr-FR');
  console.log(params);
  return datePipe.transform(params.value, 'longDate');
}

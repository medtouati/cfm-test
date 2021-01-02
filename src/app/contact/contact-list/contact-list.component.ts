import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import {MatDialog} from '@angular/material/dialog';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { DatePipe, formatDate } from '@angular/common';
import { Adresse } from 'src/app/models/adresse.model';
import { AgGridAngular } from 'ag-grid-angular';
import { UpdateContactComponent } from '../update-contact/update-contact.component';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers:[DatePipe]
})
export class ContactListComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  isSelected: Boolean = false;

  columnDefs = [
    { field: 'nom', sortable: true, filter: true, checkboxSelection: true, editable:true},

    { field: 'prenom', sortable: true, filter: true, editable:true },
    { field: 'dateNaissance', sortable: true, filter: true, valueFormatter: dateFormatter }, //pipe
    { field: 'adresses', sortable: true, filter: true, valueFormatter: adresseFormatter },

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
  
  deleteContacts() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    
    const selectedContacts = selectedNodes.map(node => node.data );
    console.log(selectedContacts);
    selectedContacts.forEach(contact => {
      this.contactService.delete(contact).subscribe(res => {
        this.getContacts();
      });
    })
}

updateContact() {
  const selectedNodes = this.agGrid.api.getSelectedNodes();
  
  
  const selectedContact = selectedNodes.map(node => node.data )[0];

  const dialogRef = this.dialog.open(UpdateContactComponent, {data: selectedContact});
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

function adresseFormatter(params){
  const adresses: Adresse[] = params.value;
  return adresses[0].typeAdresse + ' ' + 
          adresses[0].typeVoie + '\n' +
          adresses[0].numero + ' ' +
          adresses[0].rue + ' ' +
          adresses[0].cp + ', ' +
          adresses[0].ville + '\n' +
          adresses[0].numTelephone + '\n' +
          adresses[0].commentaire + ' ' ;
}

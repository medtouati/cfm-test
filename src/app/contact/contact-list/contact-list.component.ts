import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import {MatDialog} from '@angular/material/dialog';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { DatePipe, formatDate } from '@angular/common';
import { Adresse } from 'src/app/models/adresse.model';
import { AgGridAngular } from 'ag-grid-angular';
import { UpdateContactComponent } from '../update-contact/update-contact.component';
import { GridOptions, Module } from 'ag-grid-community';
import { MatInputComponent } from 'src/app/utils/mat-input.component';



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
    /*{
      field: 'nom',
      cellRenderer: 'showCellRenderer',
      rowSpan: rowSpan,
      cellClassRules: { 'nom-cell': 'value !== undefined' },
      width: 200,
    },*/

    { field: 'nom', sortable: true, filter: true, checkboxSelection: true, editable:true},

    { headerName: 'typeAdresse', field: 'typeAdresse' },
    { headerName: 'typeVoie', field: 'typeVoie' },
    { headerName: 'rue', field: 'rue' },
    { headerName: 'numero', field: 'numero' },
    { headerName: 'cp', field: 'cp' },
    { headerName: 'ville', field: 'ville' },
    { headerName: 'numTelephone', field: 'numTelephone' },
    { headerName: 'commentaire', field: 'commentaire' },


    /*{ field: 'nom', sortable: true, filter: true, checkboxSelection: true, editable:true},

    { field: 'prenom', sortable: true, filter: true, editable:true },
    { field: 'dateNaissance', sortable: true, filter: true, valueFormatter: dateFormatter }, //pipe
    { field: 'adresses', sortable: true, filter: true, valueFormatter: adresseFormatter },
    */

  ];

rowData = []

components;

  constructor(private contactService: ContactService,
              private dialog: MatDialog,
              @Inject(LOCALE_ID) private locale: string) {
           
               }

  ngOnInit(): void {
    this.getContacts();

    this.components = { showCellRenderer: createShowCellRenderer() };

  }

  getContacts(){
    this.contactService.get().subscribe(res => {
      //console.log(res);
      //this.rowData = res;
      this.rowData = this.flatData(res);
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

search(event){
  console.log('hey')
  this.contactService.searchContacts(event.target.value).subscribe(res =>{
    this.rowData = this.flatData(res);
    console.log(res);
  })
}


flatData(contacts){
  let data = [];
  contacts.forEach(contact => {
    contact.adresses.forEach(adresse => {
      data = [...data, ...[
        {
          nom: contact.nom,
          prenom: contact.prenom,
          dateNaissance: contact.dateNaissance,
        
          typeAdresse: adresse.typeAdresse,
          typeVoie: adresse.typeVoie,
          rue: adresse.rue,
          numero: adresse.numero,
          ville: adresse.ville,
          cp: adresse.cp,
          commentaire: adresse.commentaire,
      
          numTelephone: adresse.numTelephone
      
        }]
      ];
    });

    });

    return data;
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
function rowSpan(params) {
  if (params.data.show) {
    return 4;
  } else {
    return 2;
  }
}
function createShowCellRenderer() {
  function ShowCellRenderer() {}
  ShowCellRenderer.prototype.init = function (params) {
    var cellBlank = !params.value;
    if (cellBlank) {
      return null;
    }
    this.ui = document.createElement('div');
    this.ui.innerHTML =
      '<div class="show-name">' +
      params.value +
      '' +
      '</div>';
  };
  ShowCellRenderer.prototype.getGui = function () {
    return this.ui;
  };
  return ShowCellRenderer;
}

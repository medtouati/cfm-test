import { Adresse } from './adresse.model';

export class Contact{
    id: number;
    nom: string;
    prenom: string;
    dateNaissance: string;
    
    adresses: Adresse[];
}
import { Component, QueryList, ViewChildren, ViewContainerRef } from "@angular/core";
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
    selector: "input-cell",
    template: `
        <mat-card>
        <form class="container" tabindex="0" (keydown)="onKeyDown($event)">
            <mat-form-field class="example-full-width">
                <input #input matInput [(ngModel)]="typeAdresse" placeholder="Type d'adresse"
                       [ngModelOptions]="{standalone: true}">
            </mat-form-field>
            <mat-form-field class="example-full-width">
                <input #input matInput [(ngModel)]="typeVoie" placeholder="Type de voie"
                       [ngModelOptions]="{standalone: true}">
            </mat-form-field>

            <mat-form-field class="example-full-width">
                <input #input matInput [(ngModel)]="numero" placeholder="Numero"
                   [ngModelOptions]="{standalone: true}">
            </mat-form-field>

            <mat-form-field class="example-full-width">
                <input #input matInput [(ngModel)]="rue" placeholder="Rue"
                    [ngModelOptions]="{standalone: true}">
            </mat-form-field>
            <mat-form-field class="example-full-width">
                <input #input matInput [(ngModel)]="cp" placeholder="Code postal"
                    [ngModelOptions]="{standalone: true}">
            </mat-form-field>

            <mat-form-field class="example-full-width">
                <input #input matInput [(ngModel)]="ville" placeholder="Ville"
                [ngModelOptions]="{standalone: true}">
            </mat-form-field>

            <mat-form-field class="example-full-width">
                <input #input matInput [(ngModel)]="numTelephone" placeholder="Telephone"
                [ngModelOptions]="{standalone: true}">
            </mat-form-field>
            <mat-form-field class="example-full-width">
                <input #input matInput [(ngModel)]="commentaire" placeholder="Commentaire"
                [ngModelOptions]="{standalone: true}">
            </mat-form-field>

        </form>
        </mat-card>
    `,
    styles: [
        `
            .container {
                width: 350px;
            }
        `
    ]
})
export class MatInputComponent implements ICellEditorAngularComp {
    params: any;

    typeAdresse: string;
    typeVoie: string;
    rue: string;
    numero: string;
    ville: string;
    cp: number;
    commentaire: string;

    numTelephone: string;

    @ViewChildren("input", { read: ViewContainerRef })
    public inputs: QueryList<any>;
    focusedInput: number = 0;

    agInit(params: any): void {
        this.params = params;
        console.log(params);
        // simple implementation - we assume a full name consists of a first and last name only
        this.typeAdresse = this.params.value[0].typeAdresse;
        this.typeVoie = this.params.value[0].typeVoie;
        this.numero = this.params.value[0].numero;
        this.rue = this.params.value[0].rue;
        this.cp = this.params.value[0].cp;
        this.ville = this.params.value[0].ville;
        this.numTelephone = this.params.value[0].numTelephone;
        this.commentaire = this.params.value[0].commentaire;
    }

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {
        this.focusOnInputNextTick(this.inputs.first);
    }

    private focusOnInputNextTick(input: ViewContainerRef) {
        window.setTimeout(() => {
            input.element.nativeElement.focus();
        }, 0);
    }

    getValue() {
        return `${this.rue} ${this.numero}`;

    }

    isPopup(): boolean {
        return true;
    }

    /*
     * A little over complicated for what it is, but the idea is to illustrate how you might tab between multiple inputs
     * say for example in full row editing
     */
    onKeyDown(event): void {
        let key = event.which || event.keyCode;
        if (key == 9) {
            // tab
            this.preventDefaultAndPropagation(event);

            // either move one input along, or cycle back to 0
            this.focusedInput = this.focusedInput === this.inputs.length - 1 ? 0 : this.focusedInput + 1;

            let focusedInput = this.focusedInput;
            let inputToFocusOn = this.inputs.find((item: any, index: number) => {
                return index === focusedInput;
            });

            this.focusOnInputNextTick(inputToFocusOn);
        } else if (key == 13) {
            // enter
            // perform some validation on enter - in this example we assume all inputs are mandatory
            // in a proper application you'd probably want to inform the user that an input is blank
            this.inputs.forEach(input => {
                if (!input.element.nativeElement.value) {
                    this.preventDefaultAndPropagation(event);
                    this.focusOnInputNextTick(input);
                }
            });
        }
    }

    private preventDefaultAndPropagation(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
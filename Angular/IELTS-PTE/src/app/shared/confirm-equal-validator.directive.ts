import {Validator, NG_VALIDATORS, AbstractControl, Validators} from '@angular/forms'
import { Directive, Input } from '@angular/core';
import { Key } from 'selenium-webdriver';

@Directive({
selector:'[appConfirmEqualValidator]',
providers:[{
    provide: NG_VALIDATORS,
    useExisting:ConfirmEqualValidatorDirective,
    multi:true
}]

})

export class ConfirmEqualValidatorDirective implements Validators{

    @Input() appConfirmEqualValidator:string;
    validate(control: AbstractControl): { [key: string]: any } | null {
        const controlToCompare = control.parent.get(this.appConfirmEqualValidator);
        if (controlToCompare && controlToCompare.value !== control.value) {
            return { 'notEqual': true };
        }
    
        return null;
    }
}
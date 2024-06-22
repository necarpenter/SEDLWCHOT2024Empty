import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class ExampleForm extends NavigationMixin(LightningElement) {

    handleSubmit(event){
        event.preventDefault();
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleSuccess(event){

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                actionName: 'view'
            }
        });
    }
}
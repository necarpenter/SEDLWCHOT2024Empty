import { LightningElement, api, wire } from 'lwc';

import getCaseContacts from '@salesforce/apex/caseContactPickerController.getCaseContacts';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { updateRecord } from 'lightning/uiRecordApi';
import ID_FIELD from "@salesforce/schema/Case.Id";
import CONTACT_ID_FIELD from "@salesforce/schema/Case.ContactId";

import { RefreshEvent } from "lightning/refresh";
export default class CaseContactPicker extends LightningElement {
    @api recordId;
    contacts;
    fieldsToSearch = ['Name', 'Email'];
    contactColumns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Email', fieldName: 'Email', type: 'email' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' }
    ];
    

    @wire(getCaseContacts, {caseId : '$recordId'})
    wiredCase({ error, data }) {
        if (data) {
            console.log('wiredCase data: ' +  JSON.stringify(data));
            this.contacts = data;
        } else if (error) {
            console.error(error);
        }
    }
    handleRecordPick(event){
        console.log('handleRecordSelect: ' + JSON.stringify(event.detail));
        let contactId = event.detail;
        
        this.setCaseContact(contactId);
    
    }

    setCaseContact(contactId){
        let selectedContact = this.contacts.find(cont => cont.Id === contactId);
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[CONTACT_ID_FIELD.fieldApiName] = contactId;
  
        const recordInput = { fields };
        updateRecord(recordInput)
        .then(() => {
            const toastEvent = new ShowToastEvent({
                title: 'Contact Selected',
                message: selectedContact?.Name,
                variant: 'success',
            });
            this.dispatchEvent(toastEvent);

            this.dispatchEvent(new RefreshEvent());

        })
        .catch((error) => {
            console.error(error);
        });
    }
}
import { LightningElement,api, wire } from 'lwc';
import getOppsforAccount from '@salesforce/apex/SearchOpportunityController.getOppsforAccount';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class SearchOpportunities extends LightningElement {
    @api recordId;
    oppRecords;
    fieldsToSearch = ['Name', 'StageName'];

    @wire(getOppsforAccount, {accountId : '$recordId'})
    wiredOpps({ error, data }) {
        if (data) {
            console.log('wiredOpps data: ' +  JSON.stringify(data));
            this.oppRecords = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleRecordSelect(event){
        console.log('handleRecordSelect: ' + JSON.stringify(event.detail));
        let oppId = event.detail;
        let selectedOpp = this.oppRecords.find(opp => opp.Id === oppId);
        
        const toastEvent = new ShowToastEvent({
            title: 'Opportunity Selected',
            message: selectedOpp?.Name,
            variant: 'success',
        });
        this.dispatchEvent(toastEvent);
    }
}
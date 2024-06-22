import { LightningElement,api, wire } from 'lwc';

export default class AbstractRecordPicker extends LightningElement {
    @api records = [];
    @api labelField = 'Name';
    @api filterableFields = [];
    searchValue;
    
    get options(){
        if(this.records && Array.isArray(this.records) ){
            return this.records.map((record) => {
                return { label: record[this.labelField], ...record };
            });
        }
    }

    get filteredRecords(){
        if(this.searchValue){
            if(this.options && Array.isArray(this.options) ){
                return this.options.filter(option => this.filterOption(option));
            }
        }

    }

    filterOption(option){
        let searchValueLower = this.searchValue.toLowerCase();

        for(let field of this.filterableFields){
            if(option[field].includes(searchValueLower)){
                return true;
            }
        }

        return false;
    }

    handleSearch(event){
        if(event.target?.value){
            this.searchValue = event.target.value;
        }
    }


    handleSelect(event){
        let selectedRecordId;
        console.log('handleSelect: ' + JSON.stringify(event.currentTarget?.dataset));
        if(event.currentTarget?.dataset?.id){
            selectedRecordId = event.currentTarget?.dataset?.id;
        }else if(event.detail?.row){
            selectedRecordId = event.detail.row.Id;
        }
        console.log('handleSelect: ' + JSON.stringify(selectedRecordId));
        
        const selectedEvent = new CustomEvent('recordpick', { detail: selectedRecordId});
        this.dispatchEvent(selectedEvent);
        this.searchValue = '';
        

    }
}
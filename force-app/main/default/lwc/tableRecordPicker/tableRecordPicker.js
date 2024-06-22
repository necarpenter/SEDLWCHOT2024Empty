import { LightningElement, api } from 'lwc';

import AbstractRecordPicker from 'c/abstractRecordPicker';
export default class TableRecordPicker extends AbstractRecordPicker {

    @api columns;

    get fullColumns(){
        
        let tempColumns = [
            {
                type:"button",
                fixedWidth: 150,
                typeAttributes: {
                    label: 'Select',
                    name: 'select',
                    variant: 'brand'
                }
            }
        ];
        return tempColumns.concat(this.columns);

    }
}
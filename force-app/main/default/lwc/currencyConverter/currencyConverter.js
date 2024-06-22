import { LightningElement } from 'lwc';
export default class CurrencyConverter extends LightningElement {
    currencyOptions = [{label: 'USD', value: 'USD'}, {label: 'EUR', value: 'EUR'}, {label: 'GBP', value: 'GBP'}, {label: 'INR', value: 'INR'}, {label: 'AUD', value: 'AUD'}, {label: 'CAD', value: 'CAD'}];

    handleAmountChange(event){}

    handleCurrencyChange(event){}

    handleConvert(){}
}
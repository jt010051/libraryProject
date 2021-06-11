import { LightningElement, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Book.Book_Name';
import Availability_Status_FIELD from '@salesforce/schema/Book.Availability_Status__c';
import Overdue_Fees_FIELD from '@salesforce/schema/Book.Overdue_Fees__c';
const COLUMNS = [
    { label: 'Book Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Available', fieldName: Availability_Status_FIELD.fieldApiName, type: 'Picklist' },
    { label: 'Overdue Fees', fieldName: Overdue_Fees_FIELD.fieldApiName, type: 'currency' }
];
export default class AccountList extends LightningElement {
    columns = COLUMNS;
    books;
}
import { LightningElement, wire , track} from 'lwc';
import NAME_FIELD from '@salesforce/schema/Book__c.Name';
import Due_Date_FIELD from '@salesforce/schema/Book__c.Due_Date__c';
import Issue_Date_FIELD from '@salesforce/schema/Book__c.Due_Date__c';
import BOOK_ID from '@salesforce/schema/Book__c.ID';
import Overdue_Fees_FIELD from '@salesforce/schema/Book__c.Overdue_Fees__c';
import Available from '@salesforce/schema/Book__c.Availability_Status__c';
import Id from '@salesforce/user/Id';

import allBooks from '@salesforce/apex/BookController.allBooks';

const COLUMNS = [
    { label: 'Book ID', fieldName: BOOK_ID.fieldApiName, type: 'Id' },
    { label: 'Overdue Fees', fieldName: Overdue_Fees_FIELD.fieldApiName, type: 'currency' },
    { label: 'Book Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Due Date', fieldName: Due_Date_FIELD.fieldApiName, type: 'date' },
    { label: 'Issue Date', fieldName: Issue_Date_FIELD.fieldApiName, type: 'date' },
    { label: 'Status', fieldName: Available.fieldApiName, type: 'picklist' }

];
export default class BookList extends LightningElement {
    columns = COLUMNS;
    @wire(allBooks) books;
    currentUser = Id;
    selectedBooks;
    error;



    
}

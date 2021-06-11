import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BOOK_OBJECT from '@salesforce/schema/Book';
import Book_Name_FIELD from '@salesforce/schema/Book.Name';
import Overdue_Fees_FIELD from '@salesforce/schema/Book.Overdue_Fees__c';
import Availability_Status_FIELD from '@salesforce/schema/Book.Availability_Status__c';
import NAME_FIELD from '@salesforce/schema/User.Name__c';

export default class returnBooks extends LightningElement {
    objectApiName = BOOK_OBJECT;
    fields = [NAME_FIELD, Book_Name_FIELD,  Overdue_Fees_FIELD, Availability_Status_FIELD ];
    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Book Returned",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }

 }
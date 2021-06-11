import { LightningElement, wire , track} from 'lwc';
import NAME_FIELD from '@salesforce/schema/Book__c.Name';
import BOOK_ID from '@salesforce/schema/Book__c.ID';
import Borrow_ID from '@salesforce/schema/Borrow_Book_Info__c.ID';
import Status from '@salesforce/schema/Borrow_Book_Info__c.Status__c';
import Issued from '@salesforce/schema/Borrow_Book_Info__c.Issued_Date__c';
import returned from '@salesforce/schema/Borrow_Book_Info__c.Return_Date__c';
import now from '@salesforce/schema/Borrow_Book_Info__c.IsBorrowActive__c';
import returnBooks from '@salesforce/apex/BookController.returnBooks';
import Id from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getUserBorrowedBooks from '@salesforce/apex/BookController.getUserBorrowedBooks';

const COLUMNS = [
    { label: 'Borrow ID', fieldName: Borrow_ID.fieldApiName, type: 'Id' },
    { label: 'Book ID', fieldName: BOOK_ID.fieldApiName, type: 'Id' },
    { label: 'Book Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Book Status', fieldName: Status.fieldApiName, type: 'text' },
    { label: 'Issued On', fieldName: Issued.fieldApiName, type: 'text' },
    { label: 'Return Date', fieldName: returned.fieldApiName, type: 'text' },
    { label: 'Borrowing Now?', fieldName: now.fieldApiName, type: 'text' },

];
export default class BookList extends LightningElement {
    @track listOfBorrowedBooks;
    columns = COLUMNS;
    currentUser = Id;
    selectedBooks;
    error;
@wire (getUserBorrowedBooks) book;

    handleReturnBook(){
        
        returnBooks({ borrowedBooks: this.selectedBooks})
            .then((result) => {
                console.log(result)
                this.error = undefined;
                const evt = new ShowToastEvent({
                    title: result,
                    message: 'Book Returned Successfully',
                    variant: 'Success',
                });
                this.dispatchEvent(evt);
                this.book();
            })
            .catch((error) => {
                //dispatch error toaster
                this.error = error;
                this.listOfBooks
            });
    }
  getSelectedName(event) {
        
        this.selectedBooks = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        for (let i = 0; i <this.selectedBooks.length; i++){
console.log(this.selectedBooks[i].NAME_FIELD.fieldApiName)

        }
        
    }
    
}

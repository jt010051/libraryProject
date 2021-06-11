import { LightningElement, wire , track} from 'lwc';
import NAME_FIELD from '@salesforce/schema/Book__c.Name';
import Overdue_Fees_FIELD from '@salesforce/schema/Book__c.Overdue_Fees__c';
import returnBooks from '@salesforce/apex/LibraryBook.returnBooks';
import Id from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getBooks from '@salesforce/apex/BookController.getUserBorrowedBooks';

const COLUMNS = [
    { label: 'Book Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Due Date', fieldName: Due_Date_FIELD.fieldApiName, type: 'date' },
    { label: 'Overdue Fees', fieldName: Overdue_Fees_FIELD.fieldApiName, type: 'currency' }
];
export default class BookList extends LightningElement {
    @track listOfBorrowedBooks;
    columns = COLUMNS;
    @wire(getBooks) books;
    currentUser = Id;
    selectedBooks;
    error;


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
                this.borrowedBooksList();
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

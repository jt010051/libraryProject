import { LightningElement, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Book__c.Name';
import Due_Date_FIELD from '@salesforce/schema/Book__c.Due_Date__c';
import Overdue_Fees_FIELD from '@salesforce/schema/Book__c.Overdue_Fees__c';
import getUserBorrowedBooks from '@salesforce/apex/LibraryBook.getUserBorrowedBooks';

import getBooks from '@salesforce/apex/BookController.getBooks';

const COLUMNS = [
    { label: 'Book Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Due Date', fieldName: Due_Date_FIELD.fieldApiName, type: 'date' },
    { label: 'Overdue Fees', fieldName: Overdue_Fees_FIELD.fieldApiName, type: 'currency' }
];
export default class BookList extends LightningElement {
    columns = COLUMNS;
    @wire(getBooks)
    books;
    selectedBooks;
    error;

    handleReturnBook(){
        console.log('current user extracted is ' + Id);
        getUserBorrowedBooks({ books: this.selectedBooks, currentUser: Id})
            .then((result) => {
                this.error = undefined;
                const evt = new ShowToastEvent({
                    title: result,
                    message: 'Book Returned Successfully',
                    variant: 'Success',
                });
                this.dispatchEvent(evt);
                //calling handle search book to refresh the grid.
                this.handleSearchBook();
            })
            .catch((error) => {
                //dispatch error toaster
                this.error = error;
                
            });
    }
    getSelectedName(event) {
        this.selectedBooks = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        //for (let i = 0; i < selectedRows.length; i++){
          //  alert("You selected: " + selectedRows[i].Name);
        //}
    }
}

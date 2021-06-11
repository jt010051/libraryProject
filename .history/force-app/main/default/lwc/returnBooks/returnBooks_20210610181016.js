import { LightningElement, wire , track} from 'lwc';
import NAME_FIELD from '@salesforce/schema/Book__c.Name';
import BOOK_ID from '@salesforce/schema/Book__c.ID';
import Overdue_Fees_FIELD from '@salesforce/schema/Book__c.Overdue_Fees__c';
import returnBooks from '@salesforce/apex/LibraryBook.returnBooks';
import Id from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getUserBorrowedBooks from '@salesforce/apex/BookController.getUserBorrowedBooks';

const COLUMNS = [
    { label: 'User ID', fieldName: Id.fieldApiName, type: 'number' },
    { label: 'Book ID', fieldName: BOOK_ID.fieldApiName, type: 'number' },
    { label: 'Book Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Overdue Fees', fieldName: Overdue_Fees_FIELD.fieldApiName, type: 'currency' }
];
export default class BookList extends LightningElement {
    @track listOfBorrowedBooks;
    columns = COLUMNS;
    currentUser = Id;
    selectedBooks;
    error;
connectedCallback(){

    this.borrowedBooksList();
}
borrowedBooksList(){
    getUserBorrowedBooks({ currentUser: Id})
.then((result)=>{
console.log(result);
this.listOfBorrowedBooks = result;
let preparedAssets = [];
this.listOfBorrowedBooks.forEach(assests=>{
let preparedAsset ={};
console.log('Borrow Id ' +asset.Id);
preparedAsset.Id = asset.Id;
preparedAsset.Book__c = asset.Book__r.Id;
preparedAsset.Name = asset.Book__r.Name;

preparedAssets.push(preparedAsset);

});
this.listOfBorrowedBooks=preparedAssets;
this.error=undefined;
})
.catch((error)=>{
    this.error=error;

    this.listOfBooks=undefined;

});
}

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

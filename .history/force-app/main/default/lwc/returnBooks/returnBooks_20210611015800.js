import { LightningElement, wire , track} from 'lwc';
import NAME from '@salesforce/schema/Book__c.Name';
import BOOK_ID from '@salesforce/schema/Book__c.ID';
import Borrow_ID from '@salesforce/schema/Borrow_Book_Info__c.ID';
import Status from '@salesforce/schema/Borrow_Book_Info__c.Status__c';
import IssuedDate from '@salesforce/schema/Borrow_Book_Info__c.Issued_Date__c';
import ReturnDate from '@salesforce/schema/Borrow_Book_Info__c.Return_Date__c';
import IsBorrowActive from '@salesforce/schema/Borrow_Book_Info__c.IsBorrowActive__c';
import returnBooks from '@salesforce/apex/BookController.returnBooks';
import Id from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getUserBorrowedBooks from '@salesforce/apex/BookController.getUserBorrowedBooks';

const COLUMNS = [
    { label: 'Borrow ID', fieldName: 'Id', type: 'Id' },
    { label: 'Book ID', fieldName: 'Book__c', type: 'Id' },
    { label: 'Book Name', fieldName: 'Name', type: 'text' },
    { label: 'Book Status', fieldName: 'Status', type: 'picklist' },
    { label: 'Issued On', fieldName: 'IssuedDate', type: 'date' },
    { label: 'Return Date', fieldName: 'ReturnDate', type: 'date' },
    { label: 'Borrowing Now?', fieldName: 'IsBorrowActive', type: 'text' },

];
export default class BookList extends LightningElement {
    @track listOfBorrowedBooks;
    columns = COLUMNS;
    currentUser = Id;
    selectedBooks;
    error;
@wire (getUserBorrowedBooks) book;
connectedCallback(){

    this.borrowedBookList();
}
borrowedBookList(){
    getUserBorrowedBooks({currentUser:Id})
    .then((result)=>{
console.log(result);
this.listOfBorrowedBooks=result;
let preparedAssets =[];
this.listOfBorrowedBooks.forEach(asset=>{
let preparedAsset={};
console.log('Borrow Id ' +asset.Id);
preparedAsset.Id=asset.Id;
preparedAsset.Book__c=asset.Book__r.Id;
preparedAsset.Name=asset.Book__r.Name;
preparedAsset.Status=asset.Book__r.Status;
console.log('Issued Date' +asset.Issued_Date__c);
preparedAsset.IssuedDate=asset.Issued_Date__c;
console.log('Returned Date' +asset.Issued_Date__c);
preparedAsset.ReturnDate=asset.Return_Date__c;
preparedAsset.IsBorrowActive=asset.IsBorrowActive__c;
preparedAssets.push(preparedAsset);
});

this.listOfBorrowedBooks=preparedAssets;
this.error =undefined;



    })
.catch((error)=>{
this.error =error;
this.listOfBooks= undefined;

})

}
    handleReturnBook(){
        
        returnBooks({ borrowedBooks: this.selectedBooks, currentUser: Id})
            .then((result) => {
                console.log(result)
                this.error = undefined;
                const evt = new ShowToastEvent({
                    title: result,
                    message: 'Book Returned Successfully',
                    variant: 'Success',
                });
                this.dispatchEvent(evt);
                this.borrowedBookList();
            })
            .catch((error) => {
                //dispatch error toaster
                this.error = error;
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

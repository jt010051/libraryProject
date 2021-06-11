import { LightningElement, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Book__c.Name';
import Due_Date_FIELD from '@salesforce/schema/Book__c.Due_Date__c';
import Overdue_Fees_FIELD from '@salesforce/schema/Book__c.Overdue_Fees__c';
import returnBooks from '@salesforce/apex/LibraryBook.returnBooks';
import Id from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

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
    currentUser = Id;
    selectedBooks;
    error;


    borrowedBookList(){
        getBorrowedBooks({ currentUser: Id })
.then((result)=>{
console.log(result);
this.getBooks=result;
let preparedAssets =[];

this.getBooks.forEach(asset=>{
let preparedAsset={};
console.log('Borrow Id ' +asset.Id);
preparedAsset.Id= asset.Id;
preparedAsset.Book__c= Book__r.Id;
preparedAsset.Name= Book__r.Name;
preparedAsset.Availability_Status__c= Book__r.Availability_Status__c;
console.log('Due Date ' +asset.Due_Date__c);
preparedAsset.Due_Date__c= Book__r.Due_Date__c;
preparedAsset.In_Stock__c= Book__r.In_Stock__c;
preparedAssets.push(preparedAsset);

});
this.books=preparedAssets;
this.error=undefined;
})
.catch((error)=>{
this.error=error;
this.books=undefined;
});


    }
    handleReturnBook(){
        
        returnBooks({ books: this.selectedBooks})
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
        for (let i = 0; i < selectedRows.length; i++){
console.log(this.selectedBooks[i].NAME_FIELD.fieldApiName)
        }
    }
}

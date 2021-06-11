import { LightningElement, track } from 'lwc';
import searchUsers from '@salesforce/apex/BookController.getBooks';

export default class AdminViewSearch extends LightningElement {
    @track listOfUsers;

    searchValue;
    searchType = 'Name';   
    columns = [
        { label: 'Id', fieldName: 'Id' },
        { label: 'Name', fieldName: 'Name', type: 'text'},
        { label: 'Book Name', fieldName: 'Book', type: 'text'},

    ];


    handleSearchUser(){
        console.log('Search Type ' + this.searchType);
        console.log('Search Value ' + this.searchValue);
        //Call Apex method imperatively
        searchUsers({ searchType: this.searchType, searchValue: this.searchValue })
            .then((result) => {
                console.log(result);
                this.listOfUsers = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.listOfUsers = undefined;
            });
    }

    searchKeyword(event){
        this.searchValue = event.target.value;
    }

    getSelectedName(event) {
        this.selectedBooks = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        //for (let i = 0; i < selectedRows.length; i++){
          //  alert("You selected: " + selectedRows[i].Name);
        //}
    }
}
import { LightningElement } from 'lwc';

export default class AdminViewSearch extends LightningElement {
    columns = [
        { label: 'Id', fieldName: 'Id' },
        { label: 'Name', fieldName: 'Name', type: 'text'},
        { label: 'Book Name', fieldName: 'Book', type: 'text'},

    ];


    handleSearchBook(){
        console.log('Search Type ' + this.searchType);
        console.log('Search Value ' + this.searchValue);
        //Call Apex method imperatively
        searchBooks({ searchType: this.searchType, searchValue: this.searchValue })
            .then((result) => {
                console.log(result);
                this.listOfBooks = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.listOfBooks = undefined;
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
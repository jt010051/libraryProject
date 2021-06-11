public class BookController {
    @AuraEnabled(cacheable=true)

    public static List<Book__c>allBooks(){
return[SELECT Id, Name, Author__c, Category__c, Status__c, User__c
FROM Book__c

WITH SECURITY_ENFORCED

];

    }
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooks(String searchType, String searchValue){
    try{
    String query = 'SELECT Id, Name, Author__c, Category__c, Status__c FROM Book__c WHERE ' + searchType + ' ' + 'Like ' + '\'' +'%'+searchValue+'%'  +'\'' + ' WITH SECURITY_ENFORCED';
    System.debug('Dynamic Search Query ' + query);
    List<Book__c> listOfBooks = Database.query(query);
    return listOfBooks;
    }
    catch(Exception e){
    throw e;
    }
    } // end of method

    @AuraEnabled
    public static String borrowBooks(List<Book__c> books, Id currentUser){
    try{
    System.debug('Current User : '+currentUser);
    List<Book__c> updateBooks = new List<Book__c>();
    List<Borrow_Book_Info__c> borrowBookInfos = new List<Borrow_Book_Info__c>();
    for(Book__c b : books){
    Book__c updateBook = new Book__c();
    Borrow_Book_Info__c borrowBookInfo = new Borrow_Book_Info__c();
    updateBook.Id = b.Id;
    updateBook.Status__c = 'Borrowed';
    updateBooks.add(updateBook);
    System.debug('Book to be updated ' + updateBook.Id);
    borrowBookInfo.Book__c = b.Id;
    borrowBookInfo.User__c = currentUser;
    borrowBookInfo.Issued_Date__c = Date.today();
    borrowBookInfo.Return_Date__c = Date.today() + 14;
    borrowBookInfo.IsBorrowActive__c = true;
    borrowBookInfos.add(borrowBookInfo);
    }
    update updateBooks;
    insert borrowBookInfos;
    }
    catch(Exception e){
    throw e;
    }
    return 'Success';
    } // end of method

    @AuraEnabled(cacheable=true)
    public static List<Borrow_Book_Info__c> getUserBorrowedBooks(Id currentUser){
    try{
    System.debug('Current User received from Wire Apex is ' + currentUser);
    List<Borrow_Book_Info__c> listOfBorrowedBooks = [
        SELECT Id,Book__r.Id,Book__r.Name,Book__r.Status__c, User__c, Issued_Date__c, Return_Date__c, IsBorrowActive__c
        FROM Borrow_Book_Info__c
        WHERE IsBorrowActive__c = true AND User__c = :currentUser
        WITH SECURITY_ENFORCED
    ];
    System.debug('List of Borrowed Books ' + listOfBorrowedBooks);
    return listOfBorrowedBooks;
    }
    catch(Exception e){
    throw e;
    }
    }
    @AuraEnabled
    public static String returnBooks(List<Borrow_Book_Info__c> borrowedBooks){
    System.debug('Input received to return books ' + borrowedBooks);
    try{
    System.debug('Return Books Processing started');
    List<Borrow_Book_Info__c> listOfBooksToReturn = new List<Borrow_Book_Info__c>();
    List<Book__c> updateBooks = new List<Book__c>();
    for(Borrow_Book_Info__c b : borrowedBooks){
    System.debug('Inside For Loop');

    //update the borrow book record flag as false
    Borrow_Book_Info__c bookToReturn = new Borrow_Book_Info__c();
    bookToReturn.Id = b.Id;
    bookToReturn.IsBorrowActive__c = false;
    System.debug('Book To Return ' + bookToReturn);
    listOfBooksToReturn.add(bookToReturn);

    //update the Books object with Id to Available
    Book__c updateBook = new Book__c();
    updateBook.Id = b.Book__c;
    updateBook.Status__c = 'Available';
    System.debug('Book To update ' + updateBook);
    updateBooks.add(updateBook);

    }
    update listOfBooksToReturn;
    update updateBooks;
    }
    catch(Exception e){
    throw e;
    }
    return 'Success';
    }
    } // end of Class

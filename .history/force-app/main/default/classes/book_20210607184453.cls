public with sharing class BookController {
    @AuraEnabled(cacheable=true)
    public static List<Book> getBooks() {
        return [
            SELECT NAME,  Overdue_Fees, Availability_Status
            FROM Book
            WHERE BookId = :bookId
            WITH SECURITY_ENFORCED
       ];
    }
}

public with sharing class BookController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContacts(Id accountId) {
        return [
            SELECT NAME, Book_Name,  Overdue_Fees, Availability_Status
            FROM Book
            WHERE BookId = :bookId
            WITH SECURITY_ENFORCED
       ];
    }
}

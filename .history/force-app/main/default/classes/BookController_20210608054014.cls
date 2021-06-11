public with sharing class BookController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooks(Id bookName) {
        return [
            SELECT NAME,  Overdue_Fees__c, Due_Date__c
            FROM Book__c
            WHERE NAME = :bookName
            WITH SECURITY_ENFORCED
       ];
    }
}

public with sharing class caseContactPickerController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getCaseContacts(Id caseId){
        Id accountId = [SELECT AccountId FROM Case WHERE Id = :caseId].AccountId;
        return [SELECT Id, Name,Email, Phone FROM Contact WHERE AccountId = :accountId];
    }
}
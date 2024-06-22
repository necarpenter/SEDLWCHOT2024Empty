public with sharing class SearchOpportunityController {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOppsforAccount(Id accountId){
        return [SELECT Id, Name, StageName FROM Opportunity WHERE AccountId = :accountId];
    }
}
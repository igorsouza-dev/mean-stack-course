angular.module("primeiraApp").config([
    "$stateProvider",
    "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state("dashboard", {
            url: "/dashboard",
            templateUrl: "dashboard/dashboard.html"
        }).state("billingCycle", {
            url: "/billingCycles", 
            templateUrl: "billingCycle/tabs.html"
        });

        //in case it doesnt find any url, return to the dashboard
        $urlRouterProvider.otherwise("/dashboard");
    }
]);
(function(){
    var app=angular.module("githubViewer");

    var RepoController = function($scope,$routeParams,github){
        
        
        var onRepo= function(data){
            $scope.repo=data;
            github.getContributors($scope.repo)
            .then(onContributors, onError);
        };

        var onContributors=function(data){
            $scope.contributors=data;
        };

        var onError=function(reason){
            $scope.error="could not fetch the data";
        };

         var username=$routeParams.username;
         var reponame=$routeParams.reponame;
        

        github.getRepoDetails(username,reponame)
            .then(onRepo,onError);
    };

    app.controller("RepoController",RepoController);

}());
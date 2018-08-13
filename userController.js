// Code goes here
(function() {

    var app = angular.module("githubViewer");
    var userController = function($scope, github, $routeParams) {

        var onUserComplete = function(data) {
            $scope.user = data;
            github.getRepos($scope.user)
                .then(onRepos, onError);
        };

        var onRepos = function(data) {

            $scope.repos = data;


        };

        var onError = function(reason) {
            $scope.error = "could not fetch the data";
        };


        $scope.username = $routeParams.username;
        github.getUser($scope.username).then(onUserComplete, onError);


    };
    app.controller("userController", userController);
}());
// Code goes here
(function() {

    var app = angular.module("githubViewer", []);
    var MainController = function($scope, $anchorScroll, $location, $http, $interval, $log) {

        var onUserComplete = function(response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        var onRepos = function(response) {

            $scope.repos = response.data;
            $location.hash("userDetails");
            $anchorScroll();

        };

        var onError = function(reason) {
            $scope.error = "could not fetch the data";
        };

        var decrementCountdown = function() {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };
        var countdownInterval = null;
        var startCountdown = function() {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };


        $scope.search = function(username) {
            $http.get("http://api.github.com/users/" + username)
                .then(onUserComplete, onError);
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
        };

        $scope.username = "angular";
        $scope.message = "Github viewer";
        $scope.countdown = 5;
        startCountdown();

    };
    app.controller("MainController", MainController);
}());
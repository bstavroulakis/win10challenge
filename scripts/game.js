var app = angular.module('win10challenge',[]);

app.controller('GameController', ['$scope','$interval', function($scope, $interval){
    $scope.score = 0;
    $scope.time = 0;
    $scope.step = 0;
    $scope.gameStarted = false;
    $scope.challengeMessage = "Are you ready for Windows 10? 9 challenges await. See what I did there?";

    var stop = {};

    $scope.toggles = {
        startButtonToggle:false,
        skypeButtonToggle:false,
        startMenuChange1:false,
        startMenuChange2:false,
        parallelBoxToggle:false,
        appToggle:false,
        appSettingsToggle:false
    };

    $scope.resetStuff = function(){
        $scope.toggleActionStrong('skypeButtonToggle',false);
        $scope.toggleActionStrong('startButtonToggle',false);
        $scope.toggleActionStrong('startMenuChange1',false);
        $scope.toggleActionStrong('startMenuChange2',false);
        $scope.toggleActionStrong('parallelBoxToggle',false);
    }

    $scope.endGame = function(){
        $scope.gameStarted = false;
        $scope.challengeMessage = "You made it! Booyah!";
        $scope.score = ((900 - ($scope.time - 15))/ 9);
        if($scope.score > 100)
            $scope.score = 100;
        $scope.score = $scope.score.toFixed(2);
        $interval.cancel(stop);
    }

    $scope.goToStep = function(step){
        console.log(step);
        if(step <= $scope.step || (step - 1) != $scope.step)
            return;

        _gaq.push(['_trackPageview','http://dotnetweekly.com/win10challenge/step' + $scope.step + '.html']);

        if(step == 10)
        {
            $scope.endGame();
            $scope.step++;
            return;
        }

        $scope.step = step;
        $scope.gameStarted = true;

        if($scope.step == 1) {
            stop = $interval(function() {
                $scope.time++;
            }, 1000);
            $scope.challengeMessage = "Challenge 1 - Oh my fellow Start Button you are back! Remember me?";
            $scope.showSuccessMessage("Let's Start!");
        }else if($scope.step == 2) {
            $scope.challengeMessage = "Challenge 2 - Open the Skype app";
            $scope.showSuccessMessage("Awesome!");
        }else if($scope.step == 3) {
            $scope.challengeMessage = "Challenge 3 - Resize the Skype app icon to wide. Fast!";
            $scope.showSuccessMessage("Perfect!");
        }else if($scope.step == 4) {
            $scope.challengeMessage = "Challenge 4 - Open the Music app. It will open now in a window and not full screen";
            $scope.showSuccessMessage("Niice!");
        }else if($scope.step == 5) {
            $scope.challengeMessage = "Challenge 5 - Set the Music app to Full Screen mode";
            $scope.showSuccessMessage("Got It!");
        }else if($scope.step == 6) {
            $scope.challengeMessage = "Challenge 6 - Open the Charms (Settings) of the Music app";
            $scope.showSuccessMessage("Basinga!");
        }else if($scope.step == 7) {
            $scope.challengeMessage = "Challenge 7 - Create a parallel Desktop";
            $scope.showSuccessMessage("Getting close!");
        }else if($scope.step == 8) {
            $scope.challengeMessage = "Challenge 8 - Select your parallel Desktop";
            $scope.showSuccessMessage("Easy!");
        }else if($scope.step == 9) {
            $scope.challengeMessage = "Challenge 9 - When you click on the start button instead of the start menu you can enable the Windows 8 start screen again. Know how?";
            $scope.showSuccessMessage("Last one!");
        }else {
            $scope.challengeMessage = "";
        }
    }
    $scope.toggleAction = function(action){
        $scope.toggles[action] = !$scope.toggles[action];
    }

    $scope.toggleActionStrong = function(action, status){
        $scope.toggles[action] = status;
    }

    $scope.showSuccessMessage = function(message){
        $(".success-message").html(message);
        $(".success-message").show();
        $(".success-message").letterfx({"fx":"fall","words":true,"timing":500,"fx_duration":"1000ms",onElementComplete:function(){
            setTimeout(function(){
                $(".success-message").html("");
                $(".success-message").hide();
            },500);
        }});
    }

}]);

app.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});
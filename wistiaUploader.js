var wistiaUploader = angular.module('process.st.wistia-uploader', []);
wistiaUploader.controller('WistiaUploaderCtrl', ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
    $scope.currentState = 'selectFile';
    $scope.progress = 0;
    $scope.hashedId = '';

    var ctrl = this;

    var url = 'https://upload.wistia.com';
    ctrl.$onInit = function() {
        $($element[0]).find('.fileupload').fileupload({
            url: url,
            dataType: 'json',
            autoUpload: true,
            acceptFileTypes: /(\.|\/)(avi|mp4|flv|mpg|wmv|3gp)$/i, // TODO: add more extensions
            formData: {
                api_password: '125f41d1a3c9736b93eb257aa61222b53cd615f2c6ddace401703a2f548609f8'
            },
            start: function(e){
                $scope.$apply(function(){
                    $scope.currentState = 'uploading';
                });
            },
            done: function (e, data) {
                if(data.result && data.result.hashed_id){
                    $scope.$apply(function(){
                        $scope.currentState = 'done';
                        $scope.hashedId = data.result.hashed_id;
                    });
                }
            },
            fail: function(e){
                $scope.$apply(function(){
                    $scope.currentState = 'error';
                });
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $scope.$apply(function(){
                    $scope.progress = progress;
                })
            }
        });
    }

}]);
wistiaUploader.component('wistiaUploader', {
  templateUrl: 'wistiaUploader.html',
  controller: 'WistiaUploaderCtrl',
  bindings: {
  }
});
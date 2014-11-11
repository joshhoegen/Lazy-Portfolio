'use strict';

/* Controllers */

var kaleidescope = angular.module('kaleidescope', []);

kaleidescope.controller('kaleidescope', ['$scope', function($scope) {
  console.log('kscope controller');
    $scope.kaleidescope = {
      feed: '',
      image: 'https://i1.sndcdn.com/avatars-000040472047-ck2oq7-t500x500.jpg?2aaad5e'
    };
  }])
  .directive('kScopeInit', ['$interval', function($interval) {
    console.log('kscope directive');
    function link(scope, element, attrs){
      console.log(attrs);
      console.log(element);
      console.log(scope);
    }
    function kScopeDraw(ctx, img, imgX, imgY, mask) {
      var maskSide = !mask ? 300 : mask,
        sqSide = maskSide / 2,
        sqDiag = Math.sqrt(2 * sqSide * sqSide),
        c = maskSide / 2,
        centerSide = 0,
        bufferCanvas = document.createElement('canvas'),
        bufferContext = bufferCanvas.getContext('2d');
      
      bufferCanvas.height = mask;
      bufferCanvas.width = mask;
  
      if (img.height < img.width) {
        maskSide = Math.abs(img.height - sqDiag);
      } else {
        maskSide = Math.abs(img.width - sqDiag);
      }
  
      //bufferContext.clearRect(0, 0, maskSide, maskSide);
      //7 (1) 1
      bufferContext.save();
      bufferContext.translate(c, c);
      bufferContext.rotate(-90 * (Math.PI / 180));
      bufferContext.scale(-1, -1);
      bufferContext.drawImage(img, imgX, imgY, maskSide, maskSide, centerSide, centerSide, sqSide, sqSide);
      bufferContext.restore();
      //2 (4) 2
      bufferContext.save();
      bufferContext.translate(c, c);
      bufferContext.rotate(-90 * (Math.PI / 180));
      bufferContext.scale(1, -1);
      bufferContext.drawImage(img, imgX, imgY, maskSide, maskSide, centerSide, centerSide, sqSide, sqSide);
      bufferContext.restore();
      //3 (5) 3
      bufferContext.save();
      bufferContext.translate(c, c);
      bufferContext.rotate(-90 * (Math.PI / 180));
      bufferContext.scale(1, 1);
      bufferContext.drawImage(img, imgX, imgY, maskSide, maskSide, centerSide, centerSide, sqSide, sqSide);
      bufferContext.restore();
      //8 4
      bufferContext.save();
      bufferContext.translate(c, c);
      bufferContext.rotate(-90 * (Math.PI / 180));
      bufferContext.scale(-1, 1);
      bufferContext.drawImage(img, imgX, imgY, maskSide, maskSide, centerSide, centerSide, sqSide, sqSide);
      bufferContext.restore();
      //1 5
      bufferContext.save();
      bufferContext.moveTo(c, c);
      bufferContext.lineTo(c - sqSide, c);
      bufferContext.lineTo(c - sqSide, c - sqSide);
      bufferContext.lineTo(c, c);
      bufferContext.clip();
      bufferContext.translate(c, c);
      bufferContext.scale(-1, -1);
      bufferContext.drawImage(img, imgX, imgY, maskSide, maskSide, centerSide, centerSide, sqSide, sqSide);
      ctx.drawImage(bufferCanvas, 0, 0);
      bufferContext.restore();
      //4 6
      bufferContext.save();
      bufferContext.moveTo(c, c);
      bufferContext.lineTo(c + sqSide, c - sqSide);
      bufferContext.lineTo(c + sqSide, c);
      bufferContext.lineTo(c, c);
      bufferContext.clip();
      bufferContext.translate(c, c);
      bufferContext.scale(1, -1);
      bufferContext.drawImage(img, imgX, imgY, maskSide, maskSide, centerSide, centerSide, sqSide, sqSide);
      bufferContext.restore();
      //5 7
      bufferContext.save();
      bufferContext.moveTo(c, c);
      bufferContext.lineTo(c + sqSide, c);
      bufferContext.lineTo(c + sqSide, c + sqSide);
      bufferContext.lineTo(c, c);
      bufferContext.clip();
      bufferContext.translate(c, c);
      bufferContext.scale(1, 1);
      bufferContext.drawImage(img, imgX, imgY, maskSide, maskSide, centerSide, centerSide, sqSide, sqSide);
      bufferContext.restore();
      //8 8
      bufferContext.save();
      bufferContext.moveTo(c, c);
      bufferContext.lineTo(c - sqSide, c + sqSide);
      bufferContext.lineTo(c - sqSide, c);
      bufferContext.lineTo(c, c);
      bufferContext.clip();
      bufferContext.translate(c, c);
      bufferContext.scale(-1, 1);
      bufferContext.drawImage(img, imgX, imgY, maskSide, maskSide, centerSide, centerSide, sqSide, sqSide);
      bufferContext.restore();
      ctx.drawImage(bufferCanvas, 0, 0);
    }
    return {
      templateUrl: 'js/modules/kaleidescope/templates/live.html',
      link: link
    };
  }]);
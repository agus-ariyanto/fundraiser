alt.application = 'fundraiser';
alt.title = 'Aplikasi Web Fundraiser';
alt.description = '-';
alt.version = '0.0.1';
alt.environment = 'development';


var d=Date.today().toString('yyyy.MM.dd');
alt.urlArgs = '_v=' + alt.version+'&t='+d;

alt.serverUrl = '';

alt.routeFolder='ui/route'
alt.componentFolder = 'ui/component';

//alt.defaultRoute = 'home';
alt.defaultRoute = '';
alt.loginRoute = 'login';
alt.secure = {};

/* module disini */
alt.module('ngSanitize');
alt.module('datePicker');
alt.module('textAngular');
// set window title
document.title = alt.title;

alt.run(['$rootScope', '$window','$auth',
 function($rootScope, $window, $auth){
      $rootScope.$auth = $auth;
     //  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
     //  if(currRoute.params.altaction!=alt.loginRoute){
     //  if(!$auth.islogin()) $window.location.href = alt.baseUrl + alt.loginRoute;
     //  }
     // });
  }]);

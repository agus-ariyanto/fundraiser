alt.modules.auth = angular.module('alt-auth', [])
    .factory('$auth', ['$log', '$window',  function($log, $window){
        // mengambil data token yang disimpan di lokal
        store.set(alt.application + '_token', store.get(alt.application + '_token') || '0');
        store.set(alt.application + '_user', store.get(alt.application + '_user') || {});
        // nilai default token 0 bila belum login

        return {
            token: '0',
            userdata:{},
            set_token: function(token){
                this.token = token;
                store.set(alt.application + '_token', this.token);
            },
            setUserData: function(data){
                this.userdata = data;
                store.set(alt.application + '_user', this.userdata);
            },

            login: function(data){
                this.set_token(data);
            },
            logout: function(){
                this.token = '0';
                store.set(alt.application + '_token', '0');
            },
            islogin: function(){
                return this.token != '0';
            }
        };
    }])
    .config(['$provide', '$httpProvider', function($provide, $httpProvider){
        $provide.factory('authHttpInterceptor', ['$auth', '$log', '$q', '$window', function($auth, $log, $q, $window){
            return {
                request: function(config){
                    if($auth.islogin){
                        config.headers['Authorization']='Bearer '+$auth.token;
                    }
                    return config;
                }
            };
        }]);

        $httpProvider.interceptors.reverse().push('authHttpInterceptor');
        $httpProvider.interceptors.reverse();
    }])
    .run(['$auth', '$log', function($auth, $log){
        var token = store.get(alt.application + '_token');
        if(token) {
            $auth.login(token);
            $auth.setUserData(store.get(alt.application + '_user'));
        }
    }]);

alt.module('alt-auth', alt.modules.auth);

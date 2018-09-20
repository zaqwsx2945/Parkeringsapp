// Dom7
var $$ = Dom7;

var mainApp = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function (id) {

        if(device.platform === 'browser'){
            plugin.google.maps.environment.setEnv({
                'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAaozVO3fB6jqvk5_vs6LkvlTelI-126WQ',
                'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAaozVO3fB6jqvk5_vs6LkvlTelI-126WQ'
            });
        }


        var app = new Framework7({
            root: '#app', // App root element
            id: 'io.framework7.testapp', // App bundle ID
            name: 'Framework7', // App name
            theme: 'auto', // Automatic theme detection
            // App root data
            data: function () {
                return {
                    user: {
                        firstName: 'John',
                        lastName: 'Doe',
                    },
                };
            },
            // App root methods
            methods: {
                helloWorld: function () {
                    app.dialog.alert('Hello World!');
                },
            },
            // App routes
            routes: routes,
        });
        console.log(app);
// Init/Create main view
        var mainView = app.views.create('.view-main', {
            url: '/'
        });

// Login Screen Demo
        $$('#my-login-screen .login-button').on('click', function () {
            var username = $$('#my-login-screen [name="username"]').val();
            var password = $$('#my-login-screen [name="password"]').val();

            // Close login screen
            app.loginScreen.close('#my-login-screen');

            // Alert username and password
            app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
        });

        mapModule.initiateMap();
    }
}

mainApp.initialize();
// Framework7 App main instance


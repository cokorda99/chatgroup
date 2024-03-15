angular.module('firebaseConfig', ['firebase'])

    .run(function () {

        // My app's Firebase configuration
        var config = {
            apiKey: "AIzaSyAHcmD92M8s-VtgUeqEHjkvIyhxtBrUcEg",
            authDomain: "chatgroupany.firebaseapp.com",
            databaseURL: "https://chatgroupany-default-rtdb.firebaseio.com",
            projectId: "chatgroupany",
            storageBucket: "chatgroupany.appspot.com",
            messagingSenderId: "261249267153",
            appId: "1:261249267153:web:d1e468e11a178501301cf0",
            measurementId: "G-1CNG3BV4ZZ"
        };
        // Initialize Firebase
        firebase.initializeApp(config);
        // firebase.analytics();


    })
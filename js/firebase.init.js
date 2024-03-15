angular.module('firebaseConfig', ['firebase'])

    .run(function () {

        // My app's Firebase configuration
        var config = {
            apiKey: "AIzaSyCv225-J9Tq7wyIveBkp5epn8aTNNQyJqk",
            authDomain: "datacentrebuleleng.firebaseapp.com",
            databaseURL: "https://datacentrebuleleng-default-rtdb.firebaseio.com",
            projectId: "datacentrebuleleng",
            storageBucket: "datacentrebuleleng.appspot.com",
            messagingSenderId: "1092095801831",
            appId: "1:1092095801831:web:efaa8d07a1ae4dbc32e542",
            measurementId: "G-0C148VFPGV"
        };
        // Initialize Firebase
        firebase.initializeApp(config);
        // firebase.analytics();


    })

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/




// angular.module('firebaseConfig', ['firebase'])

//     .run(function () {

//         // My app's Firebase configuration
//         var config = {
//             apiKey: "AIzaSyBEk-ynCcQyVkDqhTDNOyO-CSCzkbar0JA",
//             authDomain: "denpasar-10e2a.firebaseapp.com",
//             databaseURL: "https://denpasar-10e2a.firebaseio.com",
//             projectId: "denpasar",
//             storageBucket: "denpasar.appspot.com",
//             messagingSenderId: "76976225491",
//             appId: "1:76976225491:web:7c589489dbad41f530a826",
//             measurementId: "G-ZS8LB8SZRZ"
//         };
//         // Initialize Firebase
//         firebase.initializeApp(config);
//         // firebase.analytics();


//     })

// /*

// .service("TodoExample", ["$firebaseArray", function($firebaseArray){
//     var ref = firebase.database().ref().child("todos");
//     var items = $firebaseArray(ref);
//     var todos = {
//         items: items,
//         addItem: function(title){
//             items.$add({
//                 title: title,
//                 finished: false
//             })
//         },
//         setFinished: function(item, newV){
//             item.finished = newV;
//             items.$save(item);
//         }
//     }
//     return todos;
// }])

// */

$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyDiZQ3pGS7apNMI3xqFGwkvs0m0IYWtRyQ",
        authDomain: "final-677b9.firebaseapp.com",
        databaseURL: "https://final-677b9.firebaseio.com",
        projectId: "final-677b9",
        storageBucket: "final-677b9.appspot.com",
        messagingSenderId: "104707133534"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        var trainDiff = 0;
        var trainRemainder = 0;
        var minutesTillArrival = "";
        var nextTrainTime = "";
        var frequency = childSnapshot.val().frequency;
        var joie = childSnapshot.val().first_train_time;
        var firstTimeConverted = moment(joie, "HH:mm");
        console.log(firstTimeConverted);
        var currentTime = moment();
        // Calculating difference in time from now and the first train using UNIX timestamp, store in var and convert to minutes
        trainDiff = moment().diff(moment(firstTimeConverted), "minutes");
        console.log(trainDiff);
        trainRemainder = trainDiff % frequency;
        minutesTillArrival = frequency - trainRemainder;
        nextTrainTime = moment().add(minutesTillArrival, "minutes").format("HH:mm");
        $("#table-body").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" +
            frequency + "</td><td>" + nextTrainTime + "</td><td>" + minutesTillArrival + "</td></tr>");
    });

    $("#add-train").on("click", function () {

        var name = $("#name").val().trim();
        var destination = $("#destination").val().trim();
        var first_train_time = moment($("#first-train-time").val().trim(), "HH:mm").subtract(1, "years").format("HH:mm");
        var frequency = $("#frequency").val().trim();
        var pusho = {
            name: name,
            destination: destination,
            first_train_time: first_train_time,
            frequency: frequency
        }
        database.ref().push(pusho);
        return false;
    });
});

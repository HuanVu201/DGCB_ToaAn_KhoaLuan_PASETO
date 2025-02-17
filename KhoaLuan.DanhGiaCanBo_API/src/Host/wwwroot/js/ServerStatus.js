"use strict";
var ramSeriesOptions = [
    { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.1)', lineWidth: 3 }
];

var cpuSeriesOptions = [
    { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.1)', lineWidth: 3 }
];

var ramSets;
var cpuSets;

function init() {

    cpuSets = initHost('cpu-status', ramSeriesOptions);
    ramSets = initHost('ram-status', cpuSeriesOptions);

}
function initHost(hostId, seriesOptions) {

    // Initialize an empty TimeSeries for each CPU.
    var cpuDataSets = [new TimeSeries()];

    var now = new Date().getTime();

    // Build the timeline
    var timeline = new SmoothieChart({ millisPerPixel: 20, grid: { strokeStyle: '#555555', lineWidth: 1, millisPerLine: 1000, verticalSections: 4 } });

    for (var i = 0; i < cpuDataSets.length; i++) {
        timeline.addTimeSeries(cpuDataSets[i], seriesOptions[i]);
    }

    timeline.streamTo(document.getElementById(hostId), 1000);

    return cpuDataSets;
}

function addRandomValueToDataSets(time, dataSets, index, value) {
    dataSets[index].append(time, value);
}
var connection = new signalR.HubConnectionBuilder().withUrl("/serverStatusHub").build();
connection.on('broadcastStatus', function (status) {
    console.log(status);

    addRandomValueToDataSets(new Date().getTime(), cpuSets, 0, status.cpu);
    addRandomValueToDataSets(new Date().getTime(), ramSets, 0, status.ram);

});

connection.start().then(function () {
    console.log('connected.');

    init();

    setInterval(function () { connection.invoke('timerCallback') }, 1000);

});

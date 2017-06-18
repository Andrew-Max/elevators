{
    init: function(elevators, floors) {
        var lastCalled = 1

        elevators.forEach(function (elevator, index) {
          elevator.on("floor_button_pressed", function(floorNum) {
            elevator.goToFloor(floorNum);
            cycleFloors(elevator)
          })
          elevator.on("passing_floor", function(floorNum) {
            var pressed = elevator.getPressedFloors()
            if (pressed.includes(floorNum)) {
              stopAtFloor(elevator, floorNum)
            }
          })
        })

        floors.forEach(function(floor, index) {
          floor.on('up_button_pressed', function () {
              attendCalls(leastFull(), index);
          });
          floor.on('down_button_pressed', function () {
            attendCalls(leastFull(), index);
          });
        });

        var atMaximumCapacity = function(elevator, num) {
          return elevator.loadFactor() > num;
        }

        var cycleFloors = function(elevator) {
          elevator.getPressedFloors().forEach(function(floor) {
            elevator.goToFloor(floor);
          });
          elevator.destinationQueue.sort().reverse();
          elevator.checkDestinationQueue();
        }

        var nextUp = function () {
          if (lastCalled + 1 >= elevators.length )  {
            lastCalled = 0
          } else {
            lastCalled++
          }
          return elevators[lastCalled]
        }

        var leastFull = function () {
          var lowestLoadFactor = 1;
          var leastFull;
          elevators.forEach(function(elevator, index) {
            if (elevator.loadFactor() < lowestLoadFactor) {
              lowestLoadFactor = elevator.loadFactor();
              leastFull = elevator;
            }
          })
          return leastFull;
        }

        var attendCalls = function (elevator, floor) {
          elevator.goToFloor(floor);
        };

        var stopAtFloor = function(elevator, floorNum) {
          elevator.destinationQueue.unshift(floorNum)
          elevator.checkDestinationQueue();
        }
    },

    update: function(dt, elevators, floors) {}
}


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

            }
          })
        })

        floors.forEach(function(floor, index) {
          floor.on('up_button_pressed', function () {
              attendCalls(nextUp(), index);
          });
          floor.on('down_button_pressed', function () {
            attendCalls(nextUp(), index);
          });
        });

        var atMinimumCapacity = function(elevator, num) {
            if (elevator.loadFactor() < num) {
                return false
            } else {
                return true
            }
        }

        var cycleFloors = function(elevator) {
          elevator.getPressedFloors().forEach(function(floor) {
            elevator.goToFloor(floor);
          });
          elevator.destinationQueue.sort().reverse();
          elevator.checkDestinationQueue();
        }

        var attendCalls = function (elevator, floor) {
          elevator.goToFloor(floor);
          // cycleFloors(elevators[1])
        };


        var nextUp = function () {
          debugger
          if (lastCalled + 1 >= elevators.length )  {
            lastCalled = 0
          } else {
            lastCalled++
          }
          return elevators[lastCalled]
        }
    },

    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}


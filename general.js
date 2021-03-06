{
    init: function(elevators, floors) {
      elevators.forEach(function(elevator, index) {
          elevator.on("idle", function() {
              if (elevator.currentFloor() === 0) {
                  if (!atMinimumCapacity(elevator, .2)) {
                      elevator.stop()
                      return
                  }
              }

              floors.forEach(function(floor, index) {
                  if (elevator.getPressedFloors().includes(index)) {
                      elevator.goToFloor(index);
                  }
              });

              elevator.goToFloor(0);
          });
      })

        var atMinimumCapacity = function(elevator, num) {
            if (elevator.loadFactor() < num) {
                return false
            } else {
                return true
            }
        }
    },

    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}


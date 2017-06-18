{
    init: function(elevators, floors) {
      elevators.forEach(function(elevator, index) {
          // Whenever the elevator is idle (has no more queued destinations) ...
          elevator.on("idle", function() {
              // if (elevator.currentFloor() === 0) {
              //     if (!atMinimumCapacity(elevator, .2)) {
              //         elevator.stop()
              //         return
              //     }
              // }

              // go from top to 0. on pass check pressed and if included put in front of the last one. stagger starts
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



{
    init: function(elevators, floors) {
        var lastCalled = 1
        var evenElevators = elevators.slice(0,2);
        var oddElevators = elevators.slice(2,4);
        var scanElevator = elevators[4];

        var evenFloors = floors.filter(function(floor) {return floor.floorNum() % 2 === 0 })
        var oddFloors = floors.filter(function(floor) {return floor.floorNum() % 2 === 1 })

        elevators[0].on("idle", function() {
          floors.slice(1,3).forEach(function(floor, index) {
            elevators[0].goToFloor(floor.floorNum());
          });

          cycleFloors(elevators[0], false)
          elevators[0].goToFloor(0)
        });

        elevators[1].on("idle", function() {
          floors.slice(3,5).forEach(function(floor, index) {
            elevators[1].goToFloor(floor.floorNum());
          });

          cycleFloors(elevators[1], false)
          elevators[1].goToFloor(0)
        });

        elevators[2].on("idle", function() {
          floors.slice(5,7).forEach(function(floor, index) {
            elevators[2].goToFloor(floor.floorNum());
          });

          cycleFloors(elevators[2], false)
          elevators[2].goToFloor(0)
        });

        elevators[3].on("idle", function() {
          floors.slice(7,9).forEach(function(floor, index) {
            elevators[3].goToFloor(floor.floorNum());
          });

          cycleFloors(elevators[3], false)
          elevators[3].goToFloor(0)
        });

        elevators[4].on("floor_button_pressed", function(floorNum) {
          elevators[4].goToFloor(floorNum);
          cycleFloors(elevators[4])
        })

        floors.forEach(function(floor, index) {
          floor.on('up_button_pressed', function () {
              attendCalls(elevators[4], index);
          });
          floor.on('down_button_pressed', function () {
            attendCalls(elevators[4], index);
          });
        });


        var cycleFloors = function(elevator, reverseQ) {
          reverseQ = reverseQ || true;
          elevator.getPressedFloors().forEach(function(floor) {
            elevator.goToFloor(floor);
          });

          if (reverseQ) {
            elevator.destinationQueue.sort().reverse();
          }
          elevator.checkDestinationQueue();
        }

        var attendCalls = function (elevator, floor) {
          elevator.goToFloor(floor);
        };

              // floors.reverse().forEach(function(floor,index) {
              //   if (elevator.getPressedFloors().includes(index)) {
              //     elevator.goToFloor(floor.floorNum());
              //   }
              // })
        // })

        // oddElevators.forEach(function (elevator, index) {
        //   elevator.on("idle", function() {
        //       // go to all even floors
        //       oddFloors.forEach(function(floor, index) {
        //         elevator.goToFloor(floor.floorNum());
        //       });

        //       floors.reverse().forEach(function(floor,index) {
        //         if (elevator.getPressedFloors().includes(index)) {
        //           elevator.goToFloor(floor.floorNum());
        //         }
        //       })
        //   });
        // })

          // elevator.on("passing_floor", function(floorNum, direction) {
          //   floors.
          //     // evenFloors.forEach(function(floor, index) {
          //         // if (elevator.getPressedFloors().includes(index)) {
          //             // elevator.goToFloor(floor.floorNum());
          //         // }
          //     });

          //     elevator.goToFloor(0);
          // });



        // oddElevators.forEach(function (elevator, index) {
        //   elevator.on("idle", function() {
        //       oddFloors.forEach(function(floor, index) {
        //           // if (elevator.getPressedFloors().includes(index)) {
        //               elevator.goToFloor(floor.floorNum());
        //           // }
        //       });

        //       elevator.goToFloor(0);
        //   });
        // })
    },

    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}


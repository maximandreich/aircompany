const assert = require('chai').assert;

const Airport = require('../Airport');
const MilitaryPlane = require('../planes/MilitaryPlane');
const PassengerPlane = require('../planes/PassengerPlane');
const ExperimentalPlane = require('../planes/experimentalPlane');
const MILITARY_TYPE = require('../models/militaryType');
const EXPERIMENTAL_TYPES = require('../models/ExperimentalTypes');
const CLASSIFICATION_LEVELS = require('../models/classificationLevels');

describe('Test Airport project', () => {

    let planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MILITARY_TYPE.BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MILITARY_TYPE.BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MILITARY_TYPE.BOMBER),
        new MilitaryPlane('F-15', 1500, 12000, 10000, MILITARY_TYPE.FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, MILITARY_TYPE.FIGHTER),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MILITARY_TYPE.TRANSPORT),
        new ExperimentalPlane("Bell X-14", 277, 482, 500, EXPERIMENTAL_TYPES.HIGH_ALTITUDE, CLASSIFICATION_LEVELS.SECRET),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, EXPERIMENTAL_TYPES.VTOL, CLASSIFICATION_LEVELS.TOP_SECRET)
    ];
    let planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

    it('should have military Planes with transport type', () => {
        let airport = new Airport(planes);
        let transportAndMilitaryPlanes = airport.getTransportMilitaryPlanes();
        let isThereMilitaryPlanesWithTransportType = false;
        for (let militaryPlane of transportAndMilitaryPlanes) {
            if (militaryPlane.getMilitaryType() === MILITARY_TYPE.TRANSPORT) {
                isThereMilitaryPlanesWithTransportType = true;
                break;
            }
        }
        assert.equal(isThereMilitaryPlanesWithTransportType, true);
    });

    it('should check passenger plane with max capacity', () => {
        let airport = new Airport(planes);
        let expectedPlaneWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
        assert.deepEqual(expectedPlaneWithMaxPassengersCapacity, planeWithMaxPassengerCapacity);
    });


    it('should get Passenger plane with max capacity', () => {
        let airport = new Airport(planes);
        airport.sortByMaxLoadCapacity();
        let planesSortedByMaxLoadCapacity = airport.getPlanes();
        let nextPlaneMaxLoadCapacityIsHigherThanCurrent = true;
        for (let i = 0; i < planesSortedByMaxLoadCapacity.length - 1; i++) {
            let currentPlane = planesSortedByMaxLoadCapacity[i];
            let nextPlane = planesSortedByMaxLoadCapacity[i + 1];
            if (currentPlane.getMinLoadCapacity() > nextPlane.getMinLoadCapacity()) {
                nextPlaneMaxLoadCapacityIsHigherThanCurrent = false;
                break;
            }
        }
        assert.isTrue(nextPlaneMaxLoadCapacityIsHigherThanCurrent);
    })

    it('should pass if there is at least one bomber in Military planes', () => {
        let airport = new Airport(planes);
        let bomberMilitaryPlanes = airport.getBomberMilitaryPlanes();
        let isThereBomberInMilitaryPlanes = false;
        for (let militaryPlane of bomberMilitaryPlanes) {
            if (militaryPlane.getMilitaryType() === MILITARY_TYPE.BOMBER) {
                isThereBomberInMilitaryPlanes = true;
            }
            else {
                assert.fail("Test failed!");
            }
        }
    })

    it('should check that Experimental planes has classification level higher than UNCLASSIFIED', () => {
        let airport = new Airport(planes);
        let bomberMilitaryPlanes = airport.getExperimentalPlanes();
        let hasUnclassifiedPlanes = false;
        for (let experimentalPlane of bomberMilitaryPlanes) {
            if (experimentalPlane.CLASSIFICATION_LEVELS === CLASSIFICATION_LEVELS.UNCLASSIFIED) {
                hasUnclassifiedPlanes = true;

            }
            assert.isFalse(hasUnclassifiedPlanes);
        }
    });

});




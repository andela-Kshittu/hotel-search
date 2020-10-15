const bookingService = require("../../services/booking");

jest.mock("../../models/booking");
const Booking = require("../../models/booking").Booking;


describe("Test create booking.", () => {
  it("It should create booking", done => {
    const data = {
      ownerId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      propertyId: "here:pds:place:840drt2z-da7d929da56241ab90a63e9b04581a3e"
    };

    bookingService.create(data);

    expect(Booking).toHaveBeenCalledTimes(1);

    // mock.instances is available with automatic mocks:
    const mockBookingInstance = Booking.mock.instances[0];
    const mockSaveMethod = mockBookingInstance.save;
    expect(mockSaveMethod).toHaveBeenCalledTimes(1);

    done();
  });
});

// describe("Test find booking.", () => {
//   it("It should find booking by propertyId", done => {
//     const propertyId = "here:pds:place:840drt2z-da7d929da56241ab90a63e9b04581a3e";
//
//     bookingService.find(propertyId);
//
//     expect(Booking).toHaveBeenCalledTimes(1);
//
//     // mock.instances is available with automatic mocks:
//     const mockBookingInstance = Booking.mock.instances[0];
//     const mockFindMethod = mockBookingInstance.find;
//     expect(mockFindMethod).toHaveBeenCalledTimes(1);
//
//     done();
//   });
// });

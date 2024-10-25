const { getBookingById, prisma } = require('../services/getBookingsById');

jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        booking: {
            findUnique: jest.fn(),
        },
    };
    return {
        PrismaClient: jest.fn(() => mPrismaClient),
    };
});

describe('getBookingById', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('should return booking if it exists', async () => {
        const bookingId = 1;
        const mockBooking = { id: bookingId, name: 'Test Booking' };

        // Set up the mock to return the expected booking
        prisma.booking.findUnique.mockResolvedValue(mockBooking);

        const result = await getBookingById(bookingId);

        // Check if the result matches the mock booking
        expect(result).toEqual(mockBooking);
        expect(prisma.booking.findUnique).toHaveBeenCalledWith({
            where: { id: bookingId },
        });
    });

    test('should return null if booking does not exist', async () => {
        const bookingId = 2;

        // Set up the mock to return null
        prisma.booking.findUnique.mockResolvedValue(null);

        const result = await getBookingById(bookingId);

        // Check if the result is null
        expect(result).toBeNull();
    });
});

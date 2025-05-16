const BookingService = {
    async bookSeats(seats, name, email, showId) {
        const response = await fetch('/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seats, name, email, showId }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to book seats');
        }
        return response.json();
    },

    async purchaseTickets(seats, userData, showId) {
        const response = await fetch('/api/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seats, userData, showId }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to purchase tickets');
        }
        return response.json();
    },

    async getBookedSeats(showId) {
        const response = await fetch(`/api/booked/${showId}`);
        if (!response.ok) throw new Error('Failed to fetch booked seats');
        return response.json();
    },

    async searchBookingsByEmail(email) {
        const response = await fetch(`/api/bookings/search?email=${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error('Failed to search bookings');
        return response.json();
    },

    async cancelBooking(showId, email, seats) {
        const response = await fetch('/api/bookings/cancel', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ showId, email, seats }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to cancel booking');
        }
        return response.json();
    }
};

export default BookingService;
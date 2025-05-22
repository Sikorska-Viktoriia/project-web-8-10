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

    async getBookedSeats(showId) {
        const response = await fetch(`/api/booked/${showId}`);
        if (!response.ok) throw new Error('Failed to fetch booked seats');
        return response.json();
    },


};

export default BookingService;
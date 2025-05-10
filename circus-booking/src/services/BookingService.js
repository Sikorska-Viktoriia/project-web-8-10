const BookingService = {
    bookSeats: async(seats, name) => {
        const response = await fetch('/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seats, name }),
        });

        if (!response.ok) {
            throw new Error('Failed to book seats');
        }

        return response.json();
    },
};

export default BookingService;
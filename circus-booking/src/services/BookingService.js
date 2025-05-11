const BOOKING_KEY = "bookings";

const BookingService = {
    // Отримати всі бронювання з localStorage
    getAllBookings() {
        try {
            return JSON.parse(localStorage.getItem(BOOKING_KEY)) || [];
        } catch (e) {
            console.error("Помилка при зчитуванні бронювань:", e);
            return [];
        }
    },

    // Отримати заброньовані місця для певного шоу
    getBookedSeats(showId) {
        const all = this.getAllBookings();
        const showBookings = all.filter((b) => b.showId === showId);
        return showBookings.flatMap((b) => b.seats);
    },

    // Зберегти нове бронювання
    saveBooking(booking) {
        const all = this.getAllBookings();
        all.push(booking);
        localStorage.setItem(BOOKING_KEY, JSON.stringify(all));
    },

    // Очищення всіх бронювань (опціонально для адміністрування або тестів)
    clearBookings() {
        localStorage.removeItem(BOOKING_KEY);
    }
};

export default BookingService;
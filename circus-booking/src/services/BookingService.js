const BookingService = {
    bookSeats: async(seats, name) => {
        try {
            const response = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ seats, name }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to book seats");
            }

            return response.json();
        } catch (error) {
            console.error("Error booking seats:", error);
            throw error;
        }
    },

    purchaseTickets: async(seats, userData) => {
        try {
            const response = await fetch("/api/purchase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ seats, userData }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to purchase tickets");
            }

            return response.json();
        } catch (error) {
            console.error("Error purchasing tickets:", error);
            throw error;
        }
    },

    getBookedSeats: async() => {
        try {
            const response = await fetch("/api/booked");
            if (!response.ok) throw new Error("Failed to fetch booked seats");
            const data = await response.json();
            return data.bookedSeats;
        } catch (error) {
            console.error("Error fetching booked seats:", error);
            return [];
        }
    }
};

export default BookingService;
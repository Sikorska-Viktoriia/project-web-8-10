import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generatePDF({ name, phone, email, seats, logoUrl }) {
    if (!Array.isArray(seats) || seats.length === 0) {
        alert("Немає вибраних місць для створення квитка");
        return;
    }

    const doc = new jsPDF();

    // Логотип (опціонально, тільки якщо він є)
    if (logoUrl) {
        const img = new Image();
        img.src = logoUrl;

        img.onload = () => {
            doc.addImage(img, 'PNG', 140, 10, 50, 20); // X, Y, width, height
            generateContent();
        };

        img.onerror = () => {
            console.warn("Не вдалося завантажити логотип");
            generateContent();
        };
    } else {
        generateContent();
    }

    function generateContent() {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(16);
        doc.text('Квиток на циркову виставу', 20, 40);

        doc.setFontSize(12);
        doc.text(`Ім'я: ${name}`, 20, 55);
        doc.text(`Телефон: ${phone}`, 20, 65);
        doc.text(`Email: ${email}`, 20, 75);

        const seatList = seats.join(', ');
        const total = seats.reduce((sum, id) => {
            const row = Math.floor((id - 1) / 12);
            return sum + (row < 2 ? 300 : 150);
        }, 0);

        doc.text(`Місця: ${seatList}`, 20, 85);
        doc.text(`Сума до сплати: ${total} грн`, 20, 95);

        doc.save('ticket.pdf');
    }
}
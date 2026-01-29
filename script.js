const inputsDiv = document.getElementById("inputs");
const qrType = document.getElementById("qrType");
const qrCodeDiv = document.getElementById("qrcode");
let qr;

function renderInputs() {
    let html = "";
    switch (qrType.value) {
        case "wifi":
            html = `
          <input id="ssid" placeholder="Wi-Fi Name (SSID)">
          <input id="password" placeholder="Password">
          <input id="security" placeholder="Security (WPA/WEP)">
        `;
            break;

        case "email":
            html = `
          <input id="email" placeholder="Email Address">
          <input id="subject" placeholder="Subject">
          <textarea id="body" placeholder="Message"></textarea>
        `;
            break;

        case "phone":
            html = `<input id="phone" placeholder="Phone Number">`;
            break;

        case "sms":
            html = `
          <input id="smsNumber" placeholder="Phone Number">
          <textarea id="smsMsg" placeholder="Message"></textarea>
        `;
            break;

        case "whatsapp":
            html = `
          <input id="waNumber" placeholder="WhatsApp Number with country code">
          <textarea id="waMsg" placeholder="Message"></textarea>
        `;
            break;

        case "upi":
            html = `
          <input id="upiId" placeholder="UPI ID">
          <input id="amount" placeholder="Amount">
          <input id="note" placeholder="Note">
        `;
            break;

        case "map":
            html = `<input id="location" placeholder="Place / Address">`;
            break;

        case "calendar":
            html = `
          <input id="event" placeholder="Event Title">
          <input id="date" placeholder="YYYYMMDD">
        `;
            break;

        default:
            html = `<textarea id="data" placeholder="Enter content here"></textarea>`;
    }
    inputsDiv.innerHTML = html;
}

qrType.addEventListener("change", renderInputs);
renderInputs();

function generateQR() {
    qrCodeDiv.innerHTML = "";
    let data = "";

    switch (qrType.value) {
        case "wifi":
            data = `WIFI:T:${security.value};S:${ssid.value};P:${password.value};;`;
            break;

        case "email":
            data = `mailto:${email.value}?subject=${subject.value}&body=${body.value}`;
            break;

        case "phone":
            data = `tel:${phone.value}`;
            break;

        case "sms":
            data = `sms:${smsNumber.value}?body=${smsMsg.value}`;
            break;

        case "whatsapp":
            data = `https://wa.me/${waNumber.value}?text=${encodeURIComponent(waMsg.value)}`;
            break;

        case "upi":
            data = `upi://pay?pa=${upiId.value}&am=${amount.value}&tn=${note.value}`;
            break;

        case "map":
            data = `https://www.google.com/maps/search/?api=1&query=${location.value}`;
            break;

        case "calendar":
            data = `BEGIN:VEVENT\nSUMMARY:${event.value}\nDTSTART:${date.value}\nEND:VEVENT`;
            break;

        default:
            data = document.getElementById("data").value;
    }

    qr = new QRCode(qrCodeDiv, {
        text: data,
        width: 200,
        height: 200
    });
}

function downloadQR() {
    const img = qrCodeDiv.querySelector("img");
    if (!img) return alert("Generate QR first!");
    const a = document.createElement("a");
    a.href = img.src;
    a.download = "qr-code.png";
    a.click();
}

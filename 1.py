import qrcode

# Function to generate QR code
def generate_qr_code(data, filename="qrcode.png"):
    # Create QR code object with specific data
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    # Generate image and save it
    img = qr.make_image(fill="black", back_color="white")
    img.save(filename)
    print(f"QR code saved as {filename}")

# Example usage
data = "http://172.60.4.187:3000"
generate_qr_code(data)

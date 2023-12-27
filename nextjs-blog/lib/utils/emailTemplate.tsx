import { ContactUsFormData } from "../types/definitions";

export const generateEmailBodyToMyself = ({
  name,
  email,
  subject,
  message,
  userAgent,
}: ContactUsFormData & { userAgent: string }) => `
    <table>
    <tr>
        <th>Customer Name:</th>
        <td>${name}</td>
    </tr>
    <tr>
        <th>Email:</th>
        <td>${email}</td>
    </tr>
    <tr>
        <th>Subject:</th>
        <td>${subject}</td>
    </tr>
    <tr>
        <th>Message:</th>
        <td>${message}</td>
    </tr>

    <tr>
        <th>User Agent:</th>
        <td>${userAgent}}</td>
    </tr>
    </table>
`;

export const generateEmailBodyToCustomer = (name: string) => `
    <p>Hi ${name},</p>
    <p>Thank you for reaching out to Eastern Spa!</p>
    <p>For price inquiries, services or immediate reservations, please feel free to call us directly at <a href="tel:+16097703693">(609) 770-3693</a>. Our friendly team is ready to assist you promptly and schedule your visit.</p>
    <p>For any other queries or messages, our team will respond to your email shortly. We strive to provide you with the best experience and look forward to serving you soon.</p>

    <br/>

    <!-- Signature -->
    <p>
    <img src="https://next-project-mdsc.vercel.app/assets/img/full-logo.jpg" width="230" height="80" />
    </p>
    <p><strong>Best regards,</strong></p>
    <p><strong>Eastern Spa, LLC</strong></p>
    <p><strong>Tel: </strong><a href="tel:+16097703693">(609) 770-3693</a></p>
    <p><strong>Address: 1304 NJ-47 unit w, Rio Grande, NJ 08242</strong></p>
`;

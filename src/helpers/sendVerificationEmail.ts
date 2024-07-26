// import {resend} from "@/lib/resend"
// import VerificationEmail from "../../emails/VerificationEmail"
// import { ApiResponse } from "@/types/ApiResponse"

// export async function sendVerificationEmail(
//     email: string,
//     username: string,
//     verifyCode: string
// ) : Promise<ApiResponse>{
//     try{
//         await resend.emails.send({
//             from: 'onboarding@resend.dev',
//             to: email,
//             subject: 'FeedbackGhost | Verification Code',
//             react: VerificationEmail({username, otp:verifyCode}),
//           });
//         //   console.log("Verification email send succefully")
//         //   console.log("OTP ", verifyCode);
//         //   console.log("email ", email)
//         return {
//             success:true,
//             message: 'Verification email send successfully'
//         }

//     } catch (error){
//         console.log("Error Sending verification email", error)
//         return {
//             success:false,
//             message: 'Failed to send verification email'
//         }
//     }
// }



import nodemailer from 'nodemailer';
import { ApiResponse } from "@/types/ApiResponse";

const senderEmail = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
        user: senderEmail, // your email
        pass: pass // your email password
    }
});


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: senderEmail, // sender address
            to: email, // list of receivers
            subject: 'FeedbackGhost | Verification Code', // Subject line
            html: `<p>Hello ${username},</p>
                   <p>Your verification code is: <strong>${verifyCode}</strong></p>
                   <p>Thank you for using FeedbackGhost!</p>` // html body
        });

        // Log the message ID (optional)
        console.log("Message sent: %s", info.messageId);
        return {
            success: true,
            message: 'Verification email sent successfully'
        };
    } catch (error) {
        console.log("Error sending verification email", error);
        return {
            success: false,
            message: 'Failed to send verification email'
        };
    }
}

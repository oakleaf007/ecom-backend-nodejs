import pool from "../config/db.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../services/mail.js";
import crypto from 'node:crypto';
import jwt from "jsonwebtoken"

export const reqOtp = async (req, res) => {

    try {
        const { email } = req.body;


        if(!email || !email.includes('@')){
             return res.status(400).json({ message: 'Email is not valid' });
        }
        console.log(email)
        const userCheck = await pool.query("select id from users where email = $1", [email.toLowerCase()]);

        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const otp = crypto.randomInt(100000, 999999).toString();

        const expiresAt = "NOW() + Interval '5 minutes'";

        const salty = await bcrypt.genSalt(10);

        const hashed = await bcrypt.hash(otp, salty);

        const upsertQuery = `
              insert into otps (email, otp, expires_at)
              values( $1,$2,${expiresAt})
              on conflict (email)
              do update set otp = excluded.otp, expires_at = ${expiresAt}
            `
        await pool.query(upsertQuery, [email, hashed]);


        const subject = 'OTP';
        const textContent = ` your OTP is ${otp}. It expires in 5 minutes`;

        const mailLog = await sendEmail(email, subject, textContent);
        res.json({ message: "OTP send sooccessfully" });


    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'server error whille processing otp'+ err })
    }
}

export const verifyOtp = async (req, res) => {
    const { email, recOtp } = req.body;
    console.log(req.body)
    try {
        otpTrim = recOtp.trim();
        if(!email || !otpTrim){
            return res.status(400).json({message: "no email or otp recieved"})
        }
        const emailLower = email.toLowerCase();


        const result = await pool.query(
            "select  otp, expires_at from otps where email = $1", [emailLower]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "OTP not found or expired. Please request a new one." });
        }

        const { otp, expires_at } = result.rows[0];

        if (new Date() > expires_at) {
            await pool.query("Delete from otps where email = $1", [emailLower]);
            return res.status(400).json({ message: "otp has expired" });

        }


        const isMatch = await bcrypt.compare(otpTrim, otp);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP code." });
        }
        const signupToken = jwt.sign({
            verifiedEmail: emailLower
        },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
        console.log(signupToken)
        await pool.query("delete from otps where email = $1", [emailLower]);
        res.status(200).json({
            success:true,
            message: "email verified",
            signupToken : signupToken
        });
        
    } catch (err) {
        console.error("Verification error ", err);
        res.status(500).json({message: "Server error during Verification"});
    }
}
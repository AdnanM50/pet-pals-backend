import User from "../models/user.model"
import {numberGen,generateUid} from "../helper/helper";
import bcrypt from "bcrypt";
import Otp from "../models/otp.model";
export const findUser = async (req: any, res : any) => {
    try {
        const query = req.query;
        let find = await User.findOne(query);
        return res.status(200).json({
            error: false,
            msg: !find ? 'Account not found' : 'Account found',
            data: {
                account: !!find,
                role: find?.role,
            }
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Internal server error'
        })
    }
}


export const sendOtp = async (req: any, res : any) => {
    try {
        let body = req.body
        let otp = await numberGen();
        let find = await User.findOne({
            [!!body?.phone ? 'phone' : 'email']: body?.phone || body?.email
        })
        if (body.action === 'registration' && !!find) {
            return res.status(400).send({
                error: true,
                msg: 'Account already registered'
            })
        }
        if (body.action !== 'registration' && !find) {
            return res.status(400).send({
                error: true,
                msg: 'Account not found'
            })
        }
        if (!!body.phone) {
            let find = await Otp.findOne({ phone: body.phone, action: body.action })
            if (!!find) {
                return res.status(400).send({
                    error: true,
                    msg: 'Verification code already send. Try again later'
                })
            }
            await Otp.create({
                phone: body.phone,
                action: body.action,
                otp: otp
            });
            // await sendUserPhone({
            //     phone: body.phone,
            //     message: `Your verification code is ${otp}`
            // });

        }
        if (!!body.email) {
            let find = await Otp.findOne({ email: body.email, action: body.action })
            if (!!find) {
                return res.status(400).send({
                    error: true,
                    msg: 'Verification code already send. Try again later'
                })
            }
            await Otp.create({
                email: body.email,
                action: body.action,
                otp: otp
            })
            // await sendEmail(
            //     {
            //         email: body.email,
            //         subject: 'Verification Code',
            //         message: `Your verification code is ${otp}`
            //     }
            // )
        }
        return res.status(200).send({
            error: false,
            msg: 'OTP sent successfully',
            data: otp,
        })
    } catch (err) {
        return res.status(500).send({
            error: true,
            msg: 'Internal server error'
        })
    }
}
export const userRegistration = async (req: any, res : any) => {
    const uid = await generateUid('U-', User);
    try {
        const body = req.body;
        let query = {}
        const otp = await Otp.findOne({
            [!!body?.phone ? 'phone' : 'email']: body?.phone || body?.email,
            action: body.action,
        });
        const comTime = new Date(otp?.createdAt).getDate() * 2 * 60 * 1000 < new Date(otp?.createdAt).getDate();
        if (!otp || otp["otp"] !== body.otp || comTime || body.action != "registration") {
            return res.status(400).send({
                error: true,
                msg: 'Invalid verification code'
            })
        }
        if (!!body?.phone && !!body?.email) {
            query = {
                $or: [
                    { phone: body.phone },
                    { email: body.email }
                ]
            }
        } else {
            query = {
                [!!body?.phone ? 'phone' : 'email']: body?.phone || body?.email
            }
        }

        let find = await User.findOne(query);
        if (!!find) {
            return res.status(400).send({
                error: true,
                msg: 'User already registered'
            })
        }

        const newUser = {
            uid: uid,
            name: body.name,
            password: bcrypt.hashSync(body.password, 8),
            role: body.role || 'user',
        }
        // if (!!body.phone) newUser['phone'] = body.phone;
        // if (!!body.email) newUser['email'] = body.email;

        // if (body.role === 'employee' && body.permission) {
        //     newUser['permission'] = body.permission;
        // }
        let user = await User.create(newUser);
        return res.status(200).send({
            error: false,
            msg: 'User registered successfully',
            data: {
                role: user?.role,
            }
        })
    } catch (error) {
        return res.status(500).send({
            error: true,
            msg: 'Internal server error'
        })
    }


}
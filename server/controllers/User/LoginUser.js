// import User from '../../models/User.js'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

// const secretKey = 'Ayush'


// const generateJWT = async(id) => {
//     const token = jwt.sign({ id }, secretKey, {
//         expiresIn: '24h',
//     })
//     return token
// }

// export const loginUser = async(req, res) => {
//     const { email, password } = req.body

//     try {
//         const user = await User.findOne({ email })

//         if (!user) {
//             return res.status(200).json({ ok: false, msg: 'Email not found' })
//         }

//         const validPassword = bcrypt.compareSync(password, user.password)

//         if (!validPassword) {
//             return res.status(200).json({
//                 ok: false,
//                 msg: 'Incorrect Password',
//             })
//         }


//         const token = await generateJWT(user.id)

//         return res.status(200).json({
//             ok: true,
//             user: user,
//             msg: 'User Logged',
//             token,
//             id: user._id,
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(404).json({
//             ok: false,
//             msg: 'An error occured, contact an administrator',
//         })
//     }
// }



import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secretKey = 'Ayush';

const generateJWT = async(id) => {
    const token = jwt.sign({ id }, secretKey, {
        expiresIn: '24h',
    });
    return token;
}

export const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({ ok: false, msg: 'Email not found' });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(200).json({
                ok: false,
                msg: 'Incorrect Password',
            });
        }

        const token = await generateJWT(user._id);

        return res.status(200).json({
            ok: true,
            user: {
                _id: user._id,
                email: user.email,
                nickname: user.nickname,
                isAdmin: user.isAdmin, // Include admin status
            },
            msg: 'User Logged',
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            ok: false,
            msg: 'An error occurred, contact an administrator',
        });
    }
}
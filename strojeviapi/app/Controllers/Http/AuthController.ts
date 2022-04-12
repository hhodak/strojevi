import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {


    public async login({ request, auth, response }: HttpContextContract) {
        const username = request.input("username");
        const password = request.input("password");

        try {
            const token = await auth.use("api").attempt(username, password, {
                expiresIn: "10 days",
            });
            return response.json({
                message: 'Token generated',
                data: token,
                status: 'success'
            })

        } catch (error) {
            return response.json({
                message: 'Token not generated',
                data: {}
            })
        }
    }
    public async register({ request, auth }: HttpContextContract) {
        const email = request.input("email");
        const password = request.input("password");
        const username = request.input("username");
        const fullName = request.input("fullName");
        const newUser = new User();
        newUser.email = email;
        newUser.password = password;
        newUser.username = username;
        newUser.fullName = fullName;
        newUser.role_id = 1;
        newUser.status = "novokreiran";
        newUser.isActive = false
        await newUser.save();
        const token = await auth.use("api").login(newUser, {
            expiresIn: "10 days",
        });
        return token.toJSON();
    }

    public async user({ auth, response }: HttpContextContract) {
        return response.json({
            message: 'User fetched',
            data: auth.user
        })
    }

    public async logout({ response, auth }: HttpContextContract) {
        await auth.logout()
        return response.json({
            message: 'Successfully logged out',
            data: {}
        })
    }
}

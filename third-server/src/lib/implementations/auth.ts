import {database} from "$lib/database";
import * as crypto from "crypto";
import type { Login_Data, Register_Data, Login_Result, Register_Result, Log_out_Result, Encrypter, UIDRandomizer, User_data } from "$lib/interfaces/auth";

const UID_Randomizer: UIDRandomizer = {
    generate_id(): string {
        return crypto.randomUUID();
    }
};

const Encrypter_: Encrypter = {
    hash(password:string, salt: string): string {
        return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    }
}

export type Parse_Login =
    | { error: { code: number; data: any }; is_error: true }
    | { is_error: false; success: Login_Data
};

export type Parse_Register =
    | { error: { code: number; data: any }; is_error: true }
    | { is_error: false; success: Register_Data
};

export function register_data_form(formData: FormData): Parse_Register {
    const username = formData.get("username")?.toString()
	const password = formData.get ("password")?.toString()

    if (!username || !password) {
        return {is_error: true, error: { code: 400, data: {username: "username missing", password: "password missing"}}}
    }
    return {is_error:false, success: {username, password}};
}

export function login_data_form(formData: FormData): Parse_Login {
    const username = formData.get("username")?.toString()
	const password = formData.get ("password")?.toString()

    if (!username || !password) {
        return {is_error: true, error: { code: 400, data: {username: "username missing", password: "password missing"}}}
    }
    return {is_error:false, success: {username, password}};
}

export class SQLiteAuth implements User_data {
    async logout(sessiontoken: string): Promise<Log_out_Result> {
        try {
            const result = await database.user.findFirst({where:{session: sessiontoken}})
            if (result == undefined) {
                return {
                    is_error: true, error: {
                        code: 400,
                        data: { user: "Session nein"}
                    }
                }
            }
            const update = await database.user.update({
                where: { id: result.id},
                data: { session: ""}
            });
            return { is_error: false, success: true};
        }
        catch (error) {
            console.log(error);
            return {
                is_error: true, error: {
                    code:400,
                    data: {server: "database nein"}
                }
            }
        }
    }
    async login(logindata: Login_Data): Promise<Login_Result> {
        try {
            const result = await database.user.findFirst({
                where: { username: logindata.username}
            });
            console.log(result)

            if(!result) {
                return {
                    is_error: true, error: {
                        code:400,
                        data:{user: "Login failed"},
                    }
                }
            }

            const {salt, hash} = result;
            const newhash = Encrypter_.hash(logindata.password, salt);


            if (newhash != hash){
                return {
                    is_error: true, error: {
                        code:400,
                        data:{user: "Login failed"},
                    }
                }
            }

            const session = UID_Randomizer.generate_id();
            const update = await database.user.update({
                where: {id:result.id},
                data: {session}
            })

            return { is_error:false, success: {session: update.session}}

        }
        catch (error) {
            console.log(error);
            return{
                is_error: true, error: {
                    code:400,
                    data:{user: "Login failed"},
                }
            }
        }
    }

    async register(registerdata: Register_Data): Promise<Register_Result> {
        try {
            const result = await database.user.findFirst({
                where: {username: registerdata.username}
            })
            console.log(result)

            if (result){
                return {
                    is_error:true, error: {
                        code:400,
                        data: {user: "The user already exists"}
                    }
                }
            }

            const session = UID_Randomizer.generate_id()
            const salt = crypto.randomBytes(16).toString('hex')

            const hash = crypto.pbkdf2Sync(registerdata.password, salt, 1000, 64, 'sha512').toString('hex')
            const clicks = 0
            
            const create = await database.user.create({
                data: {session, username: registerdata.username, salt, hash, clicks}
            });

            return {is_error: false, success:{session: create.session}}
        }
        catch (error) {
            console.log(error)
            return {
                is_error:true, error: {
                    code:400,
                    data: {user: "Register failed"}
                }
            }
        }
    }
}
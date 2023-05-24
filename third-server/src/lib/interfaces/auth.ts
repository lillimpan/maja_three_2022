export type Register_Data = {
    password: string;
    username: string;
}

export type Login_Data = {
    password: string;
    username: string;
}

export type Login_Result =
    | { error: { code: number; data: any }; is_error: true }
    | { is_error: false; success: { session: string } 
};

export type Register_Result =
    | { error: { code: number; data: any }; is_error: true }
    | { is_error: false; success: { session: string } 
};

export type Log_out_Result =
    | { error: { code: number; data: any }; is_error: true }
    | { is_error: false; success: boolean 
};

export interface User_data {
    register(registerdata: Register_Data): Promise<Register_Result>
    login(logindata: Login_Data): Promise<Login_Result>
    logout(sessiontoken: string): Promise<Log_out_Result>
}

export interface UIDRandomizer {
    generate_id(): string;
}

export interface Encrypter{
    hash(password: string, salt: string): string;
}


const bcrypt = require("bcryptjs");

export function hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

// if the comparePassword return true then the user exist else does not exist.
export function comparePassword (raw: string, hash: string): boolean {
    return bcrypt.compareSync(raw, hash);
}

// /////////////////////////////////////////////////////////


export function random(len: number){
    let option = "qwertyuiopasdfghjlkzxcvmnb1234567890";
    let length = option.length;

    let ans = "";
    
    for (let i = 0; i < len; i++) {
        ans += option[Math.floor((Math.random()*length))]
        
    }
    return ans;
}
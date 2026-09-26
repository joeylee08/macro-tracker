import bcrypt from 'bcrypt'

const hashPassword = async (pass: string) => {
    return bcrypt.hash(pass, 12)
}

const verifyPassword = async (pass: string, passHash: string) => {
    return bcrypt.compare(pass, passHash)
}

export { hashPassword, verifyPassword }
const bcrypt = require("bcryptjs");

const encrypt = async (password) => {
    const satlRounds = 10;
    const hashedPassword = await bcrypt.hash(password, satlRounds);
    return hashedPassword;
}

const isMatching = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = { encrypt, isMatching };
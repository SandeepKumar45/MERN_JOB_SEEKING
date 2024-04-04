async function createRefreshToken(user){
    return await user.generateRefreshToken()
}

export {createRefreshToken}
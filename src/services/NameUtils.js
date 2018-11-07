export default {
    getName: u =>
        u.displayName,

    getFirstName: u =>
        (u.displayName || '').split(' ')[0],

    getLastName: u => {
        const fullName = (u.displayName || '').split(' ')
        return fullName[fullName.length - 1]
    }

}

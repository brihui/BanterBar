// Can be held in a database (FIREBASE).
const users = [];

// Connect user to a chat.
function userConnect(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

// Get current user.
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves chat.
function userDisconnect(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get room users.
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

// Export for use in other files.
module.exports = {
    userConnect,
    getCurrentUser,
    userDisconnect,
    getRoomUsers
}
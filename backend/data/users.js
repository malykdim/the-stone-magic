import bcrypt from 'bcryptjs';

const users = [
    {
        username: 'adminUser',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        username: 'johnDoe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        username: 'janeDoe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
];

export default users;
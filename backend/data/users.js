import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@placeholder.com',
        password: bcrypt.hashSync('dairy91@fake', 10),
        isAdmin: true
    },
    {
        name: 'Johnny Doe',
        email: 'johnny@placeholder.com',
        password: bcrypt.hashSync('dairy91@fake', 10),
    },
    {
        name: 'Jane Doe',
        email: 'jane@placeholder.com',
        password: bcrypt.hashSync('dairy91@fake', 10),
    },
]

export default users;
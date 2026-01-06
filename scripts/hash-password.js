import bcrypt from 'bcryptjs';

const password = 'admin';
const hash = bcrypt.hashSync(password, 10);

console.log('Hashed password for "admin":');
console.log(hash);

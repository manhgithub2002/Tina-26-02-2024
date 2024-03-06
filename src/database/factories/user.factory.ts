import { User, UserRole } from 'src/user/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { fakerVI } from '@faker-js/faker';
import * as argon2 from 'argon2';

const hashPassword = async (password: string) => {
  return await argon2.hash(password);
};

export default setSeederFactory(User, async () => {
  const user = new User();
  user.fullname = fakerVI.person.fullName();
  user.username = fakerVI.internet.userName({
    firstName: 'admin',
    lastName: user.fullname,
  });
  user.birthdate = fakerVI.date.birthdate();
  user.role = UserRole.ADMIN;
  user.email = fakerVI.internet.email({ firstName: user.fullname });
  user.password = await hashPassword('12345678');

  return user;
});

import bcrypt from 'bcryptjs';

interface AuthHandlerInterface {
  validatePassword: (passwordToValidate: string) => Promise<void>;
  hashPassword: (inputPassword: string) => Promise<string>;
}

const SALT_ROUNDS = 10;

export class AuthHandler implements AuthHandlerInterface {
  async validatePassword(passwordToValidate: string) {
    
    const isValid = await bcrypt.compare(passwordToValidate,)
  }

  async hashPassword(inputPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(inputPassword, salt);
    return hashedPassword;
  }
}


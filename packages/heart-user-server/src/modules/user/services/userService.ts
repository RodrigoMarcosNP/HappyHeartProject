import { IUserService, UserApp } from "./userService.interface";
import { logger } from '../../../helpers/logger'
import db from "@src/modules/db";
import bcryptjs from 'bcryptjs';

class UserService implements IUserService {// eslint-disable-line
    
    async getRandomTest(): Promise<any> {
        try {
            logger.info("success")
            return "it works";
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async updateUser(cpf: string, data: Partial<UserApp>): Promise<boolean> {
        const pool = await db.connect();
        try {
            const fields = [];
            const values = [];
            let index = 1;
    
            if (data.email) {
                fields.push(`email = $${index++}`);
                values.push(data.email);
            }
            if (data.password) {
                fields.push(`password = $${index++}`);
                values.push(data.password);
            }
            if (data.complete_name) {
                fields.push(`complete_name = $${index++}`);
                values.push(data.complete_name);
            }
            if (data.role) {
                fields.push(`role = $${index++}`);
                values.push(data.role);
            }
            if (data.birthday) {
                fields.push(`birthday = $${index++}`);
                values.push(data.birthday);
            }
    
            if (fields.length === 0) {
                throw new Error("No fields provided for update");
            }
    
            const query = `
                UPDATE user_app
                SET ${fields.join(", ")}
                WHERE cpf = $${index}
            `;

            values.push(cpf);
    
            await pool.query('BEGIN');
    
            const result = await pool.query(query, values);
    
            await pool.query('COMMIT');
    
            return result.rowCount > 0;
        } catch (error) {
            await pool.query('ROLLBACK');
            logger.error("Error in updateUser:", error);
            throw new Error('User update failed');
        } finally {
            pool.release();
        }
    }

    async registerUser(data: UserApp): Promise<any> {
        const pool = await db.connect();
        console.log(data)
        try {
            const query = `
                INSERT INTO user_app (cpf, email, password, complete_name, role, birthday)
                VALUES ($1, $2, $3, $4, $5, $6)
            `;              
            const values = [
                data.cpf, 
                data.email, 
                data.password, 
                data.complete_name, 
                data.role,
                data.birthday
            ];

            await pool.query('BEGIN');

            const result = await pool.query(query, values);

            await pool.query('COMMIT');

            if(result.rowCount > 0) {
                return true;
            } else {
                return false;
            }
          } catch (error) {
            await pool.query('ROLLBACK')
            logger.error("Error in getAuthUser:", error);
            throw error;
          } finally {
            pool.release();
          }
    }

    async deleteUser(data: {cpf: string}): Promise<boolean> {
        const pool = await db.connect();
        try {
            const query = `
                DELETE FROM user_app WHERE cpf = $1
            `;
            const values = [data.cpf];
    
            await pool.query('BEGIN');
    
            const result = await pool.query(query, values);
    
            await pool.query('COMMIT');
    
            return result.rowCount > 0;
        } catch (error) {
            await pool.query('ROLLBACK');
            logger.error("Error in deleteUser:", error);
            throw new Error('User deletion failed');
        } finally {
            pool.release();
        }
    }
    

    async AuthUser(data: { email: string; password: string }): Promise<string | null> {
        const pool = await db.connect();
        try {
            const query = `
                SELECT password, role FROM user_app WHERE email = $1 LIMIT 1
            `;
            const values = [data.email];
    
            const result = await pool.query(query, values);

            if (result.rowCount === 0) {
                return null;
            }
            
            
            const hashedPassword = result.rows[0].password;

            const isPasswordValid = await bcryptjs.compare(data.password, hashedPassword);
            console.log(isPasswordValid)
            return isPasswordValid ? result.rows[0].role : null;
    
        } catch (error) {
            logger.error("Error in AuthUser:", error);
            throw error;
        } finally {
            pool.release();
        }
    }
    
}

export default new UserService();
import { IUserService, UserApp } from "./userService.interface";
import { logger } from '../../../helpers/logger'
import db from "@src/modules/db";
import jwt from 'jsonwebtoken';
import { config } from "@src/config/config";
import CryptoJS from "crypto-js";

const JWT_EXPIRATION = '1h';

interface ExerciseData {
    patient_cpf: string;
    bpm_before: number;
    bpm_after: number;
    duration: number;
    distance_roaming: number;
    effort_degree: number;
    exercise_name: string;
    created_at: string;
  }

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
    
            const result = await pool.query(query, values);
    
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

    async getExercisesByPatientCpf(patient_cpf: string): Promise<any[]> {
        const pool = await db.connect();
        try {
            const query = `
            SELECT * FROM exercises WHERE patient_cpf = $1
            `;
            const result = await pool.query(query, [patient_cpf]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching exercises:', error);
            throw error;
        } finally {
            pool.release();
        }
    }

    async registerExercise(data: ExerciseData): Promise<boolean> {
        const pool = await db.connect();
        console.log(data);
        
        try {
          const query = `
            INSERT INTO exercises 
              (patient_cpf, bpm_before, bpm_after, duration, distance_roaming, effort_degree, exercise_name, created_at)
            VALUES 
              ($1, $2, $3, make_interval(secs => $4), $5, $6, $7, $8)
          `;
          const values = [
            data.patient_cpf,
            data.bpm_before,
            data.bpm_after,
            data.duration,
            data.distance_roaming,
            data.effort_degree,
            data.exercise_name,
            data.created_at // Add created_at to the values
          ];
      
          await pool.query('BEGIN');
          const result = await pool.query(query, values);
          await pool.query('COMMIT');
        
          return result.rowCount > 0;
        } catch (error) {
          await pool.query('ROLLBACK');
          logger.error("Error in registerExercise:", error);
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
    
            const result = await pool.query(query, values);
    
            return result.rowCount > 0;
        } catch (error) {
            await pool.query('ROLLBACK');
            logger.error("Error in deleteUser:", error);
            throw new Error('User deletion failed');
        } finally {
            pool.release();
        }
    }
    
    async getListByRole(role: string): Promise<any[]> {
        const pool = await db.connect();
        try {
            const query = `
                SELECT * FROM user_app WHERE role = $1
            `;
            const values = [role];

            const result = await pool.query(query, values);
            
            return result.rows;
        } catch (error) {
            logger.error("Error in getEvaluators:", error);
            throw new Error('Error fetching evaluators');
        } finally {
            pool.release();
        }
    }

    async getHemodynamicListByCpf(patientCpf: string): Promise<any[]> {
        const pool = await db.connect();
        try {
            // Query to fetch all hemodynamic data for a specific patientCpf
            const query = `
                SELECT * 
                FROM tbl_hemodynamic 
                WHERE patientCpf = $1
                ORDER BY created_at DESC;
            `;
            const values = [patientCpf];
    
            const result = await pool.query(query, values);
    
            return result.rows;
        } catch (error) {
            logger.error("Error fetching hemodynamic data:", error);
            throw new Error('Error fetching hemodynamic data');
        } finally {
            pool.release();
        }
    }

    async registerHemodynamic(hemodynamicData: any): Promise<boolean> {
        const pool = await db.connect();
        try {
            const { patientCpf, endTime, frequencyHeart, inputPad, inputPas, startTime, evaluatorOwner } = hemodynamicData;
    
            if (!patientCpf) {
                throw new Error('Missing patientCpf');
            }
    
            const query = `
                INSERT INTO tbl_hemodynamic (patientCpf, endTime, frequencyHeart, inputPad, inputPas, startTime, evaluatorOwner)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `;
    
            const values = [patientCpf, endTime, frequencyHeart, inputPad, inputPas, startTime, evaluatorOwner];
    
            const result = await pool.query(query, values);
            
            return result.rowCount > 0;
        } catch (error) {
            logger.error("Error in registerHemodynamic:", error);
            throw new Error('Error registering hemodynamic data');
        } finally {
            pool.release();
        }
    }

    async getUserByCpf(cpf: string): Promise<any | null> {
        const pool = await db.connect(); // Connection to the DB
        try {
            const query = `
                SELECT * FROM user_app WHERE cpf = $1 LIMIT 1
            `;
    
            const result = await pool.query(query, [cpf]);
    
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            logger.error("Error in getUserByCpf for CPF:", { cpf, error });
            throw new Error(`Error fetching user with CPF: ${cpf}`);
        } finally {
            pool.release();
        }
    }

    async AuthUser(data: { email: string; password: string }): Promise<any | null> {
        const pool = await db.connect();
        try {
            const query = `
                SELECT password, role, cpf FROM user_app WHERE email = $1 LIMIT 1
            `;
            const values = [data.email];
            console.log(`Checking credentials for email: ${data.email}`);
            const result = await pool.query(query, values);
    
            if (result.rowCount === 0) {
                console.log('No user found with this email');
                return null;
            }
    
            const hashedPassword = result.rows[0].password;
    
            // Fixed salt value ("10")
            const salt = "10";  
    
            // Hash the incoming password with the fixed salt
            const hashedInputPassword = CryptoJS.PBKDF2(data.password, salt, { keySize: 256 / 32, iterations: 10 }).toString(CryptoJS.enc.Hex);
            console.log(hashedInputPassword)
            console.log(hashedPassword)
            // Compare the hashes
            if (hashedInputPassword !== hashedPassword) {
                console.log('Password is invalid');
                return null;
            }
    
            const payload = {
                email: data.email,
                role: result.rows[0].role,
                cpf: result.rows[0].cpf
            };
            console.log(result.rows[0])
            const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    
            return {
                email: data.email,
                role: result.rows[0].role,
                token,
                cpf: payload.cpf
            };
    
        } catch (error) {
            logger.error("Error in AuthUser:", error);
            throw error;
        } finally {
            pool.release();
        }
    }
    
}

export default new UserService();
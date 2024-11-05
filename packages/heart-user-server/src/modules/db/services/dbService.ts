import { IDbService } from "./dbService.interface";
import { logger } from '../../../helpers/logger';
import db from "..";

class DatabaseService implements IDbService {
    
    async getRandomTest(): Promise<string> {
        try {
            logger.info("success");
            return "it works from db";
        } catch (error) {
            logger.error("Error in getRandomTest:", error);
            throw error;
        }
    }

    async getAuthUser(data: { email: string }): Promise<boolean> {
      const pool = await db.connect();
      
      try {
            const query = 'SELECT 1 FROM user_app WHERE email = $1 LIMIT 1';
            const values = [data.email];
            const result = await pool.query(query, values);
            return result.rowCount > 0; 
        } catch (error) {
            logger.error("Error in getAuthUser:", error);
            throw error;
        } finally {
          pool.release();
        }
    }
}

export default new DatabaseService();

import db from "..";
import CREATE_TODOS_MIGRATIONS from "./1_create_table";

const runDBMigrations = async () => {
  console.log('RUN DB MIGRATIONS')

  const client = await db.connect();

  try {
    await client.query('BEGIN');

    await client.query(CREATE_TODOS_MIGRATIONS);

    await client.query('COMMIT');

  } catch(err) {
    await client.query('ROLLBACK');

    console.log('DB MIGRATIONS FAILED');

    throw err;
  } finally {
    client.release();
    return true;
  }
}

export default runDBMigrations;
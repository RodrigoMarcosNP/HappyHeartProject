const CREATE_TODOS_MIGRATIONS = `
  CREATE TABLE IF NOT EXISTS user_app (
    cpf VARCHAR(11) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    complete_name VARCHAR(100) NOT NULL,
    role VARCHAR(8) NOT NULL CHECK (role IN ('Admin', 'Evaluator', 'Patient')),
    birthday DATE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS exercises (
      id SERIAL PRIMARY KEY,                
      patient_cpf VARCHAR(11) NOT NULL,     
      bpm_before INT CHECK (bpm_before > 0), 
      bpm_after INT CHECK (bpm_after > 0),   
      duration INTERVAL NOT NULL,            
      distance_roaming DECIMAL(5, 2),
      effort_degree SMALLINT CHECK (effort_degree BETWEEN 1 AND 10), 

      CONSTRAINT fk_patient
          FOREIGN KEY (patient_cpf)
          REFERENCES patients (cpf)
          ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS tbl_hemodynamic (
    id SERIAL PRIMARY KEY,
    patientCpf VARCHAR(11) REFERENCES user_app(cpf) ON DELETE CASCADE,
    endTime TIME NOT NULL,
    frequencyHeart INT NOT NULL,
    inputPad INT NOT NULL,
    inputPas INT NOT NULL,
    startTime TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

export default CREATE_TODOS_MIGRATIONS;
class RegisterRepository {
  createRegister = `
            INSERT INTO
                register (full_name, cpf, email, color, observation)
            VALUES
                ($1, $2, $3, $4, $5)
            RETURNING *
        ;`;
  findOneRegister = `
      SELECT * FROM
          register
      WHERE
          cpf = $1
          OR
          email = $1
          OR
          id::text = $1
    ;`;
  findAllColor = `
        SELECT * FROM
            register
        WHERE
            color = $1
    ;`;
  updateOneRegister = `
      UPDATE
          register
      SET
          full_name = $1,
          cpf = $2,
          email = $3,
          color = $4,
          observation = $5
      WHERE
          cpf = $2
      RETURNING *
    ;`;
}

export { RegisterRepository };

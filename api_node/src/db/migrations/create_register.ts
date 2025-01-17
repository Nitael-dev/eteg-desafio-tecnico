const createRegisterTable = `
    CREATE TABLE IF NOT EXISTS register (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name VARCHAR(255) NOT NULL,
        cpf VARCHAR(11) NOT NULL,
        email VARCHAR(255) NOT NULL,
        color SMALLINT NOT NULL CHECK (color BETWEEN 0 AND 6),
        observation VARCHAR(255)
    );
`;

export default createRegisterTable;

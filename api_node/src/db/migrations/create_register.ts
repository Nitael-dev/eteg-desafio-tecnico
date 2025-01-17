const createRegisterTable = `
    CREATE TABLE IF NOT EXISTS register (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name VARCHAR(255) NOT NULL,
        cpf VARCHAR(11) NOT NULL,
        email VARCHAR(255) NOT NULL,
        color SMALLINT NOT NULL CHECK (color BETWEEN 0 AND 6),
        observation VARCHAR(255),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE OR REPLACE TRIGGER set_timestamp
    BEFORE UPDATE ON register
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
`;

export default createRegisterTable;

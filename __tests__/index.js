const { generateCPF, validateCPF, completeVerifyDigitCPF, generateCNPJ } = require('../');

describe('#CPF', () => {
    test('deve gerar um CPF válido', () => {
        const document = generateCPF();
        expect(validateCPF(document)).toBeTruthy();
        expect(document).toMatch(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
    });

    test('deve completar o CPF com os digitos verificadores', () => {
        const document = completeVerifyDigitCPF('123456789');
        expect(document).toBe('123.456.789-09');
    });

    test('deve retornar uma exception caso o tamanho seja inválido', () => {
        expect(() => completeVerifyDigitCPF('123')).toThrow(Error);
    });

    test('deve retonar false ao inserir valores inválidos', () => {
        expect(validateCPF('11111111111')).toBeFalsy();
        expect(validateCPF('123')).toBeFalsy();
    });

    test('deve retornar sem máscara', () => {
        expect(generateCPF(false)).toHaveLength(11);
        expect(completeVerifyDigitCPF('123456789', false)).toHaveLength(11);
    });
});

describe('#CNPJ', () => {
    test('deve gerar um CNPJ válido', () => {
        const document = generateCNPJ()
        expect(document).toBeDefined();
        expect(document).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
    });

    test('deve retornar sem máscara', () => {
        expect(generateCNPJ(false)).toHaveLength(14);
    });
});
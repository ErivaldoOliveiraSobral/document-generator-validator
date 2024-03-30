const { randexp } = require('randexp');

const generateCNPJ = (mask = true) => {
	let cnpjStart = randexp(/\d{12}$/);
	const weightFirstVerifier = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
	const weightSecondVerifier = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

	const calculateVerifier = (cnpjBase, weight) => {
		const cnpjBaseArray = cnpjBase.split('').map(Number);

		const sum = cnpjBaseArray
			.map((number, index) => number * weight[index])
			.reduce((a, b) => a + b, 0);

		const remainder = sum % 11;

		/* istanbul ignore next: random condition */
		return sum % 11 < 2 ? 0 : 11 - remainder;
	};

	const verifyDigit1 = calculateVerifier(cnpjStart, weightFirstVerifier);
	const verifyDigit2 = calculateVerifier(
		cnpjStart.concat(verifyDigit1),
		weightSecondVerifier
	);

	const cnpjResult = cnpjStart.concat(verifyDigit1, verifyDigit2);

	return mask
		? cnpjResult.replace(
				/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/,
				'$1.$2.$3/$4-$5'
		  )
		: cnpjResult;
};

const generateCPF = (mask = true) => {
	let cpfStart = randexp(/\d{9}$/);

	const calculateVerifier = (cpfBase, multiplier) => {
		const cpfBaseArray = cpfBase.split('').map(Number);

		const sum = cpfBaseArray
			.map(number => {
				const newNumber = number * multiplier;
				multiplier -= 1;
				return newNumber;
			})
			.reduce((a, b) => a + b, 0);

		const remainder = sum % 11;

		/* istanbul ignore next: random condition */
		return remainder < 2 ? 0 : 11 - remainder;
	};

	const verifyDigit1 = calculateVerifier(cpfStart, 10);
	const verifyDigit2 = calculateVerifier(cpfStart.concat(verifyDigit1), 11);

	const cpfResult = cpfStart.concat(verifyDigit1, verifyDigit2);

	return mask
		? cpfResult.replace(/^(\d{3})(\d{3})?(\d{3})?(\d{2})?/, '$1.$2.$3-$4')
		: cpfResult;
};

const validateCPF = cpfNumber => {
	const cpfOnlyNumbers = cpfNumber.replace(/\D/g, '');

	if (cpfOnlyNumbers.length !== 11) {
		return false;
	}

	if (
		cpfOnlyNumbers === '00000000000' ||
		cpfOnlyNumbers === '11111111111' ||
		cpfOnlyNumbers === '22222222222' ||
		cpfOnlyNumbers === '33333333333' ||
		cpfOnlyNumbers === '44444444444' ||
		cpfOnlyNumbers === '55555555555' ||
		cpfOnlyNumbers === '66666666666' ||
		cpfOnlyNumbers === '77777777777' ||
		cpfOnlyNumbers === '88888888888' ||
		cpfOnlyNumbers === '99999999999'
	) {
		return false;
	}

	const cpfStart = cpfOnlyNumbers.substring(0, 9);

	const calculateVerifier = (cpfBase, multiplier) => {
		const cpfBaseArray = cpfBase.split('').map(Number);

		const sum = cpfBaseArray
			.map(number => {
				const newNumber = number * multiplier;
				multiplier -= 1;
				return newNumber;
			})
			.reduce((a, b) => a + b, 0);

		const remainder = (sum * 10) % 11;

		/* istanbul ignore next: random condition */
		return remainder === 10 || remainder === 11 ? 0 : remainder;
	};

	const verifyDigit1 = calculateVerifier(cpfStart, 10);
	const verifyDigit2 = calculateVerifier(cpfStart.concat(verifyDigit1), 11);

	const cpfResult = cpfStart.concat(verifyDigit1, verifyDigit2);

	return cpfResult === cpfOnlyNumbers;
};

const completeVerifyDigitCPF = (cpfNumber, mask = true) => {
	const cpfOnlyNumbers = cpfNumber.replace(/\D/g, '');

	if (cpfOnlyNumbers.length !== 9) {
		throw new Error('Invalid length');
	}

	const calculateVerifier = (cpfBase, multiplier) => {
		const cpfBaseArray = cpfBase.split('').map(Number);

		const sum = cpfBaseArray
			.map(number => {
				const newNumber = number * multiplier;
				multiplier -= 1;
				return newNumber;
			})
			.reduce((a, b) => a + b, 0);

		const remainder = (sum * 10) % 11;

		/* istanbul ignore next: random condition */
		return remainder === 10 || remainder === 11 ? 0 : remainder;
	};

	const verifyDigit1 = calculateVerifier(cpfOnlyNumbers, 10);
	const verifyDigit2 = calculateVerifier(
		cpfOnlyNumbers.concat(verifyDigit1),
		11
	);

	const cpfResult = cpfOnlyNumbers.concat(verifyDigit1, verifyDigit2);

	return mask
		? cpfResult.replace(/^(\d{3})(\d{3})?(\d{3})?(\d{2})?/, '$1.$2.$3-$4')
		: cpfResult;
};

module.exports = {
	generateCNPJ,
	generateCPF,
	validateCPF,
	completeVerifyDigitCPF
};

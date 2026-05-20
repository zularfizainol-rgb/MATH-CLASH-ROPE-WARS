export function generateTahap1Question() {
  const types = ['tambah', 'tolak', 'darab', 'bahagi'];
  const chosenType = types[Math.floor(Math.random() * types.length)];
  let num1, num2, text, ans;

  if (chosenType === 'tambah') {
    num1 = Math.floor(Math.random() * 50) + 5;
    num2 = Math.floor(Math.random() * 45) + 5;
    text = `${num1} + ${num2}`;
    ans = num1 + num2;
  } else if (chosenType === 'tolak') {
    num1 = Math.floor(Math.random() * 90) + 10;
    num2 = Math.floor(Math.random() * (num1 - 2)) + 1;
    text = `${num1} - ${num2}`;
    ans = num1 - num2;
  } else if (chosenType === 'darab') {
    const sifirAsas = [2, 3, 4, 5, 10];
    num1 = sifirAsas[Math.floor(Math.random() * sifirAsas.length)];
    num2 = Math.floor(Math.random() * 9) + 1;

    if (Math.random() > 0.5) {
      text = `${num1} × ${num2}`;
    } else {
      text = `${num2} × ${num1}`;
    }
    ans = num1 * num2;
  } else {
    const sifirAsas = [2, 3, 4, 5, 10];
    num2 = sifirAsas[Math.floor(Math.random() * sifirAsas.length)];
    ans = Math.floor(Math.random() * 9) + 1;
    num1 = num2 * ans;
    text = `${num1} ÷ ${num2}`;
  }

  return { questionText: text, answer: ans };
}

export function generateTahap2Question() {
  const types = ['tambah', 'tolak', 'darab', 'bahagi'];
  const chosenType = types[Math.floor(Math.random() * types.length)];
  let num1, num2, text, ans;

  if (chosenType === 'tambah') {
    num1 = Math.floor(Math.random() * 900) + 100;
    num2 = Math.floor(Math.random() * 900) + 100;
    text = `${num1} + ${num2}`;
    ans = num1 + num2;
  } else if (chosenType === 'tolak') {
    num1 = Math.floor(Math.random() * 900) + 100;
    num2 = Math.floor(Math.random() * (num1 - 10)) + 10;
    text = `${num1} - ${num2}`;
    ans = num1 - num2;
  } else if (chosenType === 'darab') {
    // 2 digit x 1 digit
    num1 = Math.floor(Math.random() * 89) + 11;
    num2 = Math.floor(Math.random() * 8) + 2;
    if (Math.random() > 0.5) {
      text = `${num1} × ${num2}`;
    } else {
      text = `${num2} × ${num1}`;
    }
    ans = num1 * num2;
  } else {
    // 2-3 digit / 1 digit resulting in whole number
    num2 = Math.floor(Math.random() * 8) + 2;
    ans = Math.floor(Math.random() * 90) + 10;
    num1 = num2 * ans;
    text = `${num1} ÷ ${num2}`;
  }

  return { questionText: text, answer: ans };
}

export function generateQuestion(tahap: 1 | 2) {
  if (tahap === 1) return generateTahap1Question();
  return generateTahap2Question();
}

export function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

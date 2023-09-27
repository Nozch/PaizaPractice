// src/queryMenu/vtuber/bank.ts
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const [companyCount, transactionCount] = inputLines[0].split(" ").map(Number);
  let companies = new Map;
  inputLines.slice(1, 1 + companyCount).map((line, i) => {
    const [company, secretNumberStr, balanceStr] = line.split(" ");
    const secretNumber = +secretNumberStr;
    const balance = +balanceStr;
    const account = { secretNumber, balance };
    companies.set(company, account);
  });
  const transactionArr = inputLines.slice(1 + companyCount).map((line) => {
    const [company, secretNumberStr, balanceStr] = line.split(" ");
    const secretNumber = +secretNumberStr;
    const balance = +balanceStr;
    return { company, secretNumber, balance };
  });
  for (const transaction of transactionArr) {
    const { secretNumber, balance: prevBalance } = companies.get(transaction.company);
    if (secretNumber === transaction.secretNumber) {
      const newBalance = prevBalance - transaction.balance;
      companies.set(transaction.company, { secretNumber, balance: newBalance });
    }
  }
  for (const [company, account] of companies.entries()) {
    console.log(company, account.balance);
  }
}

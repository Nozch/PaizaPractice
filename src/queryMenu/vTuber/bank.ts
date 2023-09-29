// companyCount = 73825, transactionCount = 83746で 0.83秒

for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  const [companyCount, transactionCount] = inputLines[0].split(' ').map(Number)

  type transactionInfo = {
    company: string // 残高を引き出す人
    secretNumber: number // 暗証番号
    balance: number // 残高
  }

  type Account = {
    secretNumber: number
    balance: number
  }

  // 社名をキーのMapを作ることでsecretNumberをすぐ呼べるようにする
  let companies = new Map()
  
  inputLines
  .slice(1, 1 + companyCount)
  .map((line) => {
    const [company, secretNumberStr, balanceStr] = line.split(' ')
    const secretNumber = +secretNumberStr
    const balance = +balanceStr
    const account: Account = { secretNumber, balance }
    companies.set(company, account)
  })


  const transactionArr: transactionInfo[] = inputLines
  .slice(1 + companyCount)
  .map((line) => {
    const [company, secretNumberStr, balanceStr] = line.split(' ')
    const secretNumber = +secretNumberStr
    const balance = +balanceStr
    return { company, secretNumber, balance }
  })

  for (const transaction of transactionArr) {
    const { secretNumber, balance: prevBalance } = companies.get(transaction.company)
    if(secretNumber === transaction.secretNumber) {

      const newBalance = prevBalance - transaction.balance
      companies.set(transaction.company, { secretNumber, balance: newBalance })
    }
  }

  for (const [company, account] of companies.entries()) {
    console.log(company, account.balance)
  }


}
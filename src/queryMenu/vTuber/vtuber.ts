// chatCount = 94872 の時、 0.84秒で完了する
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")
  const chatCount = Number(inputLines[0])

  let superChatSums = new Map()
  let members: string[] = []

  inputLines
  .slice(1)
  // chat の数 = chatCount(使われていない)
  .map((chat) => {
    // 入力は　act = joinの時 "name join membership!"
    // act = giveの時 "name give money !" 
    const [name, act, moneyStr] = chat.split(' ')
    if(act === 'give') {
      const prevSuperChatSum = superChatSums.get(name) || 0
      const money = +moneyStr
      superChatSums.set(name, money + prevSuperChatSum)
    } else {
      members.push(name)
    }
  })

  // 名前:string, superchat合計額: number
  const userAndSumArr: [string, number][]= [...superChatSums.entries()]

  // superChatの総額(多い順)でソートした後, その順序を崩さずに名前の辞書順(z -> a)でソートする
  userAndSumArr.sort((a, b) => b[1] - a[1] || b[0].localeCompare(a[0])) 

  // membershipに加入した人は辞書順(a -> z)にする
  members.sort((a, b) => a.localeCompare(b))

  userAndSumArr.forEach((userAndSum) => {
    // 名前を出力    
    console.log(userAndSum[0])
  })
  members.forEach((member) => console.log(member))


}
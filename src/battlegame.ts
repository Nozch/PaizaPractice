for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputlines = chunkText.split("\n")

  const players_count = inputlines[0].split(" ").map(Number)[0]
  const attack_count = inputlines[0].split(" ").map(Number)[1]

  interface Attack {
    frame: number;
    damage: number;
  }

  type Player = {
    attacks: Attack[]
    hp: number
  }
  // attacksは　三つのAttackの配列


  const players: Player[] = []
  
  for(let i = 0; i < players_count; i++) {
    const hp = inputlines[1 + i].split(" ").map(Number)[0]
    const attacks: Attack[] = []
    for(let j = 0; j < 3; j++) {
      const frame: Attack["frame"] = inputlines[1 + i].split(" ").map(Number)[2 * j + 1]
      const damage: Attack["damage"] = inputlines[1 + i].split(" ").map(Number)[2 * j + 2]
      const attack: Attack = { frame, damage }
      attacks.push(attack);
    }

    const player: Player = { attacks, hp };
    players.push(player);
  }
  // console.log(players)

  type AttackBlock = {
    attacker: number
    attack: Attack
    isAttackSpecial: boolean
    attackIndex: number
    blocker: number
    block: Attack
    blockIndex: number
    isBlockSpecial: boolean
  }

  type Sequence = AttackBlock[]

  const attack_sequence: Sequence = []

  for(let i = 0; i < attack_count; i++) {
    const attacker_index = inputlines[i + players_count + 1].split(" ").map(Number)[0] - 1
    const attackIndex = inputlines[i + players_count + 1].split(" ").map(Number)[1] - 1
    const blocker_index = inputlines[i + players_count + 1].split(" ").map(Number)[2] - 1
    const blockIndex = inputlines[i + players_count + 1].split(" ").map(Number)[3] - 1

    const attack = players[attacker_index]["attacks"][attackIndex]
    const block = players[blocker_index]["attacks"][blockIndex]
    const isAttackSpecial = isSpecialAttack(attack)
    const isBlockSpecial = isSpecialAttack(block)
    const attacker = attacker_index
    const blocker = blocker_index 
    const attackBlock: AttackBlock = { attacker, attack, attackIndex, blocker, block, blockIndex, isAttackSpecial, isBlockSpecial }
    attack_sequence.push(attackBlock)

  }

  console.log(attack_sequence)


  function isSpecialAttack(attack: Attack): boolean {
    if(attack["frame"] === 0 && attack["damage"] === 0) {
      return true
    } else {
      return false;
    }
  }

  function decreaseFrameIncreaseDamage(players: Player[], whoChanges: number, specialAttackIndex: number): Attack[] {
    const enhancedAttack = players[whoChanges]["attacks"].map((attack, index) => {
      if(index === specialAttackIndex) {
        return attack
      }
      const enhancedFrame = attack["frame"] - 3 < 0 ? 0 : attack["frame"] - 3
      const enhancedDamage = attack["damage"] + 5 < 0 ? 0 : attack["damage"] + 5

      return { "frame": enhancedFrame, "damage": enhancedDamage }
    });

    return enhancedAttack;
  }

  function playerDamages(sequence: Sequence, players: Player[]) {
    for(let i = 0; i < sequence.length; i++) {
      const attackBlock = sequence[i];
      const attack = attackBlock["attack"]
      const block = attackBlock["block"]
      
      if(isSpecialAttack(attack) && isSpecialAttack(block)) {
        const enhancedAttack = decreaseFrameIncreaseDamage(players, attackBlock["attacker"], attackBlock["attackIndex"])
        console.log(enhancedAttack)
        const enhancedBlock = decreaseFrameIncreaseDamage(players, attackBlock["blocker"], attackBlock["blockIndex"])
      
      } else if(isSpecialAttack(attack)) {
        const enhancedAttack = decreaseFrameIncreaseDamage(players, attackBlock["attacker"], attackBlock["attackIndex"])
        const decreasedHealth = players[attackBlock["attacker"]]["hp"] - block["damage"]

      } else if(isSpecialAttack(block)) {
        const enhancedBlock = decreaseFrameIncreaseDamage(players, attackBlock["blocker"], attackBlock["blockIndex"])
        const decreasedHealth = players[attackBlock["blocker"]]["hp"] - attack["damage"]

      } else if(attack["frame"] > block["frame"]) {
        const decreasedHealth = players[attackBlock["attacker"]]["hp"] - attack["damage"]
      } else if(attack["frame"] < block["frame"]) {
        
      }
    }
  }
}
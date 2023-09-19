for await (const chunk of Bun.stdin.stream()) {
  

  interface Move {
    frame: number;
    damage: number;
    isSpecial: boolean; // 強化技かどうか
  }

  type Player = {
    moves: Move[]
    hp: number
  }
  // movesは　三つのMoveの配列 技1 -> moves[0]

  interface BattlePlayer  {
    isMoveSpecial: boolean
    playersIndex: number
    movesIndex: number
  }

  interface Battle {
    attacker: BattlePlayer
    blocker: BattlePlayer
  }
  
  // 強化技を使用するとプレイヤーの持つそれ以外の技ステータスを変える
  type EnhanceMove = (moves: Move[]) => Move[]
  const FrameSpecialDecrese = 3;
  const DamageSpecialIncrese = 5
  const enhanceMove: EnhanceMove = (moves) => {
    const enhancedMoves: Move[] = moves.map((move) => {
      if(move.isSpecial) {
        return move
      } else {
        return (
          {
            frame: move.frame - FrameSpecialDecrese < 0 ? 0 : move.frame - FrameSpecialDecrese,
            damage: move.damage + DamageSpecialIncrese,
            isSpecial: false
          }
        )
      }
    })
    return enhancedMoves
  }

  function applyEnhancedMoves(player: Player) {
    const enhancedMoves = enhanceMove(player.moves)
    player.moves = enhancedMoves
  }

  // battlesを元にplayersを直接変更する
  function applyDamages(battles: Battle[], players: Player[]) {
    battles.forEach((battle) => {
      const attacker = players[battle.attacker.playersIndex]
      const attack = attacker.moves[battle.attacker.movesIndex]

      const blocker = players[battle.blocker.playersIndex]
      const block = blocker.moves[battle.blocker.movesIndex]

      // hpがどちらか０の場合、バトルできない
      if(attacker.hp <= 0 || blocker.hp <= 0) return

      if(battle.attacker.isMoveSpecial) {
      // 強化技を使用した方は相手の技を受ける + 技を強化する
        attacker.hp -= block.damage
        applyEnhancedMoves(attacker)
      } else if(battle.blocker.isMoveSpecial) {
        blocker.hp -= attack.damage
        applyEnhancedMoves(blocker)  
        // frameを比較する
      } else if(attack.frame < block.frame) {
        blocker.hp -= attack.damage
      } else if(block.frame < attack.frame) {
        attacker.hp -= block.damage
      }
      // 攻撃技のframeが互角の時は何もしない

    })
  }

  // 入力の 1 ~ n をPlayerとして配列に入れる 
  function createPlayers(inputLines: string[], playersCount: number): Player[] {
    let players: Player[] = []
    for(let i = 0; i < playersCount; i++) {
      const [hp, ...moveProps] = inputLines[1 + i].split(" ").map(Number)
      const moves: Move[] = []
  
      for(let j = 0; j < 3; j++) {
        const frame = moveProps[2 * j]
        const damage = moveProps[2 * j + 1]
        const isSpecial = frame === 0 && damage === 0 ? true : false

        const move: Move= { frame, damage, isSpecial }
        moves.push(move);
      }
  
      const player: Player = { moves, hp };
      players.push(player);
    }
    return players;
  }

  // Playerに続く
  function createBattles(inputLines: string[], playersCount: number, battleCount: number, players: Player[]): Battle[] {
    const battles: Battle[] = []
    for(let i = 0; i < battleCount; i++) {
      const [attackerIndex, attackIndex, blockerIndex, blockIndex] = inputLines[i + playersCount + 1].split(" ").map(Number).map(x => x - 1)
      const attacker = players[attackerIndex]
      const attack = attacker.moves[attackIndex]
      const blocker = players[blockerIndex]
      const block = blocker.moves[blockIndex]

      const battle: Battle = {
        attacker: {
          isMoveSpecial: attack.isSpecial,
          playersIndex: attackerIndex,
          movesIndex: attackIndex
        },
        blocker: {
          isMoveSpecial: block.isSpecial,
          playersIndex: blockerIndex,
          movesIndex: blockIndex
        }
      }
  
      battles.push(battle) 
    }
    return battles
  }

  function countAlivePlayers(players: Player[]) : number {
    const alivePlayers = players.filter((player) => player.hp  > 0)
    return alivePlayers.length
  }


  const chunkText = Buffer.from(chunk).toString();
  const inputlines = chunkText.split("\n")

  const playersCount = inputlines[0].split(" ").map(Number)[0]
  const battleCount = inputlines[0].split(" ").map(Number)[1]

  const players = createPlayers(inputlines, playersCount)
  // console.log(players)

  const battles = createBattles(inputlines, playersCount, battleCount, players)
  // console.log(battles)

  applyDamages(battles, players)
  // console.log(players)

  const alivePlayersCount = countAlivePlayers(players)
  console.log(alivePlayersCount)
}

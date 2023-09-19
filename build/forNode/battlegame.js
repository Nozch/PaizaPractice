// src/battlegame.ts
// runs on node

process.stdin.resume();
process.stdin.setEncoding('utf8');
var inputlines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  inputlines.push(line);
});
reader.on('close', () => {
    let applyEnhancedMoves = function(player) {
    const enhancedMoves = enhanceMove(player.moves);
    player.moves = enhancedMoves;
  }, applyDamages = function(battles2, players2) {
    battles2.forEach((battle) => {
      const attacker = players2[battle.attacker.playersIndex];
      const attack = attacker.moves[battle.attacker.movesIndex];
      const blocker = players2[battle.blocker.playersIndex];
      const block = blocker.moves[battle.blocker.movesIndex];
      if (attacker.hp <= 0 || blocker.hp <= 0)
        return;
      if (battle.attacker.isMoveSpecial) {
        attacker.hp -= block.damage;
        applyEnhancedMoves(attacker);
      } else if (battle.blocker.isMoveSpecial) {
        blocker.hp -= attack.damage;
        applyEnhancedMoves(blocker);
      } else if (attack.frame < block.frame) {
        blocker.hp -= attack.damage;
      } else if (block.frame < attack.frame) {
        attacker.hp -= block.damage;
      }
    });
  }, createPlayers = function(inputLines, playersCount2) {
    let players2 = [];
    for (let i = 0;i < playersCount2; i++) {
      const [hp, ...moveProps] = inputLines[1 + i].split(" ").map(Number);
      const moves = [];
      for (let j = 0;j < 3; j++) {
        const frame = moveProps[2 * j];
        const damage = moveProps[2 * j + 1];
        const isSpecial = frame === 0 && damage === 0 ? true : false;
        const move = { frame, damage, isSpecial };
        moves.push(move);
      }
      const player = { moves, hp };
      players2.push(player);
    }
    return players2;
  }, createBattles = function(inputLines, playersCount2, battleCount2, players2) {
    const battles2 = [];
    for (let i = 0;i < battleCount2; i++) {
      const [attackerIndex, attackIndex, blockerIndex, blockIndex] = inputLines[i + playersCount2 + 1].split(" ").map(Number).map((x) => x - 1);
      const attacker = players2[attackerIndex];
      const attack = attacker.moves[attackIndex];
      const blocker = players2[blockerIndex];
      const block = blocker.moves[blockIndex];
      const battle = {
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
      };
      battles2.push(battle);
    }
    return battles2;
  }, countAlivePlayers = function(players2) {
    const alivePlayers = players2.filter((player) => player.hp > 0);
    return alivePlayers.length;
  };
  const FrameSpecialDecrese = 3;
  const DamageSpecialIncrese = 5;
  const enhanceMove = (moves) => {
    const enhancedMoves = moves.map((move) => {
      if (move.isSpecial) {
        return move;
      } else {
        return {
          frame: move.frame - FrameSpecialDecrese < 0 ? 0 : move.frame - FrameSpecialDecrese,
          damage: move.damage + DamageSpecialIncrese,
          isSpecial: false
        };
      }
    });
    return enhancedMoves;
  };


  const playersCount = inputlines[0].split(" ").map(Number)[0];
  const battleCount = inputlines[0].split(" ").map(Number)[1];
  const players = createPlayers(inputlines, playersCount);
  const battles = createBattles(inputlines, playersCount, battleCount, players);
  applyDamages(battles, players);
  const alivePlayersCount = countAlivePlayers(players);
  console.log(alivePlayersCount);
});
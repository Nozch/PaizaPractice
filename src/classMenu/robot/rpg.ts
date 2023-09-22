for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputlines = chunkText.split("\n")


  const wanderer_event_count_arr = inputlines[0].split(" ").map(Number)
  // [N, K]  Nはwandererの人数, Kはeventの回数
  const wanderer_count = wanderer_event_count_arr[0]
  const event_count = wanderer_event_count_arr[1]

  let wanderers_status = []
  for(let i = 1; i < wanderer_count + 1; i++) {
    wanderers_status.push(inputlines[i].split(" ").map(Number))
  }

  // console.log(wanderers_status)
  // [
  //   [ 23, 128, 533, 552, 44, 69, 420 ]
  // ]
  const input_index_event_start = wanderer_count + 1
  const input_index_event_end = wanderer_count + 1 + event_count
  
  let all_event_arr = []
  for(let i = input_index_event_start; i < input_index_event_end; i++) {
    all_event_arr.push(inputlines[i].split(" "))
  }

  function convertStringsToNumbers(array) {
    return array.map((elem) => {
      const converted = Number(elem);
      return isNaN(converted) ? elem : converted;
    })
  }
  // 配列の要素をNumberに変換し
  // 文字列の場合NaNになるのでそのままにする

  const all_event_arr_numbered = all_event_arr.map((elem) => convertStringsToNumbers(elem));
  // [
  //   [ 1, "muscle_training", 565, 241 ], [ 1, "study", 132 ], [ 1, "levelup", 379, 585, 4, 145, 276, 8 ]
  // ]

  for(let i = 0; i < all_event_arr.length; i++) {
    let an_event = all_event_arr_numbered[i] 
    let which_status_increase = an_event[1]
    
    let wanderer_index = (all_event_arr_numbered[i][0]) - 1
    // ステータスを上昇させるwandererのindex
    let a_wanderer_status = wanderers_status[wanderer_index]
    // 元々のステータス

    switch(which_status_increase) {
      case 'levelup':
        a_wanderer_status[0] += 1
        for(let i = 0; i < 6; i++) {
            // an_event[2 ~ 8]にステータス上昇値
            a_wanderer_status[1 + i] += an_event[2 + i]
          }
        break;
      case 'muscle_training':
        for(let i = 0; i < 2; i++) {
          // a_wanderer_status[1 | 2] 
          a_wanderer_status[1 + i] += an_event[2 + i]
        }
        break;
      case 'running':
        for(let i = 0; i < 2; i++) {
          // a_wanderer_status[3 | 4]
          a_wanderer_status[3 + i] += an_event[2 + i]
        }
        break;
      case 'study':
        a_wanderer_status[5] += an_event[2]
        break;
      case 'pray':
        a_wanderer_status[6] += an_event[2]
        break;
    }
  }
  wanderers_status.map((wanderer_status_arr) => console.log(wanderer_status_arr.join(" ")))

}

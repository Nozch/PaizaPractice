for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputlines = chunkText.split("\n")

  //　地点の数N, 移動の回数K, 移動を開始する地点の番号S
  const N_K_S = inputlines[0].split(" ").map(Number)
  const place_total = N_K_S[0]
  const move_total = N_K_S[1]
  const start_from = N_K_S[2]

  let alphabet_roadone_roadtwo = []
  let alpha_arr = []
  for(let i = 1; i <= place_total; i++) {
    const arr = inputlines[i].split(" ")
    alphabet_roadone_roadtwo.push(arr);
    alpha_arr.push(arr[0])
  }
  // console.log(alphabet_roadone_roadtwo);
  // [
  //   [ "p", "2", "4" ], [ "a", "3", "1" ], [ "i", "4", "2" ], [ "z", "1", "2" ]
  // ]
  
  // console.log(alpha_arr)
  // ["p", "a", "i", "z"]

  let roads_connected_arr = []
  for(let i = 0; i < place_total; i++) {
    const numbered_arr = alphabet_roadone_roadtwo[i].filter(elem => !isNaN(Number(elem))).map(Number);
    roads_connected_arr.push(numbered_arr)
  }
  // console.log(roads_connected_arr) 
  // [ [2, 4], [3, 1], [4, 2], [1, 2]]


  let roads_selected_arr = []

  for(let i = place_total + 1; i <= place_total + move_total; i++) {
    roads_selected_arr.push(Number(inputlines[i]))
  }

  // console.log(roads_selected_arr) 
  // [1, 1, 1, 2]
  
  let result_arr = [alpha_arr[start_from - 1]]
  let prev_place = null

  for(let i = 0; i < move_total; i++) {
    if(i === 0) {
      let first_connected_alpha_index = roads_connected_arr[start_from - 1][roads_selected_arr[i] - 1] - 1

      // console.log(connected_alpha_index)
      // 1
      result_arr.push(alpha_arr[first_connected_alpha_index])
      // aをpush
      prev_place = first_connected_alpha_index
    } else {
      let connected_alpha_index = roads_connected_arr[prev_place][roads_selected_arr[i] - 1] - 1

      result_arr.push(alpha_arr[connected_alpha_index])
      prev_place = connected_alpha_index
    }

  }
  const result = result_arr.join('')
  console.log(result)
}

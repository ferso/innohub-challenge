
class IslandCount {
  setInput(input){
    this.input   = input
    this.nmap    = []
    this.islands = []
  }
  run(){
    this.createCoords()
    this.counter()
  }
  //create virual coords
  createCoords(){
    let rows  = this.input.split("\n")
    for(let r=0; r < rows.length; r++){
      let strRow = rows[r].split('')
      this.nmap[r] = []
      for(let x in strRow){
        this.nmap[r][x] = undefined
      }
      let x = 0
      this.islands[r] = strRow
    }
  }
  //ounter of islands
  counter (){
    this.count = 0;
    this.isn   = 0;
    this.islands.forEach((row, index) => {
      row.forEach((value, colPos) => {
        if (value !== '0')
         return;

        let n       = index > 0 ? this.nmap[index-1][colPos] : undefined;
        let w       = this.nmap[index][colPos-1];
        //if this part of island doestn exist
        if (n===undefined && w===undefined) {
          this.isn++;
          this.nmap[index][colPos] = this.isn;
          this.count++;
        } else if (n===w || n===undefined || w===undefined) {
          this.nmap[index][colPos] = n || w;
        } else{
          this.nmap[index][colPos] = n || w;
          this.count--;
        }
      })
    })
    this.count
  }
  result (grid, count){
     console.log('Map input:')
     console.log('---------------------')
     console.log(this.input);
     console.log('---------------------')
     console.log('Total Islands:', this.count)
     console.log('---------------------')
  }
}

//Inputs
let input1 = '.0...\n.00..\n....0'
let input2 = '0...0\n..0..\n0...0'
let input3 = '..000.\n..000.\n..000.\n.0....\n..000.'


//Instance IslandCount
let Island = new IslandCount()

//ok Lets count
//Input1
Island.setInput(input1)
Island.run()
Island.result()

//Input2
Island.setInput(input2)
Island.run()
Island.result()

//Input3
Island.setInput(input3)
Island.run()
Island.result()

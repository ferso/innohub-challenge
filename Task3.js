let objA = new Set(['F','G'])
let objB = new Set(['E','F','G'])


const getArray = (o) =>{
  return Array.from(o);
}

// isSubsetOf
const isSubsetOf = (a,b) => {
  let results = []
  let sub = getArray(a);
  b.forEach((item,index)=>{
    if(sub.includes(item)){
       results.push(item)
    }
  })
  return results.length === sub.length
}

// isSupersetOf
const isSupersetOf = (a,b) => {
  let results = []
  let sub = getArray(b);
  a.forEach((item,index)=>{
    if(sub.includes(item)){
       results.push(item)
    }
  })
  return results.length === sub.length
}

//isSubsetOf test
console.log( isSubsetOf(objA,objB) )
console.log( isSubsetOf(objB,objA) )


//isSupersetOf test
console.log( isSupersetOf(objA,objB) )
console.log( isSupersetOf(objB,objA) )

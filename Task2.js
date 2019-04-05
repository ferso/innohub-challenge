let accounts = { "Accounts" :[
        {
            "Id": 22,
            "Name": "Fernando Soto",
            "LogonCount" : 1,
            "LastLogon" : new Date(2018, 1, 14, 16, 15, 6, 111)
        },
        {
            "Id": 21,
            "Name": "John Shepherd",
            "LogonCount" : 13,
            "LastLogon" : new Date(2017, 1, 14, 16, 15, 6, 111)
        }
      ]
    }
let logons = { "Logons" : [
  {
      "Id": 21,
      "Name": "John Shepherd",
      "Date" : new Date(2018, 1, 14, 16, 15, 6)
  },
  {
      "Id": 21,
      "Name": "John Shepherd",
      "Date" : new Date(2019, 1, 14, 16, 15, 6)
  },
  {
      "Id": 22,
      "Name": "Fernando Soto",
      "Date" : new Date(2019, 6, 14, 16, 15, 6)
  },
  {
      "Id": 25,
      "Name": "Jhon Wayne",
      "Date" : new Date(2019, 3, 5, 0, 0, 0)
  },
  {
      "Id": 26,
      "Name": "Walter White",
      "Date" : new Date(2019, 1, 5, 0, 0, 0)
  }
]}


// get the greater logon date for each id account
const normalizeLogonsCollection = () => {
    let o = {}
    logons['Logons'].forEach((item,index)=>{
      if( typeof(o[item.Id]) !== 'undefined'){
        o[item.Id] = item.Date.getTime() > o[item.Id].Date.getTime() ? item : o[item.Id]
      }else{
        o[item.Id] = item
      }
    })
    let filter = []
    for(let x in o){
        filter.push(o[x])
    }
    return filter
}

const findAccount = (id) =>{
  return new Promise( (resolve, reject) => {
    accounts['Accounts'].forEach((item,index)=>{
      if(item.Id == id){
        resolve(item)
      }
    })
    resolve(null)
  })
}

const updateAccount = (account) =>{
  return new Promise( (resolve, reject) => {
    accounts['Accounts'].forEach((item,index)=>{
      if(item.Id == account.Id){
        accounts['Accounts'][index] = account
        resolve()
      }
    })
  })
}
const updateAccounts = (accounts,logons) =>{
  return new Promise( async (resolve, reject) => {
    logons['Logons'] = normalizeLogonsCollection()
    for(let x in logons['Logons']){
      let logon = logons['Logons'][x]
      let account = await findAccount(logon.Id)
      if(account){
        // console.log('check Logon Date  is greater than account lastLogon')
        if( logon.Date.getTime() >  account.LastLogon.getTime() ){
          account.LogonCount = account.LogonCount+1;
          account.LastLogon = logon.Date
          account.Name = logon.Name.length > 0 ? logon.Name :   account.Name
        }
      }else{
        logon.LogonCount = 1
        accounts['Accounts'].push(logon)
      }
    }
    resolve(accounts)
  })
}

updateAccounts(accounts,logons).then( accounts =>{
  console.log(accounts)
  console.log('=========================')
})

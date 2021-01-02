function GoogleSheet(sheetId){
  this.sheetId = sheetId
  let endPoint = `https://spreadsheets.google.com/feeds/list/${sheetId}/od6/public/basic?alt=json`
  this.data = null
  this.entries = null
  this.headers = []
  this.rows = []
  this.totalFields = null
  var self = this
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     self.data = JSON.parse(this.responseText)
     self.entries = self.data.feed.entry
     // Parse the headers
     let headers = self.data.feed.entry[0].content.$t.split(',')
     self.headers.push(self.data.feed.entry[0].title.$t)
      for(let i =0;i<headers.length;i++) {
        console.log(headers[i])
        self.headers.push(headers[i].trim().substring(7).trim())
      }
      //Parse the rows
      for(let i=1;i<self.entries.length;i++) {
        let row = self.data.feed.entry[i].content.$t.split(',')
        self.rows[i] = [self.data.feed.entry[i].title.$t]
        for(let cell = 0; cell < row.length; cell++){
          self.rows[i].push(row[cell].trim().substring(7).trim())
        }
      }
     self.totalFields = self.headers.length
     console.log(self)
    }
  };
  xhttp.open("GET", endPoint, true);
  xhttp.send();
}
let sheetId = `1W8JMYTkdY_2ZYp52o6tBDzkkFPjVf3QEniepBNCRdi4`
let gs = new GoogleSheet(sheetId)

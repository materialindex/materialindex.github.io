const numPages = 4;
const startIndex = 1000;

    (function () {
        const sheetUrl ='https://docs.google.com/spreadsheets/d/e/2PACX-1vRbnyK0aEKSGyBVqQ3cLfa4SbY8voYHP4TVR57teJc9NZCyb424akAC9Y9ECNr2n36-LC9jAlKEw_br/pub?gid=0&single=true&output=csv'

    
   const data = Papa.parse(sheetUrl, {
       download: true,
       complete: response => {
           results = response.data;
           console.log(results)
        // You can access the data here
      }
   }, )
        

})()

const sendToBack = (e) => {
    const index = parseInt(e.target.parentElement.style.zIndex) - numPages
    console.log(index)
    e.target.parentElement.style.zIndex = index
}
   
Array.from(document.getElementsByClassName('cardx'))
      .forEach((x,index) => {
          x.style.zIndex = startIndex + numPages - index
          x.addEventListener('click', sendToBack)
      })
 
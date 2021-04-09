const getBeer = () => {
  let beerObject = {}
  let fields = document.querySelectorAll("form input[type='text']");

  fields.forEach(fiel => {
    beerObject[fiel.name] = fiel.value
    console.log(beerObject)
  })

  let select = document.getElementById("category")

  let category = select.options[select.selectedIndex].value

  console.log(category)

  beerObject = {
    ...beerObject,
    category
  }

  console.log(beerObject)
}

document.getElementById("saveBeer").addEventListener("click", getBeer)

const saveBeer = album => {
  let xhttp = new XMLHttpRequest(); /**/ 
  
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         console.log( xhttp.response )
         $('#save-succesful').modal('show')
          printTable( getAlbumsCollection() )
      }
  }

  xhttp.open("POST", "https://ajaxclass-1ca34.firebaseio.com/11g/israel/albums.json", true);

  xhttp.send( JSON.stringify(album) );
}
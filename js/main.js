const getBeer = () => {
  let beerObject = {}
  let fields = document.querySelectorAll("form input[type='text']");

  fields.forEach( field => {
    beerObject[field.name] = field.value
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

  saveBeer( beerObject )

  fields.forEach( field => {
    field.value = ""
  })
}

//$('#save-succesful').modal("show")

document.getElementById("save-Beer").addEventListener("click", getBeer)

const saveBeer = beer => {
  let xhttp = new XMLHttpRequest(); /**/ 
  
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         console.log( xhttp.response )
         $('#save-succesful').modal('show')
          printTable( getBeersCollection() )
      }
  }

  xhttp.open("POST", "https://ajaxclass-1ca34.firebaseio.com/11g/israel/beers.json", true);

  xhttp.send( JSON.stringify(beer) );
}

const getBeersCollection = () => {
  let beersCollection;
  let xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log( xhttp.response )
          beersCollection = JSON.parse( xhttp.response)
      }
  }

  xhttp.open("GET", "https://ajaxclass-1ca34.firebaseio.com/11g/israel/beers.json", false );

  xhttp.send();

  return beersCollection    
}

const deleteBeer = event => { /*recibimos como parámetro el botón al que se le hace click*/
  console.log( event.target )
  /*extraemos la llave del disco*/
  let beerKey = event.target.dataset.beerKey
  console.log( beerKey )

  /*lanzamos la petición para borrar el disco*/
  let xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log( xhttp.response )
          printTable( getBeersCollection() )
      }
  }

  xhttp.open("DELETE", `https://ajaxclass-1ca34.firebaseio.com/11g/israel/beers/${beerKey}/.json`, false );

  xhttp.send();
}



















































































































const printTable =  dataToPrint => {
  console.log( dataToPrint )
  let table = document.getElementById("beer-table")
  let index = 1

  /*limpiamos la tabla antes de imprimirla*/    
  while (table.lastElementChild) {
      table.removeChild( table.lastElementChild );
  }

  /*iteramos en la lista de discos y creamos los elementos correspondientes de cada fila*/
  for( key in dataToPrint ){
      console.log( key )
      console.log( dataToPrint[key] )

      let { name, description, price, image, category } = dataToPrint[key]

      let beerRow = document.createElement("tr")

      let indexTd = document.createElement("td")
      let nameTd = document.createElement("td")
      let descriptionTd = document.createElement("td")
      let priceTd = document.createElement("td")
      let imageTd = document.createElement("td")
      let categoryTd = document.createElement("td")
      let buttonTd = document.createElement("td")

      descriptionTd.classList = "text-truncate"
      descriptionTd.style.maxWidth = "100px"

      imageTd.classList = "text-truncate"
      imageTd.style.maxWidth = "100px"

      let indexText = document.createTextNode( index )
      let nameText = document.createTextNode( name )
      let descriptionText = document.createTextNode( description )
      let priceText = document.createTextNode( price )
      let imageText = document.createTextNode( image )
      let categoryText = document.createTextNode( category )

      

      let deleteButton = document.createElement("button")
      deleteButton.classList = "btn btn-outline-danger delete-button mt-1"
      deleteButton.dataset.beerKey = key 

      let buttonText = document.createTextNode("Borrar")

      deleteButton.appendChild(buttonText)

      indexTd.appendChild( indexText )
      nameTd.appendChild( nameText )
      descriptionTd.appendChild( descriptionText )
      priceTd.appendChild( priceText )
      imageTd.appendChild( imageText )
      categoryTd.appendChild( categoryText )
      buttonTd.appendChild( deleteButton )

      beerRow.appendChild(indexTd)
      beerRow.appendChild(nameTd)
      beerRow.appendChild(descriptionTd)
      beerRow.appendChild(priceTd)
      beerRow.appendChild(imageTd)
      beerRow.appendChild(categoryTd)
      beerRow.appendChild(deleteButton)

      table.appendChild(beerRow)
      index++
  }

  /*agrupamos todos los botones*/
  let buttons = document.querySelectorAll(".delete-button")

  /*agregamos el listener a cada botón*/
  buttons.forEach( button => {
      button.addEventListener("click", deleteBeer )
  })
} 

printTable( getBeersCollection() )

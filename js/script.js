const tituloDosFilmesDoCarossel = document.querySelectorAll('.title-movie')
const containerDePoster = document.querySelectorAll('.movie')
const containerDeNota = document.querySelectorAll('.nota')
let paginasAtuais = [] 




const apiFilmes = axios.create({
    baseURL: 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false',
    timeout: 1000,
    headers: { 'Content-Type': 'Application/json' }
})

const apiMovieDayGeral = axios.create({
  baseURL: 'https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR',
  timeout: 1000,
  headers: { 'Content-Type': 'Application/json' }
})


const apiMovieDayVideos = axios.create({
  baseURL: 'https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR',
  timeout: 1000,
  headers: { 'Content-Type': 'Application/json' }
})



const apiModalInf = axios.create({
  baseURL: 'https://tmdb-proxy.cubos-academy.workers.dev/3/movie',
  timeout: 1000,
  headers: { 'Content-Type': 'Application/json' }
})

const apibusca = axios.create({
  baseURL: 'https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false',
  timeout: 1000,
  headers: { 'Content-Type': 'Application/json' }
})




async function Paginação (){

const {data} = await apiFilmes.get()
const arrayDeFilmesCompleto = data.results
const arrayDeMostragem = []
const blocosDePaginacao = []

for(let i = 0; i < arrayDeFilmesCompleto.length;i++){
  if( i <= 5){ arrayDeMostragem.push(arrayDeFilmesCompleto[i])}
   else { blocosDePaginacao.push(arrayDeFilmesCompleto[i])}
 
}

let blocoOne = blocosDePaginacao.slice(0,6)
let blocoTwo = blocosDePaginacao.slice(6,12)
const resto = blocosDePaginacao.slice(12, arrayDeFilmesCompleto.length)
const blocosDePaginacaoDividido = []
blocosDePaginacaoDividido.push(arrayDeMostragem)
blocosDePaginacaoDividido.push(blocoOne)
blocosDePaginacaoDividido.push(blocoTwo) 


if( resto.length > 6){ blocosDePaginacaoDividido.push(resto)}

paginasAtuais = blocosDePaginacaoDividido

for( let i = 0; i< data.results.length; i++){ 


 tituloDosFilmesDoCarossel[i].textContent = paginasAtuais[0][i].title
 containerDeNota[i].textContent = paginasAtuais[0][i].price


  if ( (tituloDosFilmesDoCarossel[i].textContent.match(/ /g) || []).length >= 4){ 
   let titulo = tituloDosFilmesDoCarossel[i].textContent.split(' ')
   titulo.pop()
   titulo.push('...')
   let tituloFinal = titulo.join(" ")
   tituloDosFilmesDoCarossel[i].textContent = tituloFinal}
 

   containerDePoster[i].addEventListener('click', () => { 
    mostrarModal(paginasAtuais[base][i])
    })






   containerDePoster[i].style.backgroundImage = `url(${paginasAtuais[0][i].poster_path})`
   let base = 0
   

   async function SetarAEsquerda(){
  
   const setaEsquerda= document.querySelector('#seta-esquerda')

   setaEsquerda.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()

if( base <= 0){ return}else {
  base = base-1

  tituloDosFilmesDoCarossel[i].textContent = paginasAtuais[base][i].title
  containerDeNota[i].textContent = paginasAtuais[base][i].price
  containerDePoster[i].style.backgroundImage = `url(${paginasAtuais[base][i].poster_path})`}} 
 
)}
async function SetarADireita(){
  
  const setaDireita = document.querySelector('#seta-direita')
  setaDireita.addEventListener('click', (event) => {
   event.preventDefault()
   event.stopPropagation()


   
   if( base > 1){ return}else{
    
    base++  
    tituloDosFilmesDoCarossel[i].textContent = paginasAtuais[base][i].title
    containerDeNota[i].textContent = paginasAtuais[base][i].price
    containerDePoster[i].style.backgroundImage = `url(${paginasAtuais[base][i].poster_path})` 
  
  
    
  }}



    
)}
  SetarADireita()
  SetarAEsquerda()
}}
Paginação()









async function movieDay(){   

  const {data} = await apiMovieDayVideos.get()
  const resultsGeral = await apiMovieDayGeral.get()
  const imgMovieDay = resultsGeral.data.backdrop_path


  
  const resultsData = data.results
  const keyTrailer =  await resultsData[1].key
  const movieDayVideo = document.querySelector('#video')
  const divVideo = document.querySelector('#div-video')
  const movieDayTitle = document.querySelector('.text-container-title')
  const movieDaySubtitle = document.querySelector('.text-container-subtitle')
  const movieDayP = document.querySelector('.text-container-p')
  const movieDayNota = document.querySelector(".text-container-nota-two")

 
  movieDayTitle.textContent = resultsGeral.data.title
  movieDaySubtitle.textContent = resultsGeral.data.genres[0].name +" "+ resultsGeral.data.genres[1].name + " " + resultsGeral.data.genres[2].name + " " + '/' +" " + resultsGeral.data.release_date
  movieDayP.textContent = resultsGeral.data.overview
  movieDayNota.textContent = resultsGeral.data.vote_average.toFixed(1)
  movieDayVideo.href = `https://www.youtube.com/watch?v=${keyTrailer}`
  divVideo.style.backgroundImage = `url(${imgMovieDay})`
}

movieDay()





async function mostrarModal (Filme){

  const {data} = await apiModalInf.get(`${Filme.id}?language=pt-BR`)



  const Corpo = document.querySelector('body')
  const backgroundGeral = document.createElement('div')
  const modal =  document.createElement('div')
  const posterImg =  document.createElement('div')
  const modaltitle = document.createElement('div')
  const modalp = document.createElement('div')
  const modaldeGenero = document.createElement('div')
  const modalNota = document.createElement('div')
  const modalExtras = document.createElement('div')
  const imgex = document.createElement('img')


  

  Corpo.appendChild(backgroundGeral)
  backgroundGeral.classList.add('background-modal')
  Corpo.appendChild(modal)
  modal.classList.add('modal')

  posterImg.style.backgroundImage = `url(${data.backdrop_path})`
  posterImg.style.backgroundSize = 'cover'

  modal.appendChild(imgex)
  imgex.src = '/assets/close-dark.svg'
  imgex.classList.add('imgex')


   modal.appendChild(modaltitle) 
  modaltitle.classList.add('modaltitle')
  modaltitle.textContent = data.title

  modal.appendChild(posterImg)
  
  posterImg.classList.add('divImg')

  posterImg.style.backgroundImage = `url(${Filme.backdrop_path})`
  posterImg.style.backgroundSize = 'cover'

  modal.appendChild(modalp)
  modalp.classList.add('modalpara')
  modalp.textContent = data.overview

  modal.appendChild(modalExtras)
  modalExtras.appendChild(modaldeGenero)

  modalExtras.classList.add('modalExtras')
  modaldeGenero.classList.add('modaldeGenero')

 

  for(let genero of data.genres ){

const genres = document.createElement('div')
genres.textContent = genero.name
modaldeGenero.appendChild(genres)
genres.classList.add('genres')


    
  }



modalExtras.appendChild(modalNota)
modalNota.classList.add('modalNota')
modalNota.textContent =  data.vote_average.toFixed(1)

modal.appendChild(imgex)
imgex.src = '/assets/close.svg'
imgex.classList.add('imgex')


imgex.addEventListener('click', () => {

Corpo.removeChild(backgroundGeral)
Corpo.removeChild(modal)



})



}



let base = 0
async function buscaComEnter(){

const inputbusca = document.querySelector('.input')

inputbusca.addEventListener('keydown', (event) => {  
  
if ( event.key === 'Enter'){

 let textoDeBusca = inputbusca.value
 inputbusca.value = ''

  async function buscador(){ 

    let resultsBuscador = await apibusca.get(`&query=${textoDeBusca}`)
    let arraydeResultados = resultsBuscador.data.results
    let blocoOne = arraydeResultados.slice(0,6)
    let blocoTwo = arraydeResultados.slice(6,12)
    let blocoTree = arraydeResultados.slice(12,18)
    let arraydeResultadosDividido = []

      arraydeResultadosDividido.push(blocoOne)
      arraydeResultadosDividido.push(blocoTwo)
      arraydeResultadosDividido.push(blocoTree)
      paginasAtuais = arraydeResultadosDividido





      if( textoDeBusca === ''){

        Paginação()
        return
      }
    for( let i = 0; i < arraydeResultadosDividido[0].length; i++ ){

      containerDePoster[i].style.backgroundImage = `url(${arraydeResultadosDividido[0][i].poster_path})`
      tituloDosFilmesDoCarossel[i].textContent = arraydeResultadosDividido[0][i].title
      containerDeNota[i].textContent = arraydeResultadosDividido[0][i].vote_average.toFixed(1)

}



}
buscador()





 }
  }
   )
    } 
  

   
  












buscaComEnter()













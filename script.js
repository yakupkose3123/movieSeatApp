const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".row .seat");
const notOccupiedSeats = document.querySelector(".container .seat:not(.occupied)");
const count = document.getElementById("count"); 
const film = document.getElementById("film"); 
const total = document.getElementById("total"); 
const movieSelectBox = document.getElementById("movie");

//localstorage da varsa onu al yoksa selectboxtaki value yu al
//movieSelectBox.options[movieSelectBox.selectedIndex].value == movieSelectBox.value;
let currentTicketPrice = localStorage.getItem("selectedMoviePrice") ? 
                        localStorage.getItem("selectedMoviePrice") :
                        movieSelectBox.value;

let currentMovieIndex = localStorage.getItem("selectedMovieIndex") ?
                        localStorage.getItem("selectedMovieIndex") :
                        movieSelectBox.selectedIndex;



window.onload = ()=>{
    movieSelectBox.selectedIndex = currentMovieIndex;
    displaySeats();
    updateMovieInfo();
    

}

//film türünü şeçince
movieSelectBox.addEventListener("change", (e)=>{
    let ticketPrice = e.target.value;
    let movieIndex = e.target.selectedIndex; //movie indexlerini böyle yakalıyoruz. Selectboxta gizli bir index var öyle düşün.

    updateMovieInfo();
    setMovieDataToLocalStorage(ticketPrice,movieIndex);
    
    

})



//localstorageda tutmamız gereken 
const setMovieDataToLocalStorage = (ticketPrice,movieIndex)=>{
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", ticketPrice);
}


container.addEventListener("click", (e)=>{
    
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");//BURADA GERİ ALINABİLİR OLSUN DİYE TOOGLE KULLANDIK. GERİ ALINAMAZ OLARAK DEĞİŞTİRİLMESİNİ İSTESEYDİK ADD KULLNIRDIK.Ayrıca burada classList: hedefteki elemanın class listesi demek 
    }
   /*  if(e.target.classList.contains("seat") && e.target.classList.contains("occupied")){
        alert("THİS SEAT İS RESERVED.PLEASE CHOOSE ANOTHER SEATS.");
    } */

    updateMovieInfo();

});




const updateMovieInfo = ()=>{

     //seçili koltuklar nodelist
    const selectedSeats = document.querySelectorAll(".row .seat.selected"); //arada boşluk yoksa parrent ilişkisi varsa child ilişkisi. Yani boşluk yoksa row clasının altındaki hem seat hemde selected olan classlar seat ile selected arasında boşluk varsa row altındaki seat altındaki selectedları alıyor.

     let selectedSeatsIndexArray = [...selectedSeats].map(seat => [...allSeats].indexOf(seat));
   

    localStorage.setItem("selectedSeats",JSON.stringify(selectedSeatsIndexArray));

    count.innerText = selectedSeatsIndexArray.length;
    total.innerText = selectedSeatsIndexArray.length *movieSelectBox.value;
    film.innerText = movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split("(")[0];
 
}

const displaySeats = ()=>{
    let selectedSeatsFromStorage = JSON.parse(localStorage.getItem("selectedSeats"));
    if(selectedSeatsFromStorage !== null && selectedSeatsFromStorage.length > 0){
        //tüm koltukları gez. locaol storagedan gelen indexler ile eşleşince o indexteki seatleri selected yap.
        allSeats.forEach((seat,index)=>{
            if(selectedSeatsFromStorage.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        })
    }

}
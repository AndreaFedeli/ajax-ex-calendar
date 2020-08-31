$(document).ready(function(){


//data di partenza 2018-01-01
//creo un oggetto moment con questa data

var dataCorrente = moment('2018-01-01');

insertDays(dataCorrente);
insertHolidays(dataCorrente);


});

//funzione che ricava i gg festivi dall api
function insertHolidays(data){
  $.ajax(
    {
      url : 'https://flynn.boolean.careers/exercises/api/holidays',
      method : 'GET',
      data: {
        year:data.year(),
        month:data.month()
      },
      success: function(risposta){
        var vacanze = risposta.response;
      for(var i=0; i<vacanze.length; i++){
        var singolaVacanza = vacanze[i];
        var listItem = $('li[data-complete-date = "'+ singolaVacanza.date +'"]');
        if(listItem){
          listItem.append(' '+ singolaVacanza.name);
          listItem.addClass('holiday');
        }

       }
      },
      error: function(){
      alert('errore')
      }
    }
  )
}

//funzione per la data
function insertDays(data)
{
var month = data.format('MMMM');
var year =data.format('YYYY');
$('h1.month').html(data.format('MMMM')+ ''+ data.format('YYYY'));

var daysMonth = data.daysInMonth();

for( var i=1; i<=daysMonth; i++){
  var source = $("#day-template").html();
  var template = Handlebars.compile(source);

  var context =
  { day: addZero(i),
    month: month,
    completeDate:year +' '+ data.format('MM') +' '+addZero(i)};
var html = template(context);

$('.month-list').append(html);
}


}

function addZero(n){
  if(n<10){
    return '0' + n;

  }else{
    return n;
  }
}



//funzione per  andare avanti nel calendario cliccando next
//$('.next').click(function()){
  //var daysMonth = $('h1.month').attr('data-this-month');
  //insertDays(dataCorrente);
  //insertHolidays(dataCorrente);

//}

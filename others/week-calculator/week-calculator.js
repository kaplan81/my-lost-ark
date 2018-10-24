var dateCuadrante = new Date();
var getDateStrings = function(date) {
    monthsArray = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    var thisDay = date.getDate().toString();
    thisDay = thisDay > 9 ? '' + thisDay : '0' + thisDay;
    var thisMonthIndex = date.getMonth();
    var thisMonth = monthsArray[thisMonthIndex];
    var thisYear = date.getFullYear().toString();
    var thisArray = [thisDay, thisMonth, thisYear];
    return thisArray;
}
var semanaCuadrante = function(dateSquare) {
    var datepickerDate = $(".cuadrantesHead .semana .calendar").datepicker('getDate');
    var d = datepickerDate instanceof Date ? datepickerDate : dateSquare;
    var newDateCuadrante = new Date(d);
    dateCuadrante = newDateCuadrante;
    var dayOfTheWeek = d.getDay(), dayOfTheMonth = d.getDate(),
    diff =  dayOfTheMonth - dayOfTheWeek + (dayOfTheWeek == 0 ? -6 : 1);
    var mondayDate = new Date(d.setDate(diff));
    var sundayDate = new Date(d.setDate(diff + 6));
    var sundayMonth = sundayDate.getMonth();
    if(mondayDate > sundayDate) { sundayDate.setMonth(sundayMonth + 1); }        
    var mondayArray = getDateStrings(mondayDate);
    var sundayArray = getDateStrings(sundayDate);
    $("#semana_seleccionado").text(mondayArray[0] + ' ' + mondayArray[1] + ' - '  + sundayArray[0] + ' ' + sundayArray[1]);
}
semanaCuadrante(dateCuadrante);
$(".cuadrantesHead .semana .prev").click(function(){
    $(".cuadrantesHead .semana .calendar").datepicker( "setDate", null );
    dateCuadrante.setDate(dateCuadrante.getDate() - 7);
    semanaCuadrante(dateCuadrante);
});
$(".cuadrantesHead .semana .next").click(function(){
    $(".cuadrantesHead .semana .calendar").datepicker( "setDate", null );
    dateCuadrante.setDate(dateCuadrante.getDate() + 7);
    semanaCuadrante(dateCuadrante);
});

function reverseStr(str)
{
    var listOfChars=str.split("");
    var reverseListOfChars=listOfChars.reverse();
    var reversedStr=reverseListOfChars.join("");
    return reversedStr;
}

// another way str.split('').reverse().join('');

function isPalindrome(str)
{
    var reverse=reverseStr(str);
    return str===reverse;
}



function convertDateToString(date)
{

    var dateStr={day:'',month:'',year:''};

    if(date.day<10)
    {
        dateStr.day='0'+date.day;
    }
    else
    {
        dateStr.day=date.day.toString();
    }
    if(date.month<10)
    {
        dateStr.month='0'+date.month;
    }
    else
    {
        dateStr.month=date.month.toString();
    }
    dateStr.year=date.year.toString();

    return dateStr;
}

function getAllDateFormats(date)
{
var dateStr=convertDateToString(date);
var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;
return [ddmmyyyy,yyyymmdd,mmddyyyy,ddmmyy,mmddyy,yymmdd];

}


function checkPalindromeForAllDateFormat(date)
{
    var listOfPalindromes=getAllDateFormats(date);
    var flag=false;
    for(var i=0;i<listOfPalindromes.length;i++)
    {
        if(isPalindrome(listOfPalindromes[i]))
        {
            flag=true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {

  
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return true;
    } else {
        return false;
    }
}



function getNextDate(date){
    var day = date.day + 1;  
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 

    if(month === 2){ 

      if(isLeapYear(year)){ 
         if(day > 29){ 
           day = 1;
           month++;  
         }
      }
      else {
         if(day > 28){
           day = 1;
           month++;  
         }
      }
    }

    else {
   
      if(day > daysInMonth[month - 1]){ 
        day = 1; 
        month++;  
      }
    }
  

    if(month > 12){
      month = 1;
      year++; 
    }
  
    return {
      day: day,  
      month: month,
      year: year
    };
  }
  
function getNextPalindromeDate(date)
{
    var ctr=0;
    var nextDate=getNextDate(date);
    while(true)
    {
        ctr=ctr+1;
        var isPalindrome=checkPalindromeForAllDateFormat(nextDate);
        if(isPalindrome)
        {
            break;
        }
        nextDate=getNextDate(nextDate);

    }
    return [ctr,nextDate];
}

var dateInputRef=document.querySelector("#bday-input");
var showBtnRef=document.querySelector("#show-btn");
var resultRef=document.querySelector("#output");

function clickHandler1(e)
{
    var bdayStr=(dateInputRef.value);
    if(bdayStr!=='')
    {
        var listOfDate=bdayStr.split("-");

        var date={
            day:listOfDate[2],
            month:listOfDate[1],
            year:listOfDate[0]
        }
    }
    var isPalindrome=checkPalindromeForAllDateFormat(date);
    if(isPalindrome)
    {
        resultRef.innerText="Your Birthday is palindrome";
    }
    else{
            var [ctc,nextDate]=getNextPalindromeDate(date);
            console.log(nextDate);
            resultRef.innerText=`The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year},and it is after ${ctc} days`;

    }
}
showBtnRef.addEventListener("click",clickHandler1);

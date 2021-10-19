/* Global Variables */
const api_Key='98aa86e7c2571aa58694ada980f7d796&units=metric'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const generate=document.getElementById('generate')
generate.addEventListener('click',async ()=>{
    try{
        let zipCode=document.getElementById('zip').value;
        let feelings=document.getElementById('feelings').value;
        //first step
        const url=`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${api_Key}`
        const response=await fetch(url).then(res => res.json())
        const temp=await response.main.temp
        console.log(temp)
        //second step
        await fetch('/addWeather',{
            method:'POST',
            credentials:'same-origin',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                newDate,
                temp,
                feelings
            })
        })
        //third step
        const resultData=await fetch('/getWeather').then(res => res.json())
        document.getElementById('date').innerHTML=resultData.date
        document.getElementById('content').innerHTML=resultData.feelings
        document.getElementById('temp').innerHTML=resultData.temp
    }
    catch(err){
        console.error('Error found',err)
    }
})

document.addEventListener('DOMContentLoaded', function() 
{
    var name = document.getElementById('name');
    
    name.addEventListener('keyup', function() 
    {
        document.getElementById("greet").innerHTML= "Hello "+ name.value;
    });
});
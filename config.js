function openPlayerConfig(event)
{
    editedPlayer= +event.target.dataset.playerid;
    playerConfigOverlayElement.style.display='block';
    backdropElement.style.display='block';
}

function closePlayerConfig()
{
    playerConfigOverlayElement.style.display='none';
    backdropElement.style.display='none';
    formElement.firstElementChild.classList.remove('error');
    errorsOutputElement.textContent='';
    document.getElementById('playername').value='';
}

function savePlayerConfig(event)
{
    event.preventDefault();
    const formData=new FormData(event.target);
    const enteredPlayerName=formData.get('playername').trim();
    //'   Bhaskar Malwani     ' => 'Bhaskar Malwani
    // trim removes the blank spaces present before or after the complete string 
    if(!enteredPlayerName)
    {
        event.target.firstElementChild.classList.add('error');
        errorsOutputElement.textContent='Enter a valid name';
        return;
    }

    const updatedPlayerDataElement=document.getElementById('player-'+editedPlayer+'-data');
    updatedPlayerDataElement.children[1].textContent=enteredPlayerName;

    if(editedPlayer===1)
    {
        players[0].name=enteredPlayerName;
    }
    else
    {
        players[1].name=enteredPlayerName;
    }

    closePlayerConfig();


}
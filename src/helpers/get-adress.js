export  async function getAddress(ip='8.8.8.8'){
    const response = await fetch(`
        https://ipwho.is/${ip}`)
           
    return await response.json();
            
}
 

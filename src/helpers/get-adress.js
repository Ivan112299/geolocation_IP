export  async function getAddress(ip='8.8.8.8'){
    const response = await fetch(`
        http://ipwho.is/${ip}`)
           
    return await response.json();
            
}
 

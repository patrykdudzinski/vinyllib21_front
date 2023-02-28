export async function ajaxAction(url = '', data = {}, method = 'GET') {
    
    let response;

    if(method == 'GET'){
        response = await fetch(url, {
            method: method, 
        });
    }
    else if(method == 'POST'){
        response = await fetch(url, {
            method: method, 
            body: JSON.stringify(data)
        });
    }

    return response.json();

}
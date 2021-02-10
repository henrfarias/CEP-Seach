function buscaCep(value) {
  const cep = value;  
  const pureCep = cep.replace(/[/ /\-/]/g, '');

  loading();

  if(pureCep.length != 8 || pureCep.match(/[A-Za-z]/) !== null) {
    return spanDisplayed();
  }
  
  const url = `https://viacep.com.br/ws/${pureCep}/json/`
  
  const req = new XMLHttpRequest();

    req.open('GET', url, true);

    req.onreadystatechange = () => {
      
      if (req.readyState === 4) {
        const json = JSON.parse(req.responseText);
        console.log(json);
        pushCep(json)
        spanNotDisplayed();
      } 
    }
  
  req.send()
}

function pushCep(object) {
  document.querySelector('.input-public-place').value = object.logradouro;
  document.querySelector('.input-neighborhood').value = object.bairro;
  document.querySelector('.input-city').value = object.localidade;
  document.querySelector('.input-state').value = object.uf;
}

function spanDisplayed() {
  const spanInvalid = document.querySelector('.span-invalid');
  loading();
  spanInvalid.classList.remove('invisible');
}

function spanNotDisplayed() {
  const spanInvalid = document.querySelector('.span-invalid');
  loading();
  spanInvalid.classList.add('invisible');
}

function loading() {
  const loadingCircle = document.querySelector('.loading');
  return loadingCircle.classList.toggle('invisible');
}
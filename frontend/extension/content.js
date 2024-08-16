// Função para extrair informações da página
function extrairInformacoes() {
    const tituloOriginal = document.querySelector('h1').innerText; // Supondo que o título esteja em um <h1>
    const idFornecedor = window.location.pathname.split('/')[2]; // Supondo que o ID do fornecedor esteja na URL
    const precoOriginal = document.querySelector('.price-tag').innerText; // Supondo que o preço esteja em um elemento com a classe 'price-tag'
    
    return {
      tituloOriginal,
      idFornecedor,
      precoOriginal
    };
  }
  
  // Enviar as informações extraídas para o popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extrairInformacoes') {
      const informacoes = extrairInformacoes();
      sendResponse(informacoes);
    }
  });
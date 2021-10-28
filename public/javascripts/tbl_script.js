// função encontrada em https://www.guj.com.br/t/somar-valores-de-uma-lista-e-apresentar-o-total-via-javascript/200770/17
// função replace em https://forum.imasters.com.br/topic/289712-c%C3%A1lculos-com-numeros-em-formato-moeda/
// função moeda em https://www.alura.com.br/artigos/formatando-numeros-no-javascript
// função moeda em http://wbruno.com.br/expressao-regular/formatar-em-moeda-reais-expressao-regular-em-javascript/

// Função para altura altomatica do tag textarea

const tx = document.getElementsByTagName('textarea');
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}

// Funcao adiciona uma nova linha na tabela

function adicionaLinha(idTabela, q, d, vU, vT) {

    var tabela = document.getElementById(idTabela);
    var numeroLinhas = tabela.rows.length;
    var anterior = numeroLinhas - 1;
    var linha = tabela.insertRow(numeroLinhas);

    var celula1 = linha.insertCell(0);
    var celula2 = linha.insertCell(1);   
    var celula3 = linha.insertCell(2);   
    var celula4 = linha.insertCell(3);   
    var celula5 = linha.insertCell(4);

    var qtddel = idTabela+'quantidade'+anterior;
    var vudel = idTabela+'valorUnitario'+anterior;
    var vtdel = idTabela+'valorTotal'+anterior;

    var qtd = idTabela+'quantidade'+numeroLinhas;
    var desc = idTabela+'descricao'+numeroLinhas;
    var vu = idTabela+'valorUnitario'+numeroLinhas;
    var vt = idTabela+'valorTotal'+numeroLinhas;
    var sttl = idTabela+'_sttl';

    var v_q = undefined===q ? '' : q;
    var v_d = undefined===d ? '' : d;
    var v_vU = undefined===vU ? '' : vU;
    var v_vT = undefined===vT ? '' : vT;

    if (idTabela == 'tbl_orc') {
        var qq = 'servico_quantidade';
        var dd = 'servico_descricao';
        var vuvu = 'servico_v_unitario';
        var v_tv_t = 'servico_v_total';
    }
    else if (idTabela == 'tbl_mtl') {
        var qq = 'material_quantidade';
        var dd = 'material_descricao';
        var vuvu = 'material_v_unitario';
        var v_tv_t = 'material_v_total';
    } 
    
    celula1.innerHTML = '<input type="text" placeholder="qtd" id="'+qtd+'" name="'+qq+'" size="5" required="true" value="'+v_q+'">'; 
    celula2.innerHTML = '<input type="text" id="'+desc+'" name="'+dd+'" size="40" placeholder="Descrição do serviço" required="true" value="'+v_d+'">'; 
// caractere de escape passando parametro para função como variavel
    celula3.innerHTML = '<input type="text" id="'+vu+'" name="'+vuvu+'" size="8" placeholder="0.000,00" onkeyup="k(this), calculaMult(\''+qtd+'\',\''+vu+'\',\''+vt+'\',\''+idTabela+'\')" required="true" value="'+v_vU+'">'; 
    celula4.innerHTML = '<input type="text" id="'+vt+'" class="'+sttl+'" name="'+v_tv_t+'" size="8" placeholder="0.000,00" readonly="true" onfocus="k(this)" value="'+v_vT+'">'; 
    celula5.innerHTML =  '<button onclick="removeLinha(this,\''+qtddel+'\',\''+vudel+'\',\''+vtdel+'\',\''+idTabela+'\');" class="btn btn-outline-danger btn-sm">Excluir</button>';
}
            
// função que formata moeda BRL para valor unitário
              
function k(i) {

    var v = i.value.replace(/\D/g,'');
    v = (v/100).toFixed(2) + '';
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1$2$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1$2,");
    i.value = 'R$ '+v;

}
            
// funcao remove uma linha da tabela

function removeLinha(linha,q,vu,vt,tb) {

   var i=linha.parentNode.parentNode.rowIndex;
   document.getElementById(tb).deleteRow(i);
   calculaMult(q,vu,vt,tb);
}  
              
// função escreve data atual

function pegarDataAtual(){

   let data = new Date;
   let num = '000001';
   month = data.getMonth() + 1;
   document.getElementById('date').value = data;
   document.getElementById('data').value = '"'+data.getDate()+' / '+month+' / '+data.getFullYear()+'"';
}   
            
// função imprime a div

function printDiv() {

    var nome = document.getElementById('pdf-nome').textContent.substr(5, 20).split(' ').join('');
    var rua = document.getElementById('pdf-rua').textContent.substr(4, 20).split(' ').join(''); 
    var numero = document.getElementById('pdf-numero').textContent.substr(3, 10).split(' ').join('');
    var cidade = document.getElementById('pdf-cidade').textContent.substr(7, 20).split(' ').join('');
    var cssEstilos = '';
    var imp = window.open('', 'width='+window.innerWidth+', height='+window.innerHeight);
 
    var cSs = document.querySelectorAll("link[rel='stylesheet']");
    for(x=0;x<cSs.length;x++){
       cssEstilos += '<link rel="stylesheet" href="'+cSs[x].href+'">';
    }
 
    imp.document.write('<html><head><title>orc'+nome,rua,numero,cidade+'</title>');
    imp.document.write(cssEstilos+'</head><body><div id="ctner">');
    imp.document.write(document.getElementById('printable').innerHTML);
    imp.document.write('</div></body></html>');
    setTimeout(function(){
        imp.print();
    },2000);
    setTimeout(function(){
        imp.close();
    },2000); 
    //return true;
}  
            
// função que multiplica valor unitario por quantidade de itens, soma valor total das tabelas e valor total do orçamento 

function calculaMult(q,vu,vt,idt) {

  var n1 = parseFloat(document.getElementById(q).value, 10);
  var n2 = document.getElementById(vu).value;
  n2 = parseFloat(moedaReverse(n2));
  
  var nn = n1 * n2;
  nn.toFixed(2);
  nn = nn.toLocaleString('pt-br', {style:'currency', currency:'BRL'});
  document.getElementById(vt).value = nn;
  
  switch(idt){
  
     case 'tbl_orc':
     
        var els = document.getElementsByClassName('tbl_orc_sttl');
        var elsArray = Array.prototype.slice.call(els, 0);
        var soma = 0;
        elsArray.forEach(function(el) {
            soma += parseFloat(moedaReverse(el.value));
        });
        soma = soma.toLocaleString('pt-br', {style:'currency', currency:'BRL'});
  
        document.getElementById('v_t_servico').value = soma;
     break;
     
     case 'tbl_mtl':
        var els = document.getElementsByClassName('tbl_mtl_sttl');
        var elsArray = Array.prototype.slice.call(els, 0);
        var soma = 0;
        elsArray.forEach(function(el) {
            soma += parseFloat(moedaReverse(el.value));
        });
        soma = soma.toLocaleString('pt-br', {style:'currency', currency:'BRL'});
        document.getElementById('v_t_material').value = soma;
     break;
  }
  
  var vtc0 = document.getElementById('v_t_servico').value;
  vtc0 = moedaReverse(vtc0);
  vtc0 = parseFloat(vtc0, 10);
  
  var vtc1 = document.getElementById('v_t_material').value;
  vtc1 = moedaReverse(vtc1);
  vtc1 = parseFloat(vtc1, 10);
  
  var sm = vtc0 + vtc1;
  sm = sm.toLocaleString('pt-br', {style:'currency', currency:'BRL'});
  
  document.getElementById('v_t_orcamento').value = sm;
  
}
            
// função reverte padrão moeda BRL para calculo no padrão USA
            
function moedaReverse(m) {
    
  var m = m.replace('R$', '');
  m = m.replace('.', '');
  m = m.replace(',', '.');
  m = m == '' ? 0 : m;
  return m;
}
            
// função reseta campos input
            
function reset() {
    document.getElementsByTagName('input').value = '';
}
            
// função adiciona máscara para campo telefone, pode ser usado para qualquer máscara

function mascara(t, mask){

    var i = t.value.length;
    var saida = mask.substring(1,0);
    var texto = mask.substring(i)

    if (texto.substring(0,1) != saida){

        t.value += texto.substring(0,1);
        
    }

}
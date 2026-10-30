// Comportamento comum a todas as páginas. Depende de dados.js.

document.documentElement.classList.add( 'js' );

const semMovimento = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

const ICONE_PAUSA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm8 0h-2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/></svg>';
const ICONE_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4v16a1 1 0 0 0 1.5.86l13-8a1 1 0 0 0 0-1.72l-13-8A1 1 0 0 0 6 4z"/></svg>';

function img( foto, extra = '' ) {
  return `<img src="${ foto.src }" alt="${ foto.alt }" loading="lazy" decoding="async"${ extra }>`;
}

function hrefQuarto( id ) {
  return `quarto.html?id=${ id }`;
}

/* ---------- cabeçalho e menu ---------- */

function montarCabecalho() {
  const lugar = document.getElementById( 'cabecalho' );
  if ( !lugar ) {
    return;
  }
  const links = [
    [ 'Acomodações', 'acomodacoes.html' ],
    [ 'Sobre', 'sobre.html' ],
    [ 'Contato', 'contato.html' ]
  ];
  const lista = links.map( ( [ texto, href ] ) => `<a class="link link--hover" href="${ href }">${ texto }</a>` ).join( '' );
  lugar.outerHTML = `
    <header class="cabecalho" data-sob="pagina">
      <nav class="cabecalho__nav" aria-label="Principal">${ lista }</nav>
      <a class="cabecalho__marca link link--hover" href="index.html">Via Norte Hotel</a>
      <div class="cabecalho__fim">
        <nav aria-label="Reservas"><a class="link link--hover" href="${ linkWhatsapp() }" target="_blank" rel="noopener">Reservar</a></nav>
        <button class="cabecalho__menu" type="button" aria-haspopup="dialog">Menu</button>
      </div>
    </header>
    <dialog class="menu" aria-label="Menu">
      <div class="menu__topo">
        <span class="menu__nome">Via Norte Hotel</span>
        <button class="menu__fechar" type="button">Fechar</button>
      </div>
      <nav class="menu__nav" aria-label="Menu">
        <a class="link link--hover" href="index.html">Início</a>
        ${ lista }
        <a class="link link--hover" href="${ linkWhatsapp() }" target="_blank" rel="noopener">Reservar</a>
      </nav>
    </dialog>`;

  const menu = document.querySelector( '.menu' );
  document.querySelector( '.cabecalho__menu' ).addEventListener( 'click', () => menu.showModal() );
  menu.querySelector( '.menu__fechar' ).addEventListener( 'click', () => menu.close() );
  menu.addEventListener( 'click', evento => {
    if ( evento.target === menu ) {
      menu.close();
    }
  } );
}

// O cabeçalho assume a cor da seção que está logo abaixo dele.
function acompanharCabecalho() {
  const cabecalho = document.querySelector( '.cabecalho' );
  if ( !cabecalho ) {
    return;
  }
  let quadro = 0;
  const atualizar = () => {
    quadro = 0;
    const altura = cabecalho.offsetHeight;
    let escolhida = null;
    document.querySelectorAll( '[data-sob]:not(.cabecalho)' ).forEach( secao => {
      const caixa = secao.getBoundingClientRect();
      if ( caixa.top < altura + 1 && caixa.bottom > altura ) {
        escolhida = secao;
      }
    } );
    if ( escolhida && escolhida.dataset.sob === 'midia' ) {
      cabecalho.dataset.sob = 'midia';
      cabecalho.style.backgroundColor = '';
      cabecalho.style.color = '';
      return;
    }
    const estilo = escolhida ? getComputedStyle( escolhida ) : null;
    const transparente = !estilo || estilo.backgroundColor === 'transparent' || /rgba\(.*,\s*0\)$/.test( estilo.backgroundColor );
    cabecalho.dataset.sob = transparente ? 'pagina' : 'solido';
    cabecalho.style.backgroundColor = transparente ? '' : estilo.backgroundColor;
    cabecalho.style.color = transparente ? '' : estilo.color;
  };
  const agendar = () => {
    if ( quadro === 0 ) {
      quadro = requestAnimationFrame( atualizar );
    }
  };
  atualizar();
  window.addEventListener( 'scroll', agendar, { passive: true } );
  window.addEventListener( 'resize', agendar );
}

/* ---------- rodapé ---------- */

function montarRodape() {
  const rodape = document.getElementById( 'rodape' );
  if ( !rodape ) {
    return;
  }
  const fotos = [ FOTO.fachadaAerea, FOTO.piscina, FOTO.estacionamento ];
  rodape.className = 'rodape';
  rodape.innerHTML = `
    <div class="rodape__grade">
      <div class="rodape__contato">
        <p class="apagado">Reservas</p>
        <p class="t-titulo t-h3">Quer reservar ou tirar uma dúvida? Fale com a recepção pelo WhatsApp ou pelo telefone ${ CONTATO.telRecepcao.texto }.</p>
        <div><a class="link" href="${ linkWhatsapp() }" target="_blank" rel="noopener">Chamar no WhatsApp</a></div>
      </div>
      <div class="rodape__fotos" data-troca>
        ${ fotos.map( ( foto, i ) => `<div class="troca${ i === 0 ? ' atual' : '' }"${ i === 0 ? '' : ' aria-hidden="true"' }>${ img( foto ) }</div>` ).join( '' ) }
      </div>
    </div>
    <div class="rodape__base t-pequeno">
      <p><span class="apagado">Via Norte Hotel / Gurupi</span>${ CONTATO.endereco.map( linha => ` · ${ linha }` ).join( '' ) } · <a class="link" href="mailto:${ CONTATO.email }">${ CONTATO.email }</a></p>
      <div class="rodape__redes">
        <a class="link" href="${ CONTATO.instagram }" target="_blank" rel="noopener">Instagram</a>
        <a class="link" href="${ CONTATO.mapa }" target="_blank" rel="noopener">Google Maps</a>
        <a class="link" href="${ CONTATO.telReservas.href }">${ CONTATO.telReservas.texto }</a>
        <p class="rodape__copia">© Via Norte Hotel, ${ new Date().getFullYear() }</p>
      </div>
    </div>`;
}

// Fotos que se revezam (rodapé e capa de Acomodações), com botão de pausa.
function revezar( caixa, { segura, aoTrocar } = {} ) {
  const camadas = [ ...caixa.querySelectorAll( '.troca' ) ];
  if ( camadas.length < 2 || semMovimento ) {
    return;
  }
  let atual = 0;
  let pausado = false;
  // As fotos seguintes têm loading="lazy": pede todas quando a caixa se aproxima da tela.
  const fotos = camadas.map( camada => camada.querySelector( 'img' ) ).filter( Boolean );
  const carregar = () => fotos.forEach( foto => { foto.loading = 'eager'; } );
  if ( 'IntersectionObserver' in window ) {
    const perto = new IntersectionObserver( entradas => {
      if ( entradas.some( entrada => entrada.isIntersecting ) ) {
        carregar();
        perto.disconnect();
      }
    }, { rootMargin: '100% 0px' } );
    perto.observe( caixa );
  } else {
    carregar();
  }
  const botao = document.createElement( 'button' );
  botao.type = 'button';
  botao.className = 'pausa';
  const desenhar = () => {
    botao.innerHTML = pausado ? ICONE_PLAY : ICONE_PAUSA;
    botao.setAttribute( 'aria-label', pausado ? 'Continuar a troca de fotos' : 'Pausar a troca de fotos' );
  };
  desenhar();
  caixa.appendChild( botao );
  botao.addEventListener( 'click', () => {
    pausado = !pausado;
    desenhar();
  } );
  setInterval( () => {
    const proxima = camadas[( atual + 1 ) % camadas.length].querySelector( 'img' );
    if ( pausado || ( proxima && !proxima.complete ) ) {
      return;
    }
    camadas[atual].classList.remove( 'atual' );
    camadas[atual].setAttribute( 'aria-hidden', 'true' );
    atual = ( atual + 1 ) % camadas.length;
    camadas[atual].classList.add( 'atual' );
    camadas[atual].removeAttribute( 'aria-hidden' );
    aoTrocar?.( atual );
  }, segura ?? 2500 );
}

/* ---------- movimento ---------- */

const observadorRevelar = 'IntersectionObserver' in window && !semMovimento ?
  new IntersectionObserver( entradas => {
    entradas.forEach( entrada => {
      if ( entrada.isIntersecting ) {
        entrada.target.classList.add( 'is-visivel' );
        observadorRevelar.unobserve( entrada.target );
      }
    } );
  }, { rootMargin: '0px 0px -8% 0px' } ) :
  null;

function revelar( raiz = document ) {
  raiz.querySelectorAll( '.revelar:not(.is-visivel)' ).forEach( el => {
    if ( observadorRevelar ) {
      observadorRevelar.observe( el );
    } else {
      el.classList.add( 'is-visivel' );
    }
  } );
}

function paralaxe() {
  if ( semMovimento ) {
    return;
  }
  document.querySelectorAll( '[data-paralaxe]' ).forEach( el => {
    const forca = Number( el.dataset.paralaxe ) || 0.15;
    let deslocamento = 0;
    let quadro = 0;
    const escrever = () => {
      quadro = 0;
      const topo = el.getBoundingClientRect().top - deslocamento;
      deslocamento = -topo * forca;
      el.style.transform = `translate3d(0, ${ deslocamento }px, 0)`;
    };
    const agendar = () => {
      if ( quadro === 0 ) {
        quadro = requestAnimationFrame( escrever );
      }
    };
    escrever();
    window.addEventListener( 'scroll', agendar, { passive: true } );
    window.addEventListener( 'resize', agendar );
  } );
}

function marcaDaCapa() {
  const marca = document.querySelector( '.capa__marca' );
  if ( !marca ) {
    return;
  }
  if ( !( 'IntersectionObserver' in window ) ) {
    marca.classList.add( 'is-visivel' );
    return;
  }
  new IntersectionObserver( entradas => {
    marca.classList.toggle( 'is-visivel', entradas[entradas.length - 1].isIntersecting );
  } ).observe( marca );
}

/* ---------- cartões de apartamento ---------- */

function cartaoQuarto( quarto ) {
  return `
    <li class="cartao">
      <a class="cartao__foto quadro" href="${ hrefQuarto( quarto.id ) }" aria-label="${ quarto.nome }">${ img( quarto.fotos[0] ) }</a>
      <div class="cartao__texto">
        <h3 class="t-h3 cartao__nome"><a href="${ hrefQuarto( quarto.id ) }">${ quarto.curto }</a></h3>
        <p class="t-suave">${ quarto.pessoas } · a partir de ${ reais( quarto.preco ) }</p>
      </div>
    </li>`;
}

function montarVitrines() {
  document.querySelectorAll( '[data-vitrine]' ).forEach( lista => {
    const ids = lista.dataset.vitrine.split( ',' );
    lista.innerHTML = ids.map( id => QUARTOS.find( quarto => quarto.id === id ) ).filter( Boolean ).map( cartaoQuarto ).join( '' );
  } );
}

/* ---------- página Acomodações ---------- */

const FILTROS = [
  { id: 'todos', rotulo: 'Todos', texto: 'Todos os apartamentos têm ar-condicionado split, Wi-Fi, TV por assinatura, frigobar e banheiro privativo. O café da manhã e o estacionamento coberto já estão na diária.' },
  { id: 'um', rotulo: 'Para 1 pessoa', texto: 'Para quem viaja sozinho: cama de solteiro ou, se preferir espaço, cama de casal.' },
  { id: 'dois', rotulo: 'Para 2 pessoas', texto: 'Uma cama de casal ou duas de solteiro, com varanda para o jardim no Duplo.' },
  { id: 'familia', rotulo: 'Família', texto: 'Até 5 pessoas, com sala e varanda. Crianças até 7 anos não pagam.' }
];

function montarAcomodacoes() {
  const capa = document.querySelector( '.vitrine-capa' );
  const indice = document.querySelector( '.indice' );
  if ( !capa || !indice ) {
    return;
  }

  const destaques = [ 'casal', 'duplo', 'familia', 'single' ].map( id => QUARTOS.find( quarto => quarto.id === id ) );
  capa.innerHTML = destaques.map( ( quarto, i ) => `
    <div class="troca${ i === 0 ? ' atual' : '' }"${ i === 0 ? '' : ' aria-hidden="true"' }>
      <img src="${ quarto.fotos[0].src }" alt="${ quarto.fotos[0].alt }">
      <div class="vitrine-capa__gradiente"></div>
      <a class="vitrine-capa__legenda" href="${ hrefQuarto( quarto.id ) }"${ i === 0 ? '' : ' tabindex="-1"' }>
        <span class="t-grande">${ quarto.nome }${ quarto.selo ? `<span class="apagado" style="display:inline"> / ${ quarto.selo }</span>` : '' }</span>
        <span class="t-titulo t-h2">a partir de ${ reais( quarto.preco ) }</span>
        <span class="t-pequeno" style="opacity:.7;margin-top:.25rem">${ quarto.pessoas } · ${ quarto.camas }</span>
      </a>
    </div>` ).join( '' );
  revezar( capa, {
    segura: 4800,
    aoTrocar: atual => capa.querySelectorAll( '.vitrine-capa__legenda' ).forEach( ( link, i ) => {
      if ( i === atual ) {
        link.removeAttribute( 'tabindex' );
      } else {
        link.setAttribute( 'tabindex', '-1' );
      }
    } )
  } );

  const doFiltro = id => ( id === 'todos' ? QUARTOS : QUARTOS.filter( quarto => quarto.grupo === id ) );
  const botoes = indice.querySelector( '.indice__filtros' );
  const resumo = indice.querySelector( '.indice__resumo' );
  const grade = indice.querySelector( '.indice__grade' );

  botoes.innerHTML = FILTROS.map( filtro => `
    <li><button type="button" class="indice__filtro t-titulo t-h4" data-filtro="${ filtro.id }" aria-pressed="false">${ filtro.rotulo }<span>${ doFiltro( filtro.id ).length }</span></button></li>` ).join( '' );

  const escolher = id => {
    const filtro = FILTROS.find( um => um.id === id ) ?? FILTROS[0];
    const lista = doFiltro( filtro.id );
    const menor = Math.min( ...lista.map( quarto => quarto.preco ) );
    botoes.querySelectorAll( 'button' ).forEach( botao => botao.setAttribute( 'aria-pressed', String( botao.dataset.filtro === filtro.id ) ) );
    resumo.innerHTML = `
      <span class="t-grande">${ lista.length } ${ lista.length === 1 ? 'apartamento' : 'apartamentos' } a partir de ${ reais( menor ) }</span>
      <span>${ filtro.texto }</span>`;
    grade.innerHTML = lista.map( ( quarto, i ) => `
      <li class="indice__item revelar" style="--ordem:${ i % 3 }">
        <a href="${ hrefQuarto( quarto.id ) }">
          <span class="quadro">${ img( quarto.fotos[0] ) }</span>
          <span class="t-grande">${ quarto.nome }${ quarto.selo ? `<span class="apagado"> / ${ quarto.selo }</span>` : '' }</span>
          <span class="t-grande">a partir de ${ reais( quarto.preco ) }</span>
          <span class="t-pequeno apagado">${ quarto.pessoas } · ${ quarto.camas.toLowerCase() }</span>
        </a>
      </li>` ).join( '' );
    revelar( grade );
  };
  botoes.addEventListener( 'click', evento => {
    const botao = evento.target.closest( 'button[data-filtro]' );
    if ( botao ) {
      escolher( botao.dataset.filtro );
    }
  } );
  escolher( 'todos' );

  const tabela = document.querySelector( '[data-tarifas]' );
  if ( tabela ) {
    tabela.innerHTML = TARIFAS.map( ( [ ocupacao, valor ] ) => `<tr><th scope="row" class="t-meta">${ ocupacao }</th><td class="t-meta">${ reais( valor ) }</td></tr>` ).join( '' );
  }
}

/* ---------- página do apartamento ---------- */

function linhasDl( linhas ) {
  return `<dl>${ linhas.map( ( [ rotulo, valor ] ) => `<div class="t-meta"><dt>${ rotulo }</dt><dd>${ valor }</dd></div>` ).join( '' ) }</dl>`;
}

function montarQuarto() {
  const raiz = document.querySelector( '[data-quarto]' );
  if ( !raiz ) {
    return;
  }
  const id = new URLSearchParams( location.search ).get( 'id' );
  const quarto = QUARTOS.find( um => um.id === id ) ?? QUARTOS[0];
  document.title = `${ quarto.nome } — Via Norte Hotel, Gurupi`;
  document.querySelector( 'meta[name="description"]' )?.setAttribute( 'content', `${ quarto.nome } no Via Norte Hotel: ${ quarto.pessoas.toLowerCase() }, ${ quarto.camas }. A partir de ${ reais( quarto.preco ) } com café da manhã.` );

  const mensagem = `Olá! Gostaria de reservar o ${ quarto.nome } no Via Norte Hotel.`;
  const caracteristicas = [ quarto.pessoas, quarto.camas, quarto.extra, 'Café da manhã incluso', 'Estacionamento coberto' ].filter( Boolean );

  raiz.innerHTML = `
    <div class="detalhe__grade">
      <div class="detalhe__foto">${ img( quarto.fotos[0], ' data-foto-grande' ) }</div>
      <ul class="detalhe__carrossel" aria-label="Fotos">
        ${ quarto.fotos.map( foto => `<li>${ img( foto ) }</li>` ).join( '' ) }
      </ul>
      <div class="detalhe__info">
        <div class="detalhe__miniaturas" role="group" aria-label="Fotos">
          ${ quarto.fotos.map( ( foto, i ) => `<button type="button" aria-pressed="${ i === 0 }" aria-label="Ver foto ${ i + 1 }" data-foto="${ i }">${ img( foto ) }</button>` ).join( '' ) }
        </div>
        ${ quarto.selo ? `<p class="t-meta detalhe__selo">${ quarto.selo }</p>` : '' }
        <h1 class="t-h4">${ quarto.nome }</h1>
        <p class="t-grande detalhe__preco">a partir de ${ reais( quarto.preco ) } por noite</p>
        <p class="detalhe__sobre">${ quarto.sobre }</p>
        <ul class="fios detalhe__fios">
          ${ caracteristicas.map( item => `<li class="t-meta">${ item }</li>` ).join( '' ) }
        </ul>
        <p class="detalhe__nota">${ quarto.precoNota ? `${ quarto.precoNota } ` : '' }Também incluso: ar-condicionado split, Wi-Fi, TV por assinatura, frigobar e banheiro privativo.</p>
        <div class="detalhe__acoes">
          <a class="botao" href="${ linkWhatsapp( mensagem ) }" target="_blank" rel="noopener">Reservar pelo WhatsApp</a>
          <a class="botao botao--contorno" href="${ CONTATO.telRecepcao.href }">Ligar para a recepção</a>
        </div>
        <div class="sanfona detalhe__sanfona">
          <details><summary>Tarifas por ocupação</summary><div class="sanfona__conteudo">${ linhasDl( TARIFAS.map( ( [ ocupacao, valor ] ) => [ ocupacao, reais( valor ) ] ) ) }</div></details>
          <details><summary>Horários</summary><div class="sanfona__conteudo">${ linhasDl( HORARIOS ) }</div></details>
          <details><summary>Políticas</summary><div class="sanfona__conteudo">${ linhasDl( POLITICAS ) }</div></details>
        </div>
      </div>
    </div>`;

  const grande = raiz.querySelector( '[data-foto-grande]' );
  raiz.querySelector( '.detalhe__miniaturas' ).addEventListener( 'click', evento => {
    const botao = evento.target.closest( 'button[data-foto]' );
    if ( !botao ) {
      return;
    }
    const foto = quarto.fotos[Number( botao.dataset.foto )];
    grande.src = foto.src;
    grande.alt = foto.alt;
    raiz.querySelectorAll( '.detalhe__miniaturas button' ).forEach( um => um.setAttribute( 'aria-pressed', String( um === botao ) ) );
  } );

  const outros = document.querySelector( '[data-outros]' );
  if ( outros ) {
    outros.innerHTML = QUARTOS.filter( um => um.id !== quarto.id ).slice( 0, 3 ).map( cartaoQuarto ).join( '' );
  }
}

/* ---------- formulário de reserva (abre o WhatsApp) ---------- */

function formularioReserva() {
  const form = document.querySelector( '[data-form-reserva]' );
  if ( !form ) {
    return;
  }
  const opcoes = form.querySelector( 'select[name="apartamento"]' );
  opcoes.innerHTML = '<option value="">Tanto faz</option>' + QUARTOS.map( quarto => `<option>${ quarto.nome }</option>` ).join( '' );
  const data = valor => ( valor ? valor.split( '-' ).reverse().join( '/' ) : '' );
  form.addEventListener( 'submit', evento => {
    evento.preventDefault();
    if ( !form.reportValidity() ) {
      return;
    }
    const campos = new FormData( form );
    const linhas = [
      `Olá! Sou ${ campos.get( 'nome' ).trim() } e gostaria de reservar no Via Norte Hotel.`,
      `Entrada: ${ data( campos.get( 'entrada' ) ) }`,
      `Saída: ${ data( campos.get( 'saida' ) ) }`,
      `Hóspedes: ${ campos.get( 'hospedes' ) }`,
      campos.get( 'apartamento' ) ? `Apartamento: ${ campos.get( 'apartamento' ) }` : '',
      campos.get( 'mensagem' ).trim() ? `Observação: ${ campos.get( 'mensagem' ).trim() }` : ''
    ].filter( Boolean );
    window.open( linkWhatsapp( linhas.join( '\n' ) ), '_blank', 'noopener' );
  } );
}

/* ---------- partida ---------- */

function preencherLinks() {
  document.querySelectorAll( '[data-whatsapp]' ).forEach( link => {
    link.href = linkWhatsapp( link.dataset.whatsapp || undefined );
    link.target = '_blank';
    link.rel = 'noopener';
  } );
  document.querySelectorAll( '[data-mapa]' ).forEach( link => {
    link.href = CONTATO.mapa;
    link.target = '_blank';
    link.rel = 'noopener';
  } );
}

montarCabecalho();
montarRodape();
montarVitrines();
montarAcomodacoes();
montarQuarto();
formularioReserva();
preencherLinks();
acompanharCabecalho();
document.querySelectorAll( '[data-troca]' ).forEach( caixa => revezar( caixa ) );
paralaxe();
marcaDaCapa();
revelar();

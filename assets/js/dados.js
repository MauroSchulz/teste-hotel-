// Tudo o que muda com frequência mora aqui: contatos, apartamentos e tarifas.
// Mudou um preço ou um telefone? Edite só este arquivo.

const CONTATO = {
  whatsapp: '556333152000',
  telReservas: { texto: '(63) 3315-2000', href: 'tel:+556333152000' },
  telRecepcao: { texto: '(63) 3312-5439', href: 'tel:+556333125439' },
  email: 'contato@vianortehotel.com.br',
  instagram: 'https://www.instagram.com/vianortehotel/',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Via+Norte+Hotel+Gurupi+TO',
  endereco: [ 'Rodovia BR-153, km 672,2', 'Chácara 107, Gleba 5', 'Gurupi – TO, 77402-210' ]
};

function linkWhatsapp( mensagem = 'Olá! Gostaria de fazer uma reserva no Via Norte Hotel.' ) {
  return `https://wa.me/${ CONTATO.whatsapp }?text=${ encodeURIComponent( mensagem ) }`;
}

const FOTO = {
  capa: { src: 'assets/img/topo-piscina-palmeiras-fim-de-tarde.jpg', alt: 'Vista aérea do hotel no fim da tarde, com as palmeiras e a piscina' },
  aerea: { src: 'assets/img/topo-hotel-piscina.jpg', alt: 'Vista aérea dos apartamentos, do jardim e da piscina' },
  aereaVertical: { src: 'assets/img/vista-aerea-piscina-apartamentos-rotated.jpg', alt: 'Os dois andares de apartamentos vistos do alto, com a piscina em primeiro plano' },
  noite: { src: 'assets/img/capa-noite-panoramica.jpg', alt: 'O hotel visto do alto à noite, com a piscina iluminada' },
  piscina: { src: 'assets/img/piscina-palmeiras-via-norte.jpg', alt: 'A piscina entre as palmeiras, com mesa e banquetas na borda' },
  jardim: { src: 'assets/img/apartamentos-vista-piscina-rotated.jpg', alt: 'Fileira de palmeiras entre os apartamentos e a piscina' },
  estacionamento: { src: 'assets/img/estacionamento-coberto-hotel.jpg', alt: 'Pátio interno e corredor dos apartamentos' },
  fachada: { src: 'assets/img/IMG_0297-1.jpeg', alt: 'Fachada verde do Via Norte Hotel na BR-153' },
  fachadaAerea: { src: 'assets/img/hotel-via-norte-fachada-br-153-1151x1536.jpg', alt: 'Fachada do hotel vista do alto, de frente para a BR-153' },
  single: { src: 'assets/img/apartamento-single-1280x900.jpg', alt: 'Apartamento com camas arrumadas e toalhas dobradas' },
  casal: { src: 'assets/img/apartamento-casal-1280x900.jpg', alt: 'Cama de casal box com toalhas dobradas sobre a manta' },
  duplo: { src: 'assets/img/apartamento-duplo-varanda-1280x900.jpg', alt: 'Duas camas de solteiro e a porta aberta para a varanda' },
  familia: { src: 'assets/img/apartamento-familia-sofa-1280x900.jpg', alt: 'Apartamento Família com camas, sofá e quadros na parede' }
};

const INCLUSO = [ 'Café da manhã', 'Estacionamento coberto', 'Wi-Fi gratuito', 'Ar-condicionado split', 'TV por assinatura', 'Frigobar', 'Banheiro privativo' ];

// grupo: usado no filtro da página Acomodações
const QUARTOS = [
  {
    id: 'casal', nome: 'Apartamento Casal', curto: 'Casal', grupo: 'dois', selo: 'Mais procurado',
    preco: 290, pessoas: 'Até 2 pessoas', camas: '1 cama de casal box (1,58 × 1,98 m)',
    sobre: 'O apartamento mais pedido do hotel: cama de casal box, ar-condicionado split e café da manhã incluso na diária.',
    fotos: [ FOTO.casal, FOTO.jardim, FOTO.piscina ]
  },
  {
    id: 'duplo', nome: 'Apartamento Duplo', curto: 'Duplo', grupo: 'dois',
    preco: 290, pessoas: 'Até 2 pessoas', camas: '2 camas de solteiro box', extra: 'Varanda com vista para o jardim',
    sobre: 'Duas camas separadas e uma varanda que dá para o jardim. Bom para colegas de trabalho ou amigos na estrada.',
    fotos: [ FOTO.duplo, FOTO.jardim, FOTO.aereaVertical ]
  },
  {
    id: 'familia', nome: 'Apartamento Família', curto: 'Família', grupo: 'familia',
    preco: 380, pessoas: 'Até 5 pessoas', camas: '1 cama de casal e até 3 de solteiro', extra: 'Sala e varanda',
    precoNota: 'O valor muda com o número de hóspedes: R$ 380 para 3, R$ 440 para 4 e R$ 500 para 5 pessoas.',
    sobre: 'Sala, varanda e espaço para a família inteira. Crianças até 7 anos não pagam.',
    fotos: [ FOTO.familia, FOTO.piscina, FOTO.aerea ]
  },
  {
    id: 'single', nome: 'Apartamento Single', curto: 'Single', grupo: 'um',
    preco: 190, pessoas: '1 pessoa', camas: '1 cama de solteiro box',
    sobre: 'Para quem chega de viagem e só quer descansar bem antes de seguir.',
    fotos: [ FOTO.single, FOTO.estacionamento, FOTO.jardim ]
  },
  {
    id: 'casal-individual', nome: 'Apartamento Casal Individual', curto: 'Casal Individual', grupo: 'um',
    preco: 210, pessoas: '1 pessoa', camas: '1 cama de casal box (1,58 × 1,98 m)',
    sobre: 'Cama de casal para quem viaja sozinho e gosta de espaço.',
    fotos: [ FOTO.casal, FOTO.piscina, FOTO.estacionamento ]
  }
];

const TARIFAS = [
  [ '1 pessoa, Apartamento Single', 190 ],
  [ '1 pessoa, apartamento de casal', 210 ],
  [ '2 pessoas', 290 ],
  [ '3 pessoas', 380 ],
  [ '4 pessoas', 440 ],
  [ '5 pessoas', 500 ]
];

const HORARIOS = [
  [ 'Check-in', 'A partir das 14h' ],
  [ 'Check-out', 'Até as 11h' ],
  [ 'Late check-out', 'Até as 14h, se houver vaga' ],
  [ 'Recepção', '24 horas' ]
];

const POLITICAS = [
  [ 'Cancelamento', 'Sem custo até 24h antes' ],
  [ 'Pagamento', 'Dinheiro, crédito ou débito' ],
  [ 'Crianças até 7 anos', 'Não pagam' ],
  [ 'Animais', 'Só cão-guia' ]
];

function reais( valor ) {
  return 'R$ ' + String( valor ).replace( /\B(?=(\d{3})+(?!\d))/g, '.' );
}

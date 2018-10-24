var credentials = {
  user: "Touch",
  password: "12345",
  fileType: 19
}

var additionalInformation = {
  title: "título",
  connector: "connector",
  uniqueId: "touch123",
  comment: "Xml touch"
}

var receipt = {
  version: "3.3",
  serie: 'TLA',
  folio: '123456789',
  date: "10/03/2018",
  paymentWayCode: '01',
  subTotal: 100,
  currency: 'MXN',
  total: 100,
  typeReceiptCode: 'I',
  paymentMethodCode: 'PUE',
  postCode: '06600'
}

var sender = {
  rfc: 'EBC840801QW6',
  name: 'ESCUELA BANCARIA Y COMERCIAL, S.C',
  taxRegimeCode: '601'
}

var receiver = {
  rfc: 'LUPN761015QG2',
  name: 'JUAN MANUEL RAMIREZ BELLOSO',
  cfdiCode: 'D10'
}

var concept = {
  serviceCode: '86121800',
  quantity: 1,
  unityCode: 'E48',
  unity: 'Servicio unitario',
  description: 'Descripcion...',
  unitValue: 100,
  amount: 100
}

var taxesConcept = {
  base: 100,
  code: '002',
  factorType: 'Tasa',
  rateOrFee: 0.16,
  amount: 16
}

var taxes = {
  total: 16,
  code: '002',
  factorType: 'Tasa',
  rateOrFee: 0.16,
  amount: 16
}

var data = {
  message: 'Hello Vue!',
  book:{
    _id:1,
    Author: "Touch",
    Title: "XML",
    Genre: "SAT",
    Price: "10",
    PublishDate: "10/04/2018",
    Description: "XML example"
  },
  invoice:{
    credentials:credentials,
    additionalInformation: additionalInformation,
    receipt: receipt,
    sender: sender,
    receiver: receiver,
    concept: concept,
    taxesConcept: taxesConcept,
    taxes: taxes
  }
}

var app = new Vue({
  el: '#app',
  data: data,
  methods:{
    downloadXml: function(){
      let book = this.book;
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += `<Book id= ${book._id}>  
  <Author>${book.Author}</Author>  
  <Title>${book.Title}</Title>  
  <Genre>${book.Genre}</Genre>  
  <Price>${book.Price}</Price>  
  <PublishDate>${book.PublishDate}</PublishDate>  
  <Description>${book.Description}</Description>  
</Book>`;
      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", `Facturas_Timbradas.xml`);
    link.click();
    },

    makeTheXml: function(){
      let credentials = this.invoice.credentials
      let headers = `
        <?xml version="1.0" encoding="UTF-8"?>
          <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:buz="http://buzone.com.mx" xmlns:ns="http://www.sat.gob.mx/cfd/3" xmlns:ter="http://www.sat.gob.mx/terceros" xmlns:iedu="http://www.sat.gob.mx/iedu" xmlns:ven="http://www.sat.gob.mx/ventavehiculos" xmlns:don="http://www.sat.gob.mx/donat" xmlns:div="http://www.sat.gob.mx/divisas" xmlns:det="http://www.sat.gob.mx/detallista" xmlns:imp="http://www.sat.gob.mx/implocal" xmlns:pfic="http://www.sat.gob.mx/pfic" xmlns:tur="http://www.sat.gob.mx/TuristaPasajeroExtranjero" xmlns:ley="http://www.sat.gob.mx/leyendasFiscales" xmlns:spei="http://www.sat.gob.mx/spei" xmlns:reg="http://www.sat.gob.mx/registrofiscal" xmlns:pag="http://www.sat.gob.mx/pagoenespecie" xmlns:con="http://www.sat.gob.mx/consumodecombustibles" xmlns:val="http://www.sat.gob.mx/valesdedespensa" xmlns:aer="http://www.sat.gob.mx/aerolineas" xmlns:not="http://www.sat.gob.mx/notariospublicos" xmlns:veh="http://www.sat.gob.mx/vehiculousado" xmlns:ser="http://www.sat.gob.mx/servicioparcialconstruccion" xmlns:cer="http://www.sat.gob.mx/certificadodestruccion" xmlns:ren="http://www.sat.gob.mx/renovacionysustitucionvehiculos" xmlns:art="http://www.sat.gob.mx/arteantiguedades" xmlns:est="http://www.sat.gob.mx/EstadoDeCuentaCombustible" xmlns:com="http://www.sat.gob.mx/ComercioExterior" xmlns:ine="http://www.sat.gob.mx/ine" xmlns:nom="http://www.sat.gob.mx/nomina12" xmlns:com1="http://www.sat.gob.mx/ComercioExterior11" xmlns:pag1="http://www.sat.gob.mx/Pagos">
            <soapenv:Header/>
            <soapenv:Body>
              <buz:emitirFactura>
              <buz:RequestBE
                usuario="${requestBodyCommand.user}"
                password="${requestBodyCommand.password}">
      `
    }
  },
})
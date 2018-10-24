var credentials = {
  user: "Touch",
  password: "12345",
}

var additionalInformation = {
  title: "título",
  connector: "connector",
  fileType: 19,
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
  rfc: 'TOU840801QW6',
  name: 'Touch Company',
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
  baseConceptTax: 100,
  codeConceptTax: '002',
  factorTypeConceptTax: 'Tasa',
  rateOrFeeConceptTax: 0.16,
  amountConceptTax: 16
}

var taxes = {
  totalTaxes: 16,
  taxtCode: '002',
  factorType: 'Tasa',
  rateOrFee: 0.16,
  amountTaxes: 16
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
      csvContent += this.makeTheXml();
      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", `Facturas_Timbradas.xml`);
    link.click();
    },
/*******************************************************************************/
//        MAKING XML
/*******************************************************************************/
    makeTheXml: function(){
      let credentials = this.invoice.credentials;
      let additionalInformation = this.invoice.additionalInformation;
      let receipt = this.invoice.receipt;
      let sender = this.invoice.sender;
      let receiver = this.invoice.receiver;
      let concept = this.invoice.concept;
      let taxesConcept = this.invoice.taxesConcept;
      let taxes = this.invoice.taxes;
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:buz="http://buzone.com.mx" xmlns:ns="http://www.sat.gob.mx/cfd/3" xmlns:ter="http://www.sat.gob.mx/terceros" xmlns:iedu="http://www.sat.gob.mx/iedu" xmlns:ven="http://www.sat.gob.mx/ventavehiculos" xmlns:don="http://www.sat.gob.mx/donat" xmlns:div="http://www.sat.gob.mx/divisas" xmlns:det="http://www.sat.gob.mx/detallista" xmlns:imp="http://www.sat.gob.mx/implocal" xmlns:pfic="http://www.sat.gob.mx/pfic" xmlns:tur="http://www.sat.gob.mx/TuristaPasajeroExtranjero" xmlns:ley="http://www.sat.gob.mx/leyendasFiscales" xmlns:spei="http://www.sat.gob.mx/spei" xmlns:reg="http://www.sat.gob.mx/registrofiscal" xmlns:pag="http://www.sat.gob.mx/pagoenespecie" xmlns:con="http://www.sat.gob.mx/consumodecombustibles" xmlns:val="http://www.sat.gob.mx/valesdedespensa" xmlns:aer="http://www.sat.gob.mx/aerolineas" xmlns:not="http://www.sat.gob.mx/notariospublicos" xmlns:veh="http://www.sat.gob.mx/vehiculousado" xmlns:ser="http://www.sat.gob.mx/servicioparcialconstruccion" xmlns:cer="http://www.sat.gob.mx/certificadodestruccion" xmlns:ren="http://www.sat.gob.mx/renovacionysustitucionvehiculos" xmlns:art="http://www.sat.gob.mx/arteantiguedades" xmlns:est="http://www.sat.gob.mx/EstadoDeCuentaCombustible" xmlns:com="http://www.sat.gob.mx/ComercioExterior" xmlns:ine="http://www.sat.gob.mx/ine" xmlns:nom="http://www.sat.gob.mx/nomina12" xmlns:com1="http://www.sat.gob.mx/ComercioExterior11" xmlns:pag1="http://www.sat.gob.mx/Pagos">
  <soapenv:Header/>
  <soapenv:Body>
    <buz:emitirFactura>
      
      <buz:RequestBE
        usuario="${credentials.user}"
        password="${credentials.password}">
      
        <buz:AdditionalInformation>
          <buz:titulo>${additionalInformation.title}</buz:titulo>
          <buz:conector>${additionalInformation.connector}</buz:conector>
          <buz:fileType>${additionalInformation.fileType}</buz:fileType>
          <buz:idUnico>${additionalInformation.uniqueId}</buz:idUnico>
          <buz:comentario>${additionalInformation.comment}</buz:comentario>
        </buz:AdditionalInformation>
      
        <ns:Comprobante
          Version="${receipt.version}"
          Serie="${receipt.serie}"
          Folio="${receipt.folio}"
          Fecha="${receipt.date}"
          FormaPago="${receipt.paymentWayCode}"
          SubTotal="${receipt.subTotal}"
          Moneda="${receipt.currency}"
          Total="${receipt.total}"
          TipoDeComprobante="${receipt.typeReceiptCode}"
          MetodoPago="${receipt.paymentMethodCode}"
          LugarExpedicion="${receipt.postCode}">

          <ns:CfdiRelacionados TipoRelacion="hola">
            <ns:CfdiRelacionado UUID="UUID"/>
          </ns:CfdiRelacionados>
      
          <ns:Emisor
            Rfc="${sender.rfcSender}"
            Nombre="${sender.nameSender}"
            RegimenFiscal="${sender.taxRegimeCode}"/>
      
          <ns:Receptor
            Rfc="${receiver.rfcReceiver}"
            Nombre="${receiver.nameReceiver}"
            UsoCFDI="${receiver.cfdiCode}"/>
      
          <ns:Conceptos>
            <ns:Concepto
              ClaveProdServ="${concept.serviceCode}"
              Cantidad="${concept.quantity}"
              ClaveUnidad="${concept.unityCode}"
              Unidad="${concept.unity}"
              Descripcion="${concept.description}"
              ValorUnitario="${concept.unitValue}"
              Importe="${concept.amount}">
              <ns:Impuestos>
                <ns:Traslados>
                  <ns:Traslado
                    Base="${taxesConcept.baseConceptTax}"
                    Impuesto="${taxesConcept.codeConceptTax}"
                    TipoFactor="${taxesConcept.factorTypeConceptTax}"
                    TasaOCuota="${taxesConcept.rateOrFeeConceptTax}"
                    Importe="${taxesConcept.amountConceptTax}"/>
                </ns:Traslados>
              </ns:Impuestos>
            </ns:Concepto>
          </ns:Conceptos>
      
          <ns:Impuestos TotalImpuestosTrasladados="${taxes.totalTaxes}">
            <ns:Traslados>
              <ns:Traslado
                Impuesto="${taxes.taxtCode}"
                TipoFactor="${taxes.factorType}"
                TasaOCuota="${taxes.rateOrFee}"
                Importe="${taxes.amountTaxes}"/>
            </ns:Traslados>
          </ns:Impuestos>
      
        </ns:Comprobante>
      </buz:RequestBE>
    </buz:emitirFactura>
  </soapenv:Body>
</soapenv:Envelope>
      `;
      return xml;
    },


/*******************************************************************************/
//        END OF XML
/*******************************************************************************/
  }
})
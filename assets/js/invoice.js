var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    book:{
      _id:1,
      Author: "Touch",
      Title: "XML",
      Genre: "SAT",
      Price: "10",
      PublishDate: "10/04/2018",
      Description: "XML example"
    }
  },
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
  },
})
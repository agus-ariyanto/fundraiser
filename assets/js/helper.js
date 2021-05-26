define([], function(){
  alt.factory('Helper', function(){
      var a={};

      a.toTanggal=function(tgl,tglformat){
          tgl=tgl.replace(' ','T');
          tglformat=tglformat||'dd MMM yyyy';
          return Date.parse(tgl).toString(tglformat);
      }
      a.exportToExcel=function(table,name){
        var t=document.getElementById(table);
        var base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) };
        var format = function (s) { return s.replace(/{(\w+)}/g,"")};
        var  uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" '+
                   'xmlns:x="urn:schemas-microsoft-com:office:excel" '+
                   'xmlns="http://www.w3.org/TR/REC-html40" lang="en">'+
                   '<head><meta charset="utf-8"> <meta http-equiv="content-language" content="en"> '+
                   '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'+
                   '<x:Name>'+name+'</x:Name>'+
                   '<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>'+
                   '</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook>'+
                   '</xml><![endif]--></head><body>'+
                   '<table>'+t.innerHTML+'</table></body></html>';
        /*
        pake method ini bisa
           window.location.href=uri + base64(format(template));

        tapi lebih smooth pake bawah ini,
        nama file bisa diganti dengan easy human readingfile
          - buat element anchor dengan attribut href dan download
          - diklik
          - element dihapus..
        */

        var ref = uri + base64(format(template));
        var a = document.createElement('A'),
            b = document.createAttribute('href'),
            c = document.createAttribute('download');

        b.value=ref;
        c.value=name+'.xls';
        a.setAttributeNode(b);
        a.setAttributeNode(c);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      

      return a;
  });
});
